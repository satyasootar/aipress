import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  content: z.string().min(10, "Content must be at least 10 characters long"),
  published: z.boolean(),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;

export const updatePostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long").optional(),
  content: z.string().min(10, "Content must be at least 10 characters long").optional(),
  published: z.boolean().optional(),
});

export type UpdatePostInput = z.infer<typeof updatePostSchema>;
