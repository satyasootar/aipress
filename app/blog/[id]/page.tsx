import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });

  if (!post || !post.published) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto space-y-8">
      <div className="space-y-4">
        <Link href="/blog">
          <Button variant="ghost" className="-ml-4 text-muted-foreground">
            &larr; Back to Blog
          </Button>
        </Link>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {post.title}
        </h1>
        <p className="text-muted-foreground">
          By {post.author.name || post.author.email} on{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="prose prose-slate max-w-none">
        {/* Render simple text, could use a markdown parser here if needed */}
        {post.content.split("\n").map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </article>
  );
}
