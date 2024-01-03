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

  const url = new URL('/', req.url);

  try {
    const response = await existCheckPost(path);

    console.log(response);

    if (response === 'not exist') {
      // TODO: 추후 내 사이트로 연결
      return NextResponse.redirect(url);
    }
    // return NextResponse.json({ success: true, exist: true }, { status: 200 });
  } catch (error) {
    console.error(error);
  }
}
