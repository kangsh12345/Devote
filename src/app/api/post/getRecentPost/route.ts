import { NextResponse } from 'next/server';
import { DirectoryTreeProps } from '@/src/utils/fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function findRecentPost() {
  try {
    const fileInfo = await prisma.post.findMany({
      select: {
        path: true,
        thumbnail: true,
        subTitle: true,
        name: true,
        date: true,
      },
      orderBy: {
        date: 'desc',
      },
    });

    const stack: DirectoryTreeProps[] = fileInfo.map(item => ({
      path: item.path,
      name: item.path.split('/').pop() ?? '',
      type: 'file',
      thumbnail: item.thumbnail,
      subTitle: item.subTitle,
      userName: item.name,
      date: item.date,
    }));

    return stack.sort((a, b) =>
      a.name === '자기소개' ? -1 : b.name === '자기소개' ? 1 : 0,
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function GET() {
  try {
    const response = await findRecentPost();

    return NextResponse.json(
      {
        tree: response,
        success: true,
        message: '파일 불러오는데 성공하였습니다.',
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Get recent post failed:', error);
    return NextResponse.json(
      {
        tree: [],
        success: false,
        message: '파일을 불러오는 도중 에러가 발생했습니다.',
      },
      { status: 500 },
    );
  }
}
