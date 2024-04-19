import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/src/utils/getSession';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { name } = await req.json();

  const session = await getSession();

  if (!session || session.user.id !== String(process.env.NEXT_PUBLIC_USERID)) {
    return NextResponse.json(
      { message: `더이상 지나갈 수 없다만,,?` },
      { status: 400 },
    );
  }

  try {
    await prisma.$transaction(async () => {
      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          name: name,
        },
      });

      await prisma.post.updateMany({
        where: { userId: session.user.id },
        data: {
          name: name,
        },
      });
    });

    return NextResponse.json(
      { message: '닉네임이 변경되었습니다.', success: true },
      { status: 200 },
    );
  } catch (error) {
    console.error('Database transaction failed:', error);
    return NextResponse.json(
      { message: error, success: false },
      { status: 400 },
    );
  }
}
