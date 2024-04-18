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
      { tree: response, success: true },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Unable to retrieve recent posts.' },
      { status: 500 },
    );
  }
}
