import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwtDecode from 'jwt-decode';

const prisma = new PrismaClient();

async function signUp(credential: string) {
  const decoded: { name: string; email: string; picture: string } =
    jwtDecode(credential);

  try {
    const response = await prisma.user.upsert({
      where: {
        email: decoded.email,
      },
      update: {
        name: decoded.name,
        image: decoded.picture,
      },
      create: {
        email: decoded.email,
        name: decoded.name,
        image: decoded.picture,
      },
    });

    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function GET(req: NextRequest) {
  const credential = req.nextUrl.searchParams.get('credential');

  console.log(req.nextUrl.searchParams);

  try {
    const products = await signUp(String(credential));
    return NextResponse.json(
      { items: products, message: `Success` },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: `Failed` }, { status: 400 });
  }
}
