import { NextRequest, NextResponse } from 'next/server';
import { rootDirectoryCheck } from '@/src/utils/fs';
import { getSession } from '@/src/utils/getSession';

export async function POST(req: NextRequest) {
  const { dirName } = await req.json();

  const session = await getSession();

  if (!session || session.user.id !== String(process.env.NEXT_PUBLIC_USERID)) {
    return NextResponse.json(
      { message: `더이상 지나갈 수 없다만,,?`, success: false },
      { status: 400 },
    );
  }

  try {
    const exists = await rootDirectoryCheck(dirName);

    return NextResponse.json(
      {
        success: !exists,
        message: !exists
          ? `사용 가능한 이름입니다.`
          : `이미 사용중인 이름입니다.`,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Check root directory failed:', error);
    return NextResponse.json(
      { success: false, message: '파일 체크 도중 에러가 발생했습니다.' },
      { status: 400 },
    );
  }
}
