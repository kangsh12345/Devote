import { NextRequest, NextResponse } from 'next/server';
import { findFile } from '@/src/utils/fs';
import { PrismaClient } from '@prisma/client';
import path from 'path';

const prisma = new PrismaClient();
const rootDirectory = path.join(process.cwd(), 'public/assets/blog');

export interface GetFileResponse {
  success: boolean;
  exist: boolean;
  data: {
    contentHtml: string;
    content: string;
    date: string;
    title: string;
    subTitle: string | null;
    postId: number | null;
    name: string | null;
  } | null;
}

async function findPostFile(postPath: string): Promise<GetFileResponse> {
  const fullPath = `${rootDirectory}/${postPath}.md`;

  const [postInfo, fileResponse] = await Promise.all([
    prisma.post.findFirst({
      where: { path: postPath },
      select: { id: true, name: true, subTitle: true },
    }),
    findFile(fullPath).catch(err => {
      console.error('File reading failed: ', err);
      return null;
    }),
  ]);

  if (!fileResponse) {
    return { success: false, exist: false, data: null };
  }

  return {
    success: true,
    exist: true,
    data: {
      contentHtml: fileResponse.contentHtml,
      content: fileResponse.content,
      date: fileResponse.date,
      title: fileResponse.title,
      subTitle: postInfo?.subTitle ?? null,
      postId: postInfo?.id ?? null,
      name: postInfo?.name ?? null,
    },
  };
}

export async function POST(req: NextRequest) {
  const { path } = await req.json();
  const response = await findPostFile(path);

  return NextResponse.json(response, { status: response.success ? 200 : 404 });
}
