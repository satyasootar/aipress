import prisma from "@/lib/prisma";
import PostCard from "@/components/PostCard";

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
        <p className="text-muted-foreground text-lg">
          Read the latest posts from our community.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: any) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
