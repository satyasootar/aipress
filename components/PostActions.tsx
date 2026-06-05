"use client";

import { useState, useTransition } from "react";
import { toggleLike, addComment } from "@/actions/interactions";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface PostActionsProps {
  postId: string;
  initialLiked: boolean;
  likeCount: number;
  commentCount: number;
  isAuthenticated: boolean;
}

export default function PostActions({ postId, initialLiked, likeCount, commentCount, isAuthenticated }: PostActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [liked, setLiked] = useState(initialLiked);
  const [localLikeCount, setLocalLikeCount] = useState(likeCount);
  const [commentText, setCommentText] = useState("");
  const router = useRouter();

  const handleLike = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to like this post.");
      return router.push("/login");
    }

    startTransition(async () => {
      try {
        setLiked(!liked);
        setLocalLikeCount(liked ? localLikeCount - 1 : localLikeCount + 1);
        await toggleLike(postId);
      } catch (err: any) {
        setLiked(liked);
        setLocalLikeCount(likeCount);
        toast.error(err.message);
      }
    });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please sign in to comment.");
      return router.push("/login");
    }

    if (!commentText.trim()) return;

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("content", commentText);
        await addComment(postId, formData);
        setCommentText("");
        toast.success("Comment added!");
      } catch (err: any) {
        toast.error(err.message);
      }
    });
  };

  return (
    <div className="mt-12 border-t border-dashed-faint pt-8">
      <div className="flex items-center gap-6 mb-8">
        <button 
          onClick={handleLike} 
          disabled={isPending}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
        >
          <Heart className={`w-5 h-5 transition-colors ${liked ? "fill-white text-white" : "group-hover:text-white"}`} />
          <span className="font-sans text-sm font-bold">{localLikeCount}</span>
        </button>
        <div className="flex items-center gap-2 text-gray-400">
          <MessageSquare className="w-5 h-5" />
          <span className="font-sans text-sm font-bold">{commentCount}</span>
        </div>
      </div>

      <form onSubmit={handleCommentSubmit} className="flex flex-col gap-4">
        <h3 className="font-sans text-xs tracking-widest uppercase text-white font-bold">Leave a comment</h3>
        <textarea 
          className="w-full bg-zinc-900 border border-white/10 text-white p-4 font-serif focus:outline-none focus:border-white/30 resize-none h-24"
          placeholder="Share your thoughts..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          disabled={isPending}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isPending || !commentText.trim()} className="bg-white text-black hover:bg-gray-200 font-sans tracking-wide rounded-sm px-8">
            {isPending ? "Posting..." : "Post Comment"}
          </Button>
        </div>
      </form>
    </div>
  );
}
