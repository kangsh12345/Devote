// TODO: BLOCK

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

interface RequestBody {
  email: string;
  password: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function signIn(info: RequestBody) {
  try {
    const response = await prisma.user.findFirst({
      where: {
        email: info.email,
      },
    });

    if (
      response &&
      response.password &&
      (await bcrypt.compare(info.password, response.password))
    ) {
      const { password, ...userWithoutPass } = response;

      return userWithoutPass;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function POST(req: NextRequest) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const request: RequestBody = await req.json();

  try {
    // const response = await signIn(request);

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
      { message: `이메일 로그인 도중 에러가 발생했습니다.` },
      { status: 500 },
    );
  }
}
