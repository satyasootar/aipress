"use client";

import { useActionState, useEffect } from "react";
import { createPost } from "@/actions/post";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

const initialState = { error: "", success: false };

export default function CreatePostForm() {
  const [state, formAction, isPending] = useActionState(createPost, initialState);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-6 bg-white p-6 rounded-lg border">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" required placeholder="My Awesome Post" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea 
          id="content" 
          name="content" 
          required 
          placeholder="Write your post content here..." 
          className="min-h-[200px]"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="published" name="published" />
        <Label htmlFor="published">Publish immediately</Label>
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Create Post"}
      </Button>
    </form>
  );
}
