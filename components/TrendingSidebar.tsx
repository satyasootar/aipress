import Link from "next/link";
import { DummyPost } from "@/lib/data";
import { ChevronUp } from "lucide-react";

interface TrendingSidebarProps {
  posts: DummyPost[];
}

export default function TrendingSidebar({ posts }: TrendingSidebarProps) {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl overflow-hidden sticky top-36">
      <div className="divide-y divide-gray-100">
        {posts.map((post) => (
          <Link key={post.id} href={`#`} className="flex gap-4 p-5 sm:p-6 hover:bg-slate-50 transition-colors group">
            <div className="flex flex-col items-center justify-center min-w-[3rem] h-12 bg-slate-100 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
              <ChevronUp className="w-4 h-4 mb-0.5" />
              <span className="text-xs font-bold">{post.upvotes}</span>
            </div>
            <div className="flex flex-col justify-center">
              <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                {post.title}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
