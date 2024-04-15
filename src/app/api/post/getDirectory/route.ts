import { NextRequest, NextResponse } from 'next/server';
import { findDirectory } from '@/src/utils/fs';
import { PrismaClient } from '@prisma/client';
import path from 'path';

const prisma = new PrismaClient();
const rootDirectory = path.join(process.cwd(), 'public/assets/blog');

async function getDirectory(dirPath: string) {
  const fullPath = `${rootDirectory}/${dirPath}`;

  try {
    const fileInfo = await prisma.post.findMany({
      where: { path: { startsWith: `${dirPath}/` } },
    });

    return await findDirectory(fullPath, dirPath, fileInfo);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to retrieve directory information.');
  }
}

export async function POST(req: NextRequest) {
  const { path } = await req.json();

  try {
    const response = await getDirectory(path);

    const userName = await prisma.user.findUnique({
      where: { dirName: path.split('/')[0] },
      select: { name: true },
    });

    return NextResponse.json(
      { tree: response, success: true, userName: userName?.name },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
