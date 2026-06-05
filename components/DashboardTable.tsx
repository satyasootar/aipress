"use client";

import { useTransition } from "react";
import Link from "next/link";
import { deletePost } from "@/actions/post";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Post {
  id: string;
  title: string;
  published: boolean;
  createdAt: Date;
}

export default function DashboardTable({ posts }: { posts: Post[] }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      startTransition(async () => {
        const result = await deletePost(id);
        if (result?.error) {
          toast.error(result.error);
        } else {
          toast.success("Post deleted");
        }
      });
    }
  };

  if (posts.length === 0) {
    return <p className="text-muted-foreground">You haven't created any posts yet.</p>;
  }

  return (
    <div className="rounded-sm border border-white/10 bg-black">
      <Table>
        <TableHeader className="border-white/10">
          <TableRow className="border-white/10 hover:bg-white/5">
            <TableHead className="text-gray-400 font-sans tracking-wider uppercase text-xs">Title</TableHead>
            <TableHead className="text-gray-400 font-sans tracking-wider uppercase text-xs">Status</TableHead>
            <TableHead className="text-gray-400 font-sans tracking-wider uppercase text-xs">Date</TableHead>
            <TableHead className="text-right text-gray-400 font-sans tracking-wider uppercase text-xs">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id} className="border-white/10 hover:bg-white/5">
              <TableCell className="font-serif text-white text-lg">{post.title}</TableCell>
              <TableCell>
                {post.published ? (
                  <span className="inline-flex items-center rounded-sm border px-2.5 py-0.5 text-[10px] font-sans tracking-widest uppercase text-white border-white/20 bg-white/10">
                    Published
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-sm border px-2.5 py-0.5 text-[10px] font-sans tracking-widest uppercase text-gray-500 border-white/10 bg-black">
                    Draft
                  </span>
                )}
              </TableCell>
              <TableCell className="font-sans text-xs text-gray-400 tracking-wider">
                {new Date(post.createdAt).toISOString().split('T')[0]}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Link href={`/blog/${post.id}`} target="_blank">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/10 font-sans uppercase tracking-widest text-[10px]">View</Button>
                </Link>
                <Link href={`/dashboard/edit/${post.id}`}>
                  <Button variant="outline" size="sm" className="bg-transparent border-white/20 text-gray-300 hover:text-white hover:bg-white/10 font-sans uppercase tracking-widest text-[10px]">Edit</Button>
                </Link>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => handleDelete(post.id)}
                  disabled={isPending}
                  className="font-sans uppercase tracking-widest text-[10px] bg-red-900/50 hover:bg-red-900 text-red-200"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
