import Link from "next/link";
import { DummyPost } from "@/lib/data";
import { Eye, ListVideo } from "lucide-react";

interface LandingPostCardProps {
  post: DummyPost;
  featured?: boolean;
}

export default function LandingPostCard({ post, featured }: LandingPostCardProps) {
  return (
    <Link href={`#`} className="group flex flex-col h-full bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Top Image Area */}
      <div 
        className={`w-full ${featured ? "h-64 sm:h-80" : "h-48 sm:h-56"} bg-blue-50/50 bg-dot-pattern relative flex items-center justify-center p-6 border-b border-gray-100 overflow-hidden`}
      >
        {/* Abstract Isometric Shapes */}
        <div className="relative w-full h-full flex items-center justify-center">
          <div 
            className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-lg isometric-cube opacity-90 transition-transform duration-500 group-hover:-translate-y-2"
            style={{ backgroundColor: post.colorHex, boxShadow: "12px 12px 0px rgba(0,0,0,0.1)" }}
          ></div>
          <div 
            className="absolute w-12 h-12 sm:w-16 sm:h-16 rounded-full isometric-cube opacity-80 translate-x-12 translate-y-8 border-4 border-white"
            style={{ backgroundColor: "#0f172a" }}
          ></div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-grow p-6 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800 bg-slate-100 px-3 py-1 rounded-md">
            <ListVideo className="w-3 h-3 text-blue-500" />
            {post.category}
          </div>
          <span className="text-sm font-medium text-slate-500">{post.date}</span>
        </div>

        <h3 className={`${featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"} font-extrabold text-slate-900 leading-tight mb-3 group-hover:text-blue-600 transition-colors`}>
          {post.title}
        </h3>
        
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3 mb-6 flex-grow">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
            </div>
            <span className="text-sm font-semibold text-slate-700">By {post.author.name}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 font-medium text-sm">
            <Eye className="w-4 h-4" />
            {post.views}
          </div>
        </div>
      </div>
    </Link>
  );
}
