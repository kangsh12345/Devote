import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/src/utils/getSession';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  const session = await getSession();

  if (!session || session.user.id !== String(process.env.NEXT_PUBLIC_USERID)) {
    return NextResponse.json(
      { message: `더이상 지나갈 수 없다만,,?` },
      { status: 400 },
    );
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        image: url,
      },
    });

    return NextResponse.json(
      { message: '프로필이 변경되었습니다.', success: true },
      { status: 200 },
    );
  } catch (error) {
    console.error('Profile update failed:', error);
    return NextResponse.json(
      { message: '프로필 업데이트 도중 에러가 발생했습니다.', success: false },
      { status: 400 },
    );
  }
}
