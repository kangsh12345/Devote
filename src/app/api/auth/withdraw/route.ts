import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/utils/auth';
import { removeFile } from '@/src/utils/fs';
import { PrismaClient } from '@prisma/client';
import path from 'path';

const rootDirectory = path.join(process.cwd(), 'public/assets/blog');
const prisma = new PrismaClient();

async function withdrawAccount(id: string, path: string) {
  const fullPath = `${rootDirectory}/${path}`;

  try {
    const response = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    const post = await prisma.post.deleteMany({
      where: {
        userId: id,
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

    await removeFile(fullPath, 'folder');

    console.log(response, post);

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
    const response = await withdrawAccount(id, session?.user.dirName);

    console.log(response);

    return NextResponse.json(
      { message: `회원 탈퇴 성공`, success: true },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: `회원 탈퇴 실패` }, { status: 400 });
  }
}
