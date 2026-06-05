import EditPostForm from "@/components/EditPostForm";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireAuth();
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) {
    notFound();
  }

  if (post.authorId !== session.userId) {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-4 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            &larr; Back
          </Button>
        </Link>
        <h2 className="text-xl font-semibold">Edit Post</h2>
      </div>
      <EditPostForm post={post} />
    </div>
  );
}
