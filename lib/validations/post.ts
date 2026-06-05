import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long.").max(120, "Title is too long."),
  content: z.string().min(10, "Content must be at least 10 characters long."),
});

export type PostInput = z.infer<typeof postSchema>;
