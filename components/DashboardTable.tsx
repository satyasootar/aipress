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
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="font-medium">{post.title}</TableCell>
              <TableCell>
                {post.published ? (
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-green-600 border-green-200 bg-green-50">
                    Published
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-gray-600 border-gray-200 bg-gray-50">
                    Draft
                  </span>
                )}
              </TableCell>
              <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="text-right space-x-2">
                <Link href={`/blog/${post.id}`} target="_blank">
                  <Button variant="ghost" size="sm">View</Button>
                </Link>
                <Link href={`/dashboard/edit/${post.id}`}>
                  <Button variant="outline" size="sm">Edit</Button>
                </Link>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => handleDelete(post.id)}
                  disabled={isPending}
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
