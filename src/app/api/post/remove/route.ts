import { NextRequest, NextResponse } from 'next/server';
import { removeFile } from '@/src/utils/fs';
import path from 'path';

const rootDirectory = path.join(process.cwd(), 'public/assets/blog');

async function removePost(path: string) {
  const fullPath = `${rootDirectory}/${path}`;

  console.log(fullPath);

  try {
    const response = removeFile(fullPath);

    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function POST(req: NextRequest) {
  const { path } = await req.json();

  try {
    const response = await removePost(path);

    if (response) {
      return NextResponse.json({ success: true }, { status: 200 });
    }
    return NextResponse.json({ success: false }, { status: 200 });
  } catch (error) {
    console.error(error);
  }
}
