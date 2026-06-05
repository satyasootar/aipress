"use client";

import { useActionState, useEffect } from "react";
import { updatePost } from "@/actions/post";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
}

const initialState = { error: "", success: false };

export default function EditPostForm({ post }: { post: Post }) {
  // We need to bind the postId to the action
  const updatePostWithId = updatePost.bind(null, post.id);
  const [state, formAction, isPending] = useActionState(updatePostWithId, initialState);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-6 bg-white p-6 rounded-lg border">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" required defaultValue={post.title} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea 
          id="content" 
          name="content" 
          required 
          defaultValue={post.content}
          className="min-h-[200px]"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="published" name="published" defaultChecked={post.published} />
        <Label htmlFor="published">Published</Label>
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Update Post"}
      </Button>
    </form>
  );
}
