import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

interface RequestBody {
  name: string;
  email: string;
  password: string;
  image: string;
}

async function signUp(info: RequestBody) {
  try {
    const response = await prisma.user.create({
      data: {
        name: info.name,
        email: info.email,
        password: await bcrypt.hash(info.password, 10),
        image: info.image,
      },
    });

    const { password, ...result } = response;

    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function POST(req: NextRequest) {
  const request: RequestBody = await req.json();

  try {
    const response = await signUp(request);

    return NextResponse.json(
      { user: response, message: `Success` },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `이메일 회원가입 실패` },
      { status: 400 },
    );
  }
}
