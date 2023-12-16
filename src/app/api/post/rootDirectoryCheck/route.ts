import { NextRequest, NextResponse } from 'next/server';
import { rootDirectoryCheck } from '@/src/utils/fs';

interface RequestBody {
  dirName: string;
}

async function getRootDirectoryCheck(info: RequestBody) {
  try {
    const response = rootDirectoryCheck(info.dirName);

    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function POST(req: NextRequest) {
  const request: RequestBody = await req.json();

  try {
    const response = await getRootDirectoryCheck(request);

    if (!response) {
      return NextResponse.json(
        { success: false, message: `이미 사용중인 이름입니다.` },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { success: true, message: `사용 가능한 이름입니다.` },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
