import { NextRequest, NextResponse } from 'next/server';
import { findFile } from '@/src/utils/fs';
import path from 'path';

const rootDirectory = path.join(process.cwd(), 'public/assets/blog');

async function findPostFile(path: string) {
  const fullPath = `${rootDirectory}/${path}.md`;

  try {
    const response = findFile(fullPath);

    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function POST(req: NextRequest) {
  const { path } = await req.json();

  try {
    const response = await findPostFile(path);

    console.log(`hi ${response}`);

    return NextResponse.json(
      { success: true, exist: true, data: response },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
  }
}
