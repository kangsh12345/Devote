import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/utils/auth';
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

export async function POST(req: NextRequest, res: NextResponse) {
  const request: RequestBody = await req.json();

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
    } else {
      return NextResponse.json(
        { message: `더이상 지나갈 수 없다만,,?` },
        { status: 400 },
      );
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
