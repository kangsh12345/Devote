import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/utils/auth';
import { createPost } from '@/src/utils/fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface RequestBody {
  id: number;
  path: string;
  newPath: string;
  thumbnail: string;
  title: string;
  subTitle: string;
  md: string | undefined;
  date: string;
}

interface UpdatePostProps {
  id: number;
  userId: string;
  newPath: string;
  thumbnail: string;
  title: string;
  subTitle: string;
}

async function updatePost({
  id,
  userId,
  newPath,
  thumbnail,
  title,
  subTitle,
}: UpdatePostProps) {
  try {
    const response = await prisma.post.update({
      where: {
        id,
        userId,
      },
      data: {
        path: newPath,
        thumbnail,
        title,
        subTitle,
      },
    });

    console.log(response);
  } catch (error) {
    console.error(error);
  }
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
  const name = session?.user.name;

  const {
    id,
    path,
    newPath,
    thumbnail,
    title,
    subTitle,
    md,
    date,
  }: RequestBody = await req.json();

  try {
    await updatePost({
      id,
      userId,
      newPath,
      thumbnail,
      title,
      subTitle,
    });

    await createPost({
      fullPath: path,
      name,
      title,
      md: md ?? '',
      date,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
