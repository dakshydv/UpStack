import { MonitorModel, UserModel } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const url = body.url;
  const alertOn = body.alertOn;
  const keyword = body.keyword;
  const expectedStatus = body.expectedStatus;

  // temporary code
  const user = await UserModel.findOne({
    email: "keshav.julmee@gmail.com",
  });

  // @ts-ignore
  const ownerId = user._id;

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
