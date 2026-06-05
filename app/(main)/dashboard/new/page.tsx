import CreatePostForm from "@/components/CreatePostForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NewPostPage() {
  return (
    <div className="space-y-4 w-full">
      <Link href="/dashboard" className="text-gray-400 hover:text-white uppercase tracking-widest text-xs font-sans inline-block mb-4 transition-colors">
        &larr; Back to Overview
      </Link>
      <CreatePostForm />
    </div>
  );
}
