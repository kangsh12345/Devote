import { NextResponse } from 'next/server';
import { findAllDirectory, TreeProps } from '@/src/utils/fs';
import { getSession } from '@/src/utils/getSession';
import path from 'path';

const rootDirectory = path.join(process.cwd(), 'public/assets/blog');

async function getAllDirectory(dirName: string): Promise<TreeProps> {
  const fullPath = `${rootDirectory}/${dirName}`;
  const tree: TreeProps = {
    path: dirName,
    name: dirName,
    type: 'folder',
    createdAt: new Date(),
    children: [],
  };

  try {
    tree.children = await findAllDirectory(fullPath);
  } catch (error) {
    console.error(error);
  }
  return tree;
}

export async function GET() {
  const session = await getSession();

  if (session) {
    const response = await getAllDirectory(session.user.dirName);

    return NextResponse.json(
      { success: true, tree: response, message: 'success' },
      { status: 200 },
    );
  }
  return NextResponse.json(
    { success: false, tree: [], message: 'Unauthorization' },
    { status: 400 },
  );
}
