import { MonitorModel, UserModel } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const email = body.mail;

  const user = await UserModel.findOne({
    email,
  });
  const ownerId = user._id;

  const userMonitors = await MonitorModel.find({
    ownerId,
  });

  return NextResponse.json({
    userMonitors,
  });
}
