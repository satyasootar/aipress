import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api-utils";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { createPostSchema } from "@/schemas/post";

export async function GET(req: NextRequest) {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: { name: true, email: true },
        },
      },
    });

    return successResponse(posts);
  } catch (error) {
    console.error("GET Posts Error:", error);
    return errorResponse("Internal server error", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    let session;
    try {
      session = await requireAuth();
    } catch (e) {
      return errorResponse("Unauthorized", 401);
    }

    const body = await req.json();
    const validatedFields = createPostSchema.safeParse(body);

    if (!validatedFields.success) {
      return errorResponse("Invalid input", 400);
    }

    const { title, content, published } = validatedFields.data;

    const post = await prisma.post.create({
      data: {
        title,
        content,
        published: published ?? true, // For API creation, maybe default to true if not provided, or false. Schema defaults to false.
        authorId: session.userId,
      },
    });

    return successResponse(post, 201);
  } catch (error) {
    console.error("POST Post Error:", error);
    return errorResponse("Internal server error", 500);
  }
}
