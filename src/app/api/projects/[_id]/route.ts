import { connect } from "@/database/mongo.config";
import { Project } from "@/model/Project";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

/** @param {NextRequest} req */
export const dynamic = "force-dynamic";
connect();
export async function GET(
  req: NextRequest,
  { params }: { params: { _id: string } }
) {
  try {
    const response = await Project.find({ _id: params._id });
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching projects" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { _id: string } }
) {
  const updates = await req.json();
  try {
    const response = await Project.findByIdAndUpdate(
      { _id: params._id },
      updates,
      { new: true, runValidators: true }
    );
    return NextResponse.json(
      {
        status: 200,
        message: "Updated Successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating project" },
      { status: 500 }
    );
  }
}
