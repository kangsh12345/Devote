import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/utils/auth';
import { removeFile } from '@/src/utils/fs';
import { PrismaClient } from '@prisma/client';
import path from 'path';

const rootDirectory = path.join(process.cwd(), 'public/assets/blog');
const prisma = new PrismaClient();

async function removePost(path: string, type: string) {
  const fullPath = `${rootDirectory}/${path}`;

  try {
    const response = removeFile(fullPath, type);

    if (type === 'file') {
      const postDeleteResponse = await prisma.post.delete({
        where: {
          path: path.replace('.md', ''),
        },
      });

      console.log(postDeleteResponse);
    }

    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  const { path, type } = await req.json();

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
      const response = await removePost(path, type);

      console.log(`remove : ${response}`);

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
