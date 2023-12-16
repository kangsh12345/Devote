import { NextRequest, NextResponse } from 'next/server';
import { createPost } from '@/src/utils/fs';
import { format } from 'date-fns';

export async function POST(req: NextRequest) {
  const { id, contentHtml, title } = await req.json();

  try {
    await createPost({
      id,
      contentHtml,
      title,
      date: format(new Date(), 'yyyy-MM-dd'),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
