import { prisma } from "../../../../lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, url, alertOn, keyword, expectedStatus } = await request.json();

  if (!email) {
    return NextResponse.json({
      err: "did not receive user email",
    });
  }

  if (!url) {
    return NextResponse.json({
      err: "please enter a url",
    });
  }

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json({
      err: "user not found",
    });
    return;
  }

  const website = await prisma.website.create({
    data: {
      url,
      userId: user.id,
      lastUpdated: new Date(),
      alertOn: alertOn || "website goes down",
      status: "",
      statusCode: 0,
      responseTime: 0,
      keyword: keyword || "",
      expectedStatus: expectedStatus || 200,
    },
  });

  if (!website) {
    return NextResponse.json({
      err: "could not add website",
    });
  }

  return NextResponse.json({
    message: "website added successfully",
  });
}
