import { NextResponse } from 'next/server';
import { DirectoryTreeProps } from '@/src/utils/fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function findRecentPost() {
  try {
    const fileInfo = await prisma.post.findMany();

    const stack: DirectoryTreeProps[] = [];

    fileInfo.map(item => {
      stack.unshift({
        path: item.path,
        name: item.path.split('/').at(-1) ?? '',
        type: 'file',
        thumbnail: item.thumbnail,
        subTitle: item.subTitle,
        userName: item.name,
        date: item.date,
      });
    });

    return stack.sort((a, b) => {
      if (a.name === '자기소개') return -1;
      if (b.name === '자기소개') return 1;
      return 0;
    });
  } catch (error) {
    console.error(error);
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
    console.error(error);
  }
}
