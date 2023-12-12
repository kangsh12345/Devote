import { NextRequest, NextResponse } from 'next/server';
import { findDirectory } from '@/src/utils/fs';
import path from 'path';

const rootDirectory = path.join(process.cwd(), 'public/assets/blog');

async function getDirectory(path: string) {
  const fullPath = `${rootDirectory}/${path}`;

  try {
    const response = findDirectory(fullPath);

    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function POST(req: NextRequest) {
  const { path } = await req.json();

  try {
    const response = await getDirectory(path);

    return NextResponse.json(
      { tree: response, success: true },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
  }
}
