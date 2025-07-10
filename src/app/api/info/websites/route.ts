import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/utils";

export async function POST(request: NextRequest) {
  const { email } = await request.json();
  if (!email) {
    return NextResponse.json({
      err: "did not receive user id",
    });
    return;
  }

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json({
      err: "could not find user",
    });
    return;
  }

  const websites = await prisma.website.findMany({
    where: {
      userId: user.id,
    },
  });

  return NextResponse.json({
    websites,
  });
}
