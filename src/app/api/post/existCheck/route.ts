import { NextRequest, NextResponse } from 'next/server';
import { existPost } from '@/src/utils/fs';
import { getSession } from '@/src/utils/getSession';
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

export async function POST(req: NextRequest) {
  const { path } = await req.json();

  const session = await getSession();

  if (!session || session.user.id !== String(process.env.NEXT_PUBLIC_USERID)) {
    return NextResponse.json(
      { message: `더이상 지나갈 수 없다만,,?` },
      { status: 400 },
    );
  }

  try {
    const response = await existCheckPost(path);

    return NextResponse.json(
      { success: true, exist: response === 'exist', message: '사용 가능' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Exist check failed:', error);
    return NextResponse.json(
      {
        success: false,
        exist: true,
        message: '중복 체크 도중 에러가 발생했습니다.',
      },
      { status: 500 },
    );
  }
}
