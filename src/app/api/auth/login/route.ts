import { connect } from "@/database/mongo.config";
import { User } from "@/model/User";
import ErrorReporter from "@/validator/ErrorReporter";
import { loginSchema } from "@/validator/userSchema";
import vine, { errors } from "@vinejs/vine";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
connect();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validator = vine.compile(loginSchema);
    validator.errorReporter = () => new ErrorReporter();
    const output = await validator.validate(body);
    const emailExists = await User.findOne({ email: output.email });
    if (emailExists) {
      const pWrdisCorrect = bcrypt.compareSync(
        output.password,
        emailExists.password
      );
      if (pWrdisCorrect) {
        return NextResponse.json(
          {
            status: 200,
            message: "Successfully logged in!",
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            status: 400,
            errors: {
              password: "Password is incorrect!",
            },
          },
          { status: 200 }
        );
      }
    } else {
      return NextResponse.json(
        {
          status: 400,
          errors: {
            email: "User does not exist!",
          },
        },
        { status: 200 }
      );
    }
  } catch (e) {
    if (e instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(
        { status: 400, errors: e.messages },
        { status: 200 }
      );
    }
  }
}
