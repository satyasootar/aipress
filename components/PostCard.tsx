import Link from "next/link";
import { getThumbnailUrl } from "@/lib/utils/thumbnail";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    author: {
      name: string | null;
      email: string;
    };
  };
}

// Strip HTML for excerpt
const extractText = (html: string) => {
  return html.replace(/<[^>]+>/g, '').substring(0, 150) + '...';
};

export default function PostCard({ post }: PostCardProps) {
  const thumbnailUrl = getThumbnailUrl(post.id);

  return (
    <Link href={`/blog/${post.id}`} className="flex flex-col group h-full">
      <div className="w-full aspect-[3/2] relative border border-white/10 mb-4 p-1.5 bg-black overflow-hidden">
        {thumbnailUrl ? (
           <img src={thumbnailUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        ) : (
          <div className="w-full h-full relative bg-zinc-800">
            <div className="absolute inset-0 vintage-image-filter opacity-40 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>
            {/* Inner graphical element fallback */}
            <div className="absolute inset-4 border border-black flex items-center justify-center overflow-hidden">
               <div className="w-full h-px bg-black absolute top-1/2 -translate-y-1/2 transform rotate-45"></div>
               <div className="w-px h-full bg-black absolute left-1/2 -translate-x-1/2 transform rotate-45"></div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col flex-grow">
        <div className="text-[11px] font-sans font-bold text-white mb-2 tracking-wide uppercase line-clamp-1">
          {post.title}
        </div>
        <p className="text-gray-400 font-serif text-sm leading-relaxed line-clamp-3 mb-4">
          {extractText(post.content)}
        </p>
        <div className="flex items-center gap-2 mt-auto">
          <span className="text-[10px] text-gray-500 font-sans uppercase tracking-wider">
             By {post.author.name || post.author.email.split('@')[0]}
          </span>
          <span className="text-gray-600 px-1">•</span>
          <span className="text-[10px] text-gray-500 font-sans tracking-wider">
             {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
