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
      <div className="flex justify-between items-end mb-6">
        <div className="flex flex-col">
          <h2 className="text-[11px] sm:text-xs font-bold tracking-[0.15em] text-gray-400 uppercase font-sans mb-1">
            Overview
          </h2>
          <h3 className="text-2xl font-serif text-white">Your Posts</h3>
        </div>
        <Link href="/dashboard/new">
          <Button className="bg-white text-black hover:bg-gray-200 font-serif tracking-wide rounded-sm px-6">
            Write a Story
          </Button>
        </Link>
      </div>
      <DashboardTable posts={posts} />
    </div>
  );
}
