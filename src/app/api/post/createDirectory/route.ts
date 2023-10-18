import { NextRequest, NextResponse } from 'next/server';
import { createDirectory } from '@/src/utils/mkdir';

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  try {
    const response = createDirectory({ email });

    console.log(response);
    console.log('mkdir');

    return NextResponse.json({ message: 'success' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
