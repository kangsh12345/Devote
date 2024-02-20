import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/utils/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function withdrawAccount(id: string) {
  try {
    const response = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    const account = await prisma.account.findFirst({
      where: {
        userId: id,
      },
    });

    if (account) {
      await prisma.account.delete({
        where: {
          id: account.id,
        },
      });
    }

    console.log(response);

    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(
    req as unknown as NextApiRequest,
    {
      ...res,
      getHeader: (name: string) => {
        res.headers?.get(name);
      },
      setHeader: (name: string, value: string) => {
        res.headers?.set(name, value);
      },
    } as unknown as NextApiResponse,
    authOptions,
  );

  const id = session?.user.id;

  try {
    const response = await withdrawAccount(id);

    console.log(response);

    return NextResponse.json(
      { message: `회원 탈퇴 성공`, ok: true },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: `회원 탈퇴 실패` }, { status: 400 });
  }
}
