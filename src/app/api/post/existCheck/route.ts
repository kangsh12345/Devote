import { NextRequest, NextResponse } from 'next/server';
import { existPost } from '@/src/utils/fs';
import path from 'path';

const rootDirectory = path.join(process.cwd(), 'public/assets/blog');

async function existCheckPost(path: string) {
  const fullPath = `${rootDirectory}/${path}`;

  console.log(fullPath);

  try {
    const response = existPost(fullPath);

    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function POST(req: NextRequest) {
  const { path } = await req.json();

  console.log(`existCHeckPost: ${path}`);

  try {
    const response = await existCheckPost(path);

    console.log(response);

    if (response === 'not exist') {
      return NextResponse.json(
        { success: true, exist: false },
        { status: 200 },
      );
    }
    return NextResponse.json({ success: true, exist: true }, { status: 200 });
  } catch (error) {
    console.error(error);
  }
}
