import { NextRequest, NextResponse } from 'next/server';
import { createPost } from '@/src/utils/fs';
import { getSession } from '@/src/utils/getSession';
import { PrismaClient } from '@prisma/client';
import path from 'path';

const prisma = new PrismaClient();
const rootDirectory = path.join(process.cwd(), 'public/assets/blog');

interface RequestBody {
  id: number;
  path: string;
  newPath: string;
  thumbnail: string;
  title: string;
  subTitle: string;
  md: string | undefined;
  date: string;
}

async function handleRequest(
  req: NextRequest,
  userId: string,
  userName: string,
): Promise<NextResponse> {
  const {
    id,
    path: paths,
    newPath,
    thumbnail,
    title,
    subTitle,
    md,
    date,
  }: RequestBody = await req.json();

  const fullPath = path.join(rootDirectory, paths + '.md');

  try {
    await prisma.$transaction(async prisma => {
      await prisma.post.update({
        where: { id, userId },
        data: { path: newPath, thumbnail, title, subTitle },
      });

      await createPost({
        fullPath,
        name: userName,
        title,
        md: md ?? '',
        date,
      });
    });

    return NextResponse.json(
      { success: true, message: '글 생성이 완료되었습니다.' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Write failed:', error);
    return NextResponse.json(
      { success: false, message: '글 생성 도중 에러가 발생했습니다.' },
      { status: 400 },
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();

  if (!session || session.user.id !== String(process.env.NEXT_PUBLIC_USERID)) {
    return NextResponse.json(
      { message: `더이상 지나갈 수 없다만,,?`, success: false },
      { status: 500 },
    );
  } else {
    return await handleRequest(req, session.user.id, session.user.name);
  }
}
