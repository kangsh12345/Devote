import { NextRequest, NextResponse } from 'next/server';
import { createDirectory } from '@/src/utils/mkdir';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { id, dirName } = await req.json();

  try {
    const mkdirResponse = createDirectory({ dirName });

    if (mkdirResponse === 'create success') {
      const response = await prisma.user.update({
        where: { id: id },
        data: {
          dirName: dirName,
        },
      });

      console.log(response);

      return NextResponse.json({ message: 'success' }, { status: 200 });
    }
    return NextResponse.json({ message: 'exist' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
