import { NextRequest, NextResponse } from 'next/server';
import { createDirectory } from '@/src/utils/fs';
import { getSession } from '@/src/utils/getSession';
import { PrismaClient } from '@prisma/client';
import { format } from 'date-fns';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { id, name, dirName, type } = await req.json();

  const session = await getSession();

  const fileTitle = dirName.split('/').pop();

  if (session?.user.id !== String(process.env.NEXT_PUBLIC_USERID)) {
    return NextResponse.json(
      { message: `더이상 지나갈 수 없다만,,?` },
      { status: 400 },
    );
  }

  try {
    await prisma.$transaction(async () => {
      if (type === 'rootDirectory') {
        await prisma.user.update({
          where: { id: id },
          data: { dirName: dirName },
        });
      } else if (type === 'file') {
        await prisma.post.create({
          data: {
            userId: id,
            name,
            path: dirName,
            thumbnail: '',
            title: fileTitle,
            subTitle: '',
            date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
          },
        });
      }
    });
    // 제대로 동작하는지 확인
    // TODO: Folder 페이지 순서대로 안나옴 에러 추후 확인후 수정

    const mkdirResponse = createDirectory({ dirName, name, type });

    if (
      mkdirResponse !== 'create success' &&
      mkdirResponse !== 'already exists'
    ) {
      throw new Error(mkdirResponse);
    }

    return NextResponse.json(
      {
        success: true,
        exist: mkdirResponse === 'already exists',
        message: mkdirResponse,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, exist: true, message: error },
      { status: 500 },
    );
  }
}
