import { NextRequest, NextResponse } from 'next/server';
import { removeFile } from '@/src/utils/fs';
import { PrismaClient } from '@prisma/client';
import path from 'path';

const rootDirectory = path.join(process.cwd(), 'public/assets/blog');
const prisma = new PrismaClient();

async function removePost(path: string, type: string) {
  const fullPath = `${rootDirectory}/${path}`;

  try {
    const response = removeFile(fullPath, type);

    if (type === 'file') {
      const postDeleteResponse = await prisma.post.delete({
        where: {
          path: path.replace('.md', ''),
        },
      });

      console.log(postDeleteResponse);
    }

    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function POST(req: NextRequest) {
  const { path, type } = await req.json();

  try {
    const response = await removePost(path, type);

    console.log(`remove : ${response}`);

    if (response) {
      return NextResponse.json({ success: true }, { status: 200 });
    }
    return NextResponse.json({ success: false }, { status: 200 });
  } catch (error) {
    console.error(error);
  }
}
