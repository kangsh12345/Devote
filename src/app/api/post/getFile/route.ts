import { NextRequest, NextResponse } from 'next/server';
import { findFile } from '@/src/utils/fs';
import { PrismaClient } from '@prisma/client';
import path from 'path';

const prisma = new PrismaClient();

const rootDirectory = path.join(process.cwd(), 'public/assets/blog');

export interface GetFileResponse {
  success: boolean;
  exist: boolean;
  data:
    | {
        contentHtml: string;
        content: string;
        date: string;
        title: string;
        subTitle: string | null;
        postId: number | null;
        name: string | null;
      }
    | undefined;
}

async function findPostFile(path: string) {
  const fullPath = `${rootDirectory}/${path}.md`;

  const postInfo = await prisma.post.findFirst({
    where: {
      path,
    },
    select: {
      id: true,
      name: true,
      subTitle: true,
    },
  });

  try {
    const response = await findFile(fullPath);

    return {
      contentHtml: response.contentHtml,
      content: response.content,
      date: response.date,
      title: response.title,
      subTitle: postInfo ? postInfo.subTitle : null,
      postId: postInfo ? postInfo.id : null,
      name: postInfo ? postInfo.name : null,
    };
  } catch (error) {
    console.error(error);

    // TODO: 추후 에러작업
    // return {
    //   error: true,
    //   message: 'An error occurred while finding the post file.',
    // };
  }
}

export async function POST(req: NextRequest) {
  const { path } = await req.json();

  try {
    const response = await findPostFile(path);

    return NextResponse.json(
      { success: true, exist: true, data: response },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
  }
}
