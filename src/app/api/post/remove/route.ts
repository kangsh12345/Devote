import { NextRequest, NextResponse } from 'next/server';
import { removeFile } from '@/src/utils/fs';
import { getSession } from '@/src/utils/getSession';
import { PrismaClient } from '@prisma/client';
import path from 'path';

const rootDirectory = path.join(process.cwd(), 'public/assets/blog');
const prisma = new PrismaClient();

async function removePost(path: string, type: string) {
  const fullPath = `${rootDirectory}/${path}`;

  try {
    const result = await prisma.$transaction(
      async prisma => {
        if (type === 'file') {
          await prisma.post.delete({
            where: { path: path.replace('.md', '') },
          });
        } else {
          await prisma.post.deleteMany({
            where: {
              path: {
                startsWith: path,
              },
            },
          });
        }

        await removeFile(fullPath, type);

        return { success: true, message: '파일이 삭제 되었습니다.' };
      },
      { timeout: 10000 },
    );

    console.log('Transaction successful:', result);
    return result;
  } catch (error) {
    console.error('Transaction failed:', error);
    return { success: false, message: '파일 삭제 도중 에러가 발생했습니다.' };
  }
}

export async function POST(req: NextRequest) {
  const { path, type } = await req.json();

  const session = await getSession();

  if (!session || session.user.id !== String(process.env.NEXT_PUBLIC_USERID)) {
    return NextResponse.json(
      { message: `더이상 지나갈 수 없다만,,?`, success: false },
      { status: 400 },
    );
  }

  try {
    const response = await removePost(path, type);

    if (response.success) {
      return NextResponse.json(
        { success: true, message: response.message },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { success: false, message: response.message },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error(`Remove failed`, error);
    return NextResponse.json(
      { success: false, message: '삭제 도중 에러가 발생했습니다.' },
      { status: 500 },
    );
  }
}
