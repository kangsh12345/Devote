import { NextRequest, NextResponse } from 'next/server';
import { createDirectory, createDirectoryCheck } from '@/src/utils/fs';
import { getSession } from '@/src/utils/getSession';
import { PrismaClient } from '@prisma/client';
import { format } from 'date-fns';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { id, name, dirName, type } = await req.json();

  const session = await getSession();

  const fileTitle = dirName.split('/').pop();

  if (!session || session.user.id !== String(process.env.NEXT_PUBLIC_USERID)) {
    return NextResponse.json(
      { message: `더이상 지나갈 수 없다만,,?`, success: false, exist: true },
      { status: 400 },
    );
  }

  try {
    const checkResponse = await createDirectoryCheck({ dirName, type });

    if (checkResponse !== 'success') {
      return NextResponse.json(
        {
          success: true,
          exist: checkResponse === 'already exists',
          message: checkResponse,
        },
        { status: 200 },
      );
    }

    const result = await prisma.$transaction(
      async prisma => {
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

        return await createDirectory({ dirName, name, type });
      },
      { timeout: 10000 },
    );

    return NextResponse.json(
      {
        success: true,
        exist: result === 'already exists',
        message: result,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log('Directory Create failed:', error);
    return NextResponse.json(
      {
        success: false,
        exist: true,
        message: '파일 생성 도중 에러가 발생했습니다.',
      },
      { status: 500 },
    );
  }
}
