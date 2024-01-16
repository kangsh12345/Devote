import { NextRequest, NextResponse } from 'next/server';
import { createDirectory } from '@/src/utils/fs';
import { PrismaClient } from '@prisma/client';
import { format } from 'date-fns';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { id, dirName, type } = await req.json();

  const lastSlashIndex = dirName.lastIndexOf('/');

  const fileTitle = dirName.substring(lastSlashIndex + 1);

  try {
    const mkdirResponse = createDirectory({ dirName, type });

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
            path: dirName,
            thumbnail: '',
            title: fileTitle,
            subTitle: '',
            date: format(new Date(), 'yyyy-MM-dd'),
          },
        });

        console.log(response);
      }

      return NextResponse.json({ message: 'success' }, { status: 200 });
    }
    return NextResponse.json({ message: mkdirResponse }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
