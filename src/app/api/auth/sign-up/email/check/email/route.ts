import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface RequestBody {
  email: string;
}

async function emailCheck(info: RequestBody) {
  try {
    const response = await prisma.user.findFirst({
      where: {
        email: info.email,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function POST(req: NextRequest) {
  const request: RequestBody = await req.json();

  try {
    const response = await emailCheck(request);

    if (response) {
      return NextResponse.json(
        { success: false, message: `중복된 이메일입니다.` },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { success: true, message: `사용 가능한 이메일` },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `이메일 회원가입 실패` },
      { status: 400 },
    );
  }
}
