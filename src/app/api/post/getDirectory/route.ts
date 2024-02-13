import { NextRequest, NextResponse } from 'next/server';
import { findDirectory } from '@/src/utils/fs';
import { PrismaClient } from '@prisma/client';
import path from 'path';

const prisma = new PrismaClient();

const rootDirectory = path.join(process.cwd(), 'public/assets/blog');

async function getDirectory(path: string) {
  const fullPath = `${rootDirectory}/${path}`;

  try {
    const fileInfo = await prisma.post.findMany({
      where: {
        path: {
          startsWith: `${path}/`,
        },
      },
    });

    const response = findDirectory(fullPath, path, fileInfo);

    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function POST(req: NextRequest) {
  const { path } = await req.json();

  try {
    const response = await getDirectory(path);

    const userName = await prisma.user.findFirst({
      where: {
        dirName: path.split('/')[0],
      },
    });

    return NextResponse.json(
      { tree: response, success: true, userName: userName?.name },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
  }
}
