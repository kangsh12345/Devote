import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/utils/auth';
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

export async function POST(req: NextRequest, res: NextResponse) {
  const { path } = await req.json();

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

  console.log(`existCHeckPost: ${path}`);

  try {
    if (session?.user.id === String(process.env.NEXT_PUBLIC_USERID)) {
      const response = await existCheckPost(path);

      console.log(response);

      if (response === 'not exist') {
        return NextResponse.json(
          { success: true, exist: false },
          { status: 200 },
        );
      }
      return NextResponse.json({ success: true, exist: true }, { status: 200 });
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
