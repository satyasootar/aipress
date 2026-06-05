import CreatePostForm from "@/components/CreatePostForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NewPostPage() {
  return (
    <div className="space-y-4 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            &larr; Back
          </Button>
        </Link>
        <h2 className="text-xl font-semibold">Create New Post</h2>
      </div>
      <CreatePostForm />
    </div>
  );
}
