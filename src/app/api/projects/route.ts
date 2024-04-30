import { connect } from "@/database/mongo.config";
import { Project } from "@/model/Project";
import ErrorReporter from "@/validator/ErrorReporter";
import { projectCreateSchema } from "@/validator/projectSchema";
import vine from "@vinejs/vine";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

/** @param {NextRequest} req */
export const dynamic = "force-dynamic";
connect();
export async function GET(req: NextRequest) {
  try {
    const response = await Project.find();

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching projects" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validator = vine.compile(projectCreateSchema);
  validator.errorReporter = () => new ErrorReporter();
  const output = await validator.validate(body);
  try {
    const projectExists = await Project.findOne({ name: output.name });
    if (projectExists) {
      return NextResponse.json(
        { status: 400, message: "Project already created" },
        { status: 200 }
      );
    } else {
      const response = await Project.create(output);
      return NextResponse.json(
        { status: 200, message: "Project created successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating projects", err: error },
      { status: 500 }
    );
  }
}
