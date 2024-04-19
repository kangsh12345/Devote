import { NextRequest, NextResponse } from 'next/server';
import { renameFile } from '@/src/utils/fs';
import { getSession } from '@/src/utils/getSession';
import { PrismaClient } from '@prisma/client';
import path from 'path';

const prisma = new PrismaClient();
const rootDirectory = path.join(process.cwd(), 'public/assets/blog');

async function renamePost(oldPath: string, newPath: string) {
  const fullPath = `${rootDirectory}/${oldPath}`;
  const fullNewPath = `${rootDirectory}/${newPath}`;

  try {
    await prisma.$transaction(async () => {
      if (fullPath.indexOf('.md') !== -1) {
        await prisma.post.update({
          where: {
            path: oldPath.replace('.md', ''),
          },
          data: {
            path: newPath.replace('.md', ''),
            title: newPath.replace('.md', '').split('/').at(-1),
          },
          // 파일 생성했을때 post write 페이지에서 제대로 작동하는지 확인해보기
        });
      }
    });

    return await renameFile(fullPath, fullNewPath);
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function POST(req: NextRequest) {
  const { path, newPath } = await req.json();

  const session = await getSession();

  if (session?.user.id !== String(process.env.NEXT_PUBLIC_USERID)) {
    return NextResponse.json(
      { message: `더이상 지나갈 수 없다만,,?` },
      { status: 400 },
    );
  }

  try {
    const response = await renamePost(path, newPath);

    if (response) {
      return NextResponse.json({ success: true }, { status: 200 });
    }
    return NextResponse.json({ success: false }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 },
    );
  }
}
