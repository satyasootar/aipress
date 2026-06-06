"use server";

import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { createPostSchema, updatePostSchema } from "@/schemas/post";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(prevState: any, formData: FormData) {
  try {
    const session = await requireAuth();
    const data = Object.fromEntries(formData.entries());
    
    // Checkbox values come through as 'on' if checked. Let's handle it:
    const parsedData = {
      ...data,
      published: data.published === 'on' || data.published === 'true',
    };

    const validatedFields = createPostSchema.safeParse(parsedData);

    if (!validatedFields.success) {
      return { error: "Invalid fields: " + validatedFields.error.issues.map((e: any) => e.message).join(", "), success: false };
    }

    const { title, content, published } = validatedFields.data;

    await prisma.post.create({
      data: {
        title,
        content,
        published: published ?? false,
        authorId: session.userId,
      },
    });

    revalidatePath("/blog");
    revalidatePath("/dashboard");
    
    // We can't redirect inside try-catch easily if we want to return error state,
    // so we return a specific signal or just redirect directly since it throws an error in Next.js.
  } catch (error: any) {
    if (error.message === "NEXT_REDIRECT") throw error; // Redirect throws an error we shouldn't catch
    console.error("Create Post Error:", error);
    return { error: "Internal server error", success: false };
  }
  
  redirect("/dashboard");
}

export async function updatePost(postId: string, prevState: any, formData: FormData) {
  try {
    const session = await requireAuth();
    const data = Object.fromEntries(formData.entries());
    
    const parsedData = {
      ...data,
      published: data.published === 'on' || data.published === 'true',
    };

    const validatedFields = updatePostSchema.safeParse(parsedData);

    if (!validatedFields.success) {
      return { error: "Invalid fields", success: false };
    }

    const post = await prisma.post.findUnique({ where: { id: postId } });
    
    if (!post) {
      return { error: "Post not found", success: false };
    }

    if (post.authorId !== session.userId) {
      return { error: "Unauthorized", success: false };
    }

    await prisma.post.update({
      where: { id: postId },
      data: validatedFields.data,
    });

    revalidatePath("/blog");
    revalidatePath(`/blog/${postId}`);
    revalidatePath("/dashboard");
  } catch (error: any) {
    if (error.message === "NEXT_REDIRECT") throw error;
    console.error("Update Post Error:", error);
    return { error: "Internal server error", success: false };
  }
  
  redirect("/dashboard");
}

export async function deletePost(postId: string) {
  try {
    const session = await requireAuth();
    
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      return { error: "Post not found", success: false };
    }

    if (post.authorId !== session.userId) {
      return { error: "Unauthorized", success: false };
    }

    await prisma.post.delete({ where: { id: postId } });

    revalidatePath("/blog");
    revalidatePath("/dashboard");
    revalidatePath(`/blog/${postId}`);
    
    return { success: true };
  } catch (error) {
    console.error("Delete Post Error:", error);
    return { error: "Internal server error", success: false };
  }
}
