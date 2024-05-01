import { connect } from "@/database/mongo.config";
import { User } from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
connect();
export async function GET(req: NextRequest) {
  try {
    const response = await User.find().select({ name: 1, email: 1 });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching users" },
      { status: 500 }
    );
  }
}
