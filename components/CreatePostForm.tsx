"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostSchema, CreatePostInput } from "@/schemas/post";
import TiptapEditor from "./TiptapEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "@/actions/post";

export default function CreatePostForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      content: "",
      published: true,
    },
  });

  const onSubmit = (data: CreatePostInput) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("published", "on");

      const result = await createPost(null, formData);
      
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Post created successfully!");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full mt-8">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-gray-400 font-sans tracking-widest uppercase text-xs">Title</Label>
        <Input 
          id="title" 
          placeholder="Enter an engaging title..." 
          {...register("title")} 
          className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 py-6 text-3xl font-serif text-white focus-visible:ring-0 focus-visible:border-white transition-colors"
        />
        {errors.title && <p className="text-red-400 text-sm font-sans mt-2">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label className="text-gray-400 font-sans tracking-widest uppercase text-xs mb-2 block">Content</Label>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <TiptapEditor content={field.value} onChange={field.onChange} />
          )}
        />
        {errors.content && <p className="text-red-400 text-sm font-sans mt-2">{errors.content.message}</p>}
      </div>

      <div className="flex justify-end pt-4 border-t border-dashed border-white/10">
        <Button 
          type="submit" 
          disabled={isPending}
          className="bg-white text-black hover:bg-gray-200 font-sans tracking-wide rounded-sm px-8"
        >
          {isPending ? "Publishing..." : "Publish Post"}
        </Button>
      </div>
    </form>
  );
}
