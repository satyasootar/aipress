import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET a specific post by ID
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
    
    return NextResponse.json({ success: true, data: post }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PATCH (Update) an existing post
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const updatedPost = await prisma.post.update({
      where: { id },
      data: body
    });

    return NextResponse.json({ success: true, data: updatedPost }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE an existing post
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    await prisma.post.delete({
      where: { id }
    });

    return NextResponse.json({ success: true, message: "Post deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
