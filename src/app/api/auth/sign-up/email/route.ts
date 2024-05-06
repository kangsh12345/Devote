// TODO: BLOCK

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    return result;
  } catch (error) {
    console.error(error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: NextRequest) {
  // const request: RequestBody = await req.json();

  try {
    // const response = await signUp(request);

    // return NextResponse.json(
    //   { user: response, message: `Success` },
    //   { status: 200 },
    // );
    return NextResponse.json(
      { message: `더이상 지나갈 수 없다네요네` },
      { status: 400 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `이메일 회원가입 도중 에러가 발생했습니다.` },
      { status: 500 },
    );
  }
}
