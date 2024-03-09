import { NextRequest, NextResponse } from 'next/server';
import { findAllDirectory, TreeProps } from '@/src/utils/fs';
import path from 'path';

const rootDirectory = path.join(process.cwd(), 'public/assets/blog');

async function getAllOtherDirectory(dirName: string) {
  const path = `${rootDirectory}/${dirName}`;
  const tree: TreeProps = {
    path: dirName,
    name: dirName,
    type: 'folder',
    children: [],
  };

  try {
    const response = findAllDirectory(path);

    console.log(response);

    tree.children = response;
    return tree;
  } catch (error) {
    console.error(error);
  }
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
        tree: {
          path: '',
          name: '',
          type: 'folder',
          children: [],
        },
        message: error,
      },
      { status: 400 },
    );
  }
}
