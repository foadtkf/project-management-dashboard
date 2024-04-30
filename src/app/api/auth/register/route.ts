import { connect } from "@/database/mongo.config";
import ErrorReporter from "@/validator/ErrorReporter";
import { signupSchema } from "@/validator/userSchema";
import vine, { errors } from "@vinejs/vine";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/model/User";

connect();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validator = vine.compile(signupSchema);
    validator.errorReporter = () => new ErrorReporter();
    const output = await validator.validate(body);
    const emailExists = await User.findOne({ email: output.email });
    if (emailExists) {
      return NextResponse.json(
        {
          status: 400,
          errors: {
            email: "Email already exists",
          },
        },
        { status: 200 }
      );
    } else {
      const salt = bcrypt.genSaltSync(10);
      output.password = bcrypt.hashSync(output.password, salt);
      const userCreated = await User.create(output);
      return NextResponse.json(
        { status: 201, message: "User created successfully" },
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
