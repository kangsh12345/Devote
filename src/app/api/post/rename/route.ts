import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/utils/auth';
import { renameFile } from '@/src/utils/fs';
import { PrismaClient } from '@prisma/client';
import path from 'path';

const rootDirectory = path.join(process.cwd(), 'public/assets/blog');

const prisma = new PrismaClient();

async function renamePost(path: string, newPath: string) {
  const fullPath = `${rootDirectory}/${path}`;
  const fullNewPath = `${rootDirectory}/${newPath}`;

  try {
    const response = await renameFile(fullPath, fullNewPath);

    if (response && fullPath.indexOf('.md') !== -1) {
      const post = await prisma.post.findFirst({
        where: {
          path: path.replace('.md', ''),
        },
      });

      if (post) {
        await prisma.post.update({
          where: {
            id: post.id,
          },
          data: {
            path: newPath.replace('.md', ''),
          },
        });
      }
    }

    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  const { path, newPath } = await req.json();

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

  try {
    if (session?.user.id === String(process.env.NEXT_PUBLIC_USERID)) {
      const response = await renamePost(path, newPath);

      if (response) {
        return NextResponse.json({ success: true }, { status: 200 });
      }
      return NextResponse.json({ success: false }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: `더이상 지나갈 수 없다만,,?` },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error(error);
  }
}
