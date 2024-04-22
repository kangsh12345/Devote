import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function findPostMetadata(fullPath: string) {
  try {
    const postMetadata = await prisma.post.findFirst({
      select: {
        title: true,
        subTitle: true,
        thumbnail: true,
      },
      where: {
        path: fullPath,
      },
    });
    return postMetadata;
  } catch (error) {
    throw error;
  }
}

export async function GET(req: NextRequest) {
  const fullPath = req.nextUrl.searchParams.get('fullPath');

  try {
    const postMetadata = await findPostMetadata(
      decodeURIComponent(fullPath ?? ''),
    );

    return NextResponse.json({
      title: postMetadata?.title,
      subTitle: postMetadata?.subTitle,
      thumbnail: postMetadata?.thumbnail,
      message: '메타데이터를 불러오는데 성공하였습니다.',
    });
  } catch (error) {
    console.error('Get metadata failed:', error);
    return NextResponse.json(
      {
        title: '',
        subTitle: '',
        thumbnail: '',
        message: '메타데이터를 불러오는 도중 에러가 발생했습니다.',
      },
      { status: 500 },
    );
  }
}
