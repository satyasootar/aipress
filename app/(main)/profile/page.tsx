import prisma from "@/lib/prisma";
import { getSession, requireAuth } from "@/lib/auth";
import { logout } from "@/actions/auth";
import SectionHeader from "@/components/SectionHeader";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  await requireAuth();
  const session = await getSession();

  const user = await prisma.user.findUnique({
    where: { id: session!.userId },
    include: {
      posts: true,
      comments: {
        include: { post: true },
        orderBy: { createdAt: "desc" }
      },
      likes: {
        include: { post: true },
        orderBy: { createdAt: "desc" }
      }
    }
  });

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 max-w-5xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8 border-dashed">
        <h1 className="text-3xl md:text-4xl font-serif text-white tracking-tight uppercase">Profile</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="border border-white/10 p-6 bg-zinc-900/50 flex flex-col h-full">
            <h2 className="text-2xl font-serif text-white mb-2">{user.name || "Anonymous User"}</h2>
            <p className="text-gray-400 font-sans text-sm mb-6">{user.email}</p>
            <div className="flex flex-col gap-3 font-sans text-sm text-gray-400 border-t border-dashed-faint pt-4 mb-8">
              <span>Member since {user.createdAt.toISOString().split('T')[0]}</span>
              <span>{user.posts.length} Posts</span>
              <span>{user.comments.length} Comments</span>
              <span>{user.likes.length} Likes</span>
            </div>
            
            <form action={logout} className="mt-auto">
              <Button type="submit" variant="outline" className="w-full bg-transparent border-white/20 text-gray-300 hover:text-white hover:bg-white/10 font-sans uppercase tracking-widest text-[10px]">
                Sign Out
              </Button>
            </form>
          </div>
        </div>

        <div className="md:col-span-2 flex flex-col gap-12">
          
          <div>
            <h2 className="text-xs font-bold tracking-[0.15em] text-gray-400 uppercase font-sans mb-6 border-b border-dashed-faint pb-3">Your Recent Comments</h2>
            <div className="space-y-4">
              {user.comments.length === 0 ? (
                <p className="text-gray-500 font-sans text-sm">You haven't commented on anything yet.</p>
              ) : (
                user.comments.map((comment: any) => (
                  <div key={comment.id} className="border border-white/10 p-4 bg-zinc-900/30">
                    <p className="text-white font-serif mb-2 leading-relaxed">"{comment.content}"</p>
                    <p className="text-xs font-sans text-gray-500 uppercase tracking-widest">
                      On <Link href={`/blog/${comment.postId}`} className="text-white hover:underline underline-offset-4">{comment.post.title}</Link> 
                      {" • "}{new Date(comment.createdAt).toISOString().split('T')[0]}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold tracking-[0.15em] text-gray-400 uppercase font-sans mb-6 border-b border-dashed-faint pb-3">Recently Liked Posts</h2>
            <div className="space-y-4">
              {user.likes.length === 0 ? (
                <p className="text-gray-500 font-sans text-sm">You haven't liked any posts yet.</p>
              ) : (
                user.likes.map((like: any) => (
                  <div key={like.id} className="flex flex-col border-b border-dashed-faint pb-3 last:border-0">
                    <Link href={`/blog/${like.postId}`} className="text-white font-serif text-lg hover:underline underline-offset-4 mb-1">
                      {like.post.title}
                    </Link>
                    <span className="text-xs font-sans text-gray-500 uppercase tracking-widest">Liked on {new Date(like.createdAt).toISOString().split('T')[0]}</span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
