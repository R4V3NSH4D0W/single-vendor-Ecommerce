import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: { filename: string } }
) {
  const IMAGE_DIR = path.join(process.cwd(), 'images');
  const filePath = path.join(IMAGE_DIR, params.filename);

  try {
    const file = await fs.readFile(filePath);
    const extension = path.extname(params.filename).substring(1);
    
    return new NextResponse(file, {
      headers: {
        'Content-Type': `image/${extension}`,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return new NextResponse('Image not found', { status: 404 });
  }
}