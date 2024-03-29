import { NextRequest, NextResponse } from 'next/server';
import { createDirectory } from '@/src/utils/fs';
import { PrismaClient } from '@prisma/client';
import { format } from 'date-fns';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { id, name, dirName, type } = await req.json();

  const lastSlashIndex = dirName.lastIndexOf('/');

  const fileTitle = dirName.substring(lastSlashIndex + 1);

  try {
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
            date: format(new Date(), 'yyyy-MM-dd'),
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
  } catch (error) {
    return NextResponse.json(
      { success: false, exist: true, message: error },
      { status: 400 },
    );
  }
}
