"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function toggleLike(postId: string) {
  const session = await getSession();
  if (!session) {
    throw new Error("Must be logged in to like a post.");
  }

  const existingLike = await prisma.like.findUnique({
    where: {
      authorId_postId: {
        authorId: session.userId,
        postId: postId,
      },
    },
  });

  if (existingLike) {
    await prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    });
  } else {
    await prisma.like.create({
      data: {
        authorId: session.userId,
        postId: postId,
      },
    });
  }

  revalidatePath(`/blog/${postId}`);
  return { success: true };
}

export async function addComment(postId: string, formData: FormData) {
  const session = await getSession();
  if (!session) {
    throw new Error("Must be logged in to comment.");
  }

  const content = formData.get("content") as string;
  if (!content || content.trim() === "") {
    throw new Error("Comment cannot be empty.");
  }

  await prisma.comment.create({
    data: {
      content: content.trim(),
      authorId: session.userId,
      postId: postId,
    },
  });

  revalidatePath(`/blog/${postId}`);
  return { success: true };
}
