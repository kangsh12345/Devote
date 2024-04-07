import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/utils/auth';
import { createDirectory } from '@/src/utils/fs';
import { PrismaClient } from '@prisma/client';
import { format } from 'date-fns';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const { id, name, dirName, type } = await req.json();

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

  const lastSlashIndex = dirName.lastIndexOf('/');

  const fileTitle = dirName.substring(lastSlashIndex + 1);

  try {
    if (session?.user.id === String(process.env.NEXT_PUBLIC_USERID)) {
      const mkdirResponse = createDirectory({ dirName, name, type });

      if (mkdirResponse === 'create success') {
        if (type === 'rootDirectory') {
          const response = await prisma.user.update({
            where: { id: id },
            data: {
              dirName: dirName,
            },
          });

          console.log(response);
        } else if (type === 'file') {
          const response = await prisma.post.create({
            data: {
              userId: id,
              name,
              path: dirName,
              thumbnail: '',
              title: fileTitle,
              subTitle: '',
              date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            },
          });

          console.log(response);
        }

        return NextResponse.json(
          { success: true, exist: false, message: mkdirResponse },
          { status: 200 },
        );
      }
      return NextResponse.json(
        { success: true, exist: true, message: mkdirResponse },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { message: `더이상 지나갈 수 없다만,,?` },
        { status: 400 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, exist: true, message: error },
      { status: 400 },
    );
  }
}
