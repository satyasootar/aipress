import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import DashboardTable from "@/components/DashboardTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getSession();
  
  if (!session) return null; // should be caught by layout anyway

  const posts = await prisma.post.findMany({
    where: { authorId: session.userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Posts</h2>
        <Link href="/dashboard/new">
          <Button>Create Post</Button>
        </Link>
      </div>
      <DashboardTable posts={posts} />
    </div>
  );
}
