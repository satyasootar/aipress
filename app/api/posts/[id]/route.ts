import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api-utils";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { updatePostSchema } from "@/schemas/post";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // Next.js 15+ dynamic APIs
) {
  try {
    const { id } = await context.params;
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: { name: true, email: true },
        },
      },
    });

    if (!post) {
      return errorResponse("Post not found", 404);
    }

    if (!post.published) {
      return errorResponse("Post not found", 404); // Simplified: hide unpublished posts
    }

    return successResponse(post);
  } catch (error) {
    console.error("GET Post Error:", error);
    return errorResponse("Internal server error", 500);
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    let session;
    try {
      session = await requireAuth();
    } catch (e) {
      return errorResponse("Unauthorized", 401);
    }

    const { id } = await context.params;
    const post = await prisma.post.findUnique({ where: { id } });

    if (!post) return errorResponse("Post not found", 404);
    if (post.authorId !== session.userId) return errorResponse("Forbidden", 403);

    const body = await req.json();
    const validatedFields = updatePostSchema.safeParse(body);

    if (!validatedFields.success) {
      return errorResponse("Invalid input", 400);
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: validatedFields.data,
    });

    return successResponse(updatedPost);
  } catch (error) {
    console.error("PATCH Post Error:", error);
    return errorResponse("Internal server error", 500);
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    let session;
    try {
      session = await requireAuth();
    } catch (e) {
      return errorResponse("Unauthorized", 401);
    }

    const { id } = await context.params;
    const post = await prisma.post.findUnique({ where: { id } });

    if (!post) return errorResponse("Post not found", 404);
    if (post.authorId !== session.userId) return errorResponse("Forbidden", 403);

    await prisma.post.delete({ where: { id } });

    return successResponse({ deleted: true });
  } catch (error) {
    console.error("DELETE Post Error:", error);
    return errorResponse("Internal server error", 500);
  }
}
