import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import PostActions from "@/components/PostActions";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession();

  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: { name: true, email: true },
      },
      _count: {
        select: { likes: true, comments: true }
      },
      comments: {
        include: { author: { select: { name: true } } },
        orderBy: { createdAt: 'desc' }
      }
    },
  });

  if (!post || !post.published) {
    notFound();
  }

  // Check if current user liked this
  let initialLiked = false;
  if (session) {
    const like = await prisma.like.findUnique({
      where: {
        authorId_postId: {
          authorId: session.userId,
          postId: post.id
        }
      }
    });
    if (like) initialLiked = true;
  }

  return (
    <article className="max-w-3xl mx-auto space-y-8 py-16 px-4">
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 font-sans">
          <Link href="/blog" className="hover:text-white transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span>Article</span>
        </div>
        
        <h1 className="text-4xl lg:text-6xl font-serif text-white leading-tight">
          {post.title}
        </h1>
        <p className="text-sm font-sans text-gray-400 tracking-widest uppercase">
          By <span className="text-white">{post.author.name || post.author.email}</span> •{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div 
        className="prose prose-invert max-w-none text-gray-300 font-serif text-lg leading-relaxed space-y-6 mt-12"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <PostActions 
        postId={post.id} 
        initialLiked={initialLiked} 
        likeCount={post._count.likes} 
        commentCount={post._count.comments} 
        isAuthenticated={!!session}
      />

      {/* Render existing comments */}
      <div className="mt-12 space-y-6">
        {post.comments.map(comment => (
          <div key={comment.id} className="border-t border-dashed-faint pt-6">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-sm font-sans font-bold text-white uppercase tracking-wider">
                {comment.author.name}
              </span>
              <span className="text-xs font-sans text-gray-500">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-300 font-serif leading-relaxed">
              {comment.content}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}
