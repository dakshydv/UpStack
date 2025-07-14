import { prisma } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    const { name, email, inputPassword } = await req.json();
    console.log(email);
    console.log(name);
    console.log(inputPassword);
    

    try {
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })
        
        if (user) {
            return NextResponse.json({
                message: "user already exists"
            })
        }
        
        const password = await bcrypt.hash(inputPassword, 10);

        await prisma.user.create({
            data: {
                name,
                email,
                password,
                image: ""
            }
        })

        return NextResponse.json({
            message: "user signed up successfully"
        })
    } catch (err) {
        return NextResponse.json({
            err
        })
    }
}