import { NextRequest, NextResponse } from 'next/server';
import { findAllDirectory, TreeProps } from '@/src/utils/fs';
import path from 'path';

const rootDirectory = path.join(process.cwd(), 'public/assets/blog');

async function getAllOtherDirectory(dirName: string): Promise<TreeProps> {
  const path = `${rootDirectory}/${dirName}`;
  const tree: TreeProps = {
    path: dirName,
    name: dirName,
    type: 'folder',
    createdAt: new Date(),
    children: [],
  };

  try {
    tree.children = await findAllDirectory(path);
  } catch (error) {
    console.error(error);
  }

  return tree;
}

export async function POST(req: NextRequest) {
  const { path } = await req.json();

  try {
    const response = await getAllOtherDirectory(path);

    return NextResponse.json(
      { success: true, tree: response, message: 'success' },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        tree: [],
        message: (error as unknown as Error).message,
      },
      { status: 400 },
    );
  }
}
