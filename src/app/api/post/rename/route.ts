import { NextRequest, NextResponse } from 'next/server';
import { renameFile } from '@/src/utils/fs';
import { PrismaClient } from '@prisma/client';
import path from 'path';

const rootDirectory = path.join(process.cwd(), 'public/assets/blog');

const prisma = new PrismaClient();

async function renamePost(path: string, newPath: string) {
  const fullPath = `${rootDirectory}/${path}`;
  const fullNewPath = `${rootDirectory}/${newPath}`;

  try {
    const response = await renameFile(fullPath, fullNewPath);

    if (response) {
      const post = await prisma.post.findFirst({
        where: {
          path: path.replace('.md', ''),
        },
      });

      if (post) {
        await prisma.post.update({
          where: {
            id: post.id,
          },
          data: {
            path: newPath.replace('.md', ''),
          },
        });
      }
    }

    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function POST(req: NextRequest) {
  const { path, newPath } = await req.json();

  try {
    const response = await renamePost(path, newPath);

    if (response) {
      return NextResponse.json({ success: true }, { status: 200 });
    }
    return NextResponse.json({ success: false }, { status: 200 });
  } catch (error) {
    console.error(error);
  }
}
