import { MonitorModel, UserModel } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

// create new monitor
export async function POST(req: NextRequest) {
  const body = await req.json();
  const email = body.email;
  const url = body.url;
  const alertOn = body.alertOn;
  const keyword = body.keyword;
  const expectedStatus = body.expectedStatus;

  // temporary code
  const user = await UserModel.findOne({
    email,
  });

  const owner = user._id;
  const ownerId = new mongoose.Types.ObjectId(owner);

  try {
    const existingMonitor = await MonitorModel.findOne({
      url,
      ownerId,
    });

    if (existingMonitor) {
      return NextResponse.json({
        message: "monitor already exist",
      });
    }

    await MonitorModel.create({
      ownerId,
      url,
      status: "Pending",
      alertOn,
      keyword,
      expectedStatus,
      statusCode: 200,
      lastUpdated: Date.now(),
    });
    return NextResponse.json({
      message: "Monitor Created Successfully",
    });
  } catch (err) {
    return NextResponse.json({
      err,
    });
  }
}
