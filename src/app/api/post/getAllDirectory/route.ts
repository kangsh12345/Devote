import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/utils/auth';
import { findAllDirectory, TreeProps } from '@/src/utils/fs';
import path from 'path';

const rootDirectory = path.join(process.cwd(), 'public/assets/blog');

async function getAllDirectory(dirName: string) {
  const path = `${rootDirectory}/${dirName}`;
  const tree: TreeProps = {
    path: dirName,
    name: dirName,
    type: 'folder',
    createdAt: new Date(),
    children: [],
  };

  try {
    const response = await findAllDirectory(path);

    console.log(response);

    tree.children = response;
    return tree;
  } catch (error) {
    console.error(error);
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(
    req as unknown as NextApiRequest,
    {
      ...res,
      getHeader: (name: string) => {
        res.headers?.get(name);
      },
      setHeader: (name: string, value: string) => {
        res.headers?.set(name, value);
      },
    } as unknown as NextApiResponse,
    authOptions,
  );

  if (session) {
    const response = await getAllDirectory(session.user.dirName);

    return NextResponse.json(
      { success: true, tree: response, message: 'success' },
      { status: 200 },
    );
  }
  return NextResponse.json(
    { success: false, tree: [], message: 'no authorization' },
    { status: 400 },
  );
}
