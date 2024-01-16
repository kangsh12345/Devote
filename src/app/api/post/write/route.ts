import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/utils/auth';
import { createPost } from '@/src/utils/fs';
import { PrismaClient } from '@prisma/client';
import { format } from 'date-fns';

const prisma = new PrismaClient();

interface RequestBody {
  path: string;
  thumbnail: string;
  title: string;
  subTitle: string;
  md: string | undefined;
}

export async function POST(req: NextRequest, res: NextResponse) {
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

  const userId = session?.user.id;

  const { path, thumbnail, title, subTitle, md }: RequestBody =
    await req.json();

  const date = format(new Date(), 'yyyy-MM-dd');

  try {
    const response = await prisma.post.upsert({
      // postID로 where 설정해야함
      where: {
        userId,
      },
      update: {
        path,
        thumbnail,
        title,
        subTitle,
      },
      create: {
        userId,
        path,
        thumbnail,
        title,
        subTitle,
        date,
      },
    });

    await createPost({
      fullPath: path,
      // thumbnail,
      title,
      // subTitle,
      md: md ?? '',
      date,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
