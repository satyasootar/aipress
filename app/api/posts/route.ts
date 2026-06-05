import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all posts
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ success: true, data: posts }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST a new post
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, authorId } = body;
    
    if (!title || !content || !authorId) {
       return NextResponse.json({ success: false, error: "Missing required fields: title, content, authorId" }, { status: 400 });
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
        published: true
      }
    });

    return NextResponse.json({ success: true, data: newPost }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
