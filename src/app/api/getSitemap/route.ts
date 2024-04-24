import { NextResponse } from 'next/server';
import { getMetadataPaths } from '@/src/utils/fs';
import path from 'path';

const rootDirectory = path.join(process.cwd(), 'public/assets/blog');

export async function GET() {
  try {
    const paths = await getMetadataPaths(rootDirectory);

    NextResponse.json({ paths, success: true }, { status: 200 });
  } catch (error) {
    console.error('Get sitemap failed:', error);
    NextResponse.json({ paths: [], success: false }, { status: 500 });
  }
}
