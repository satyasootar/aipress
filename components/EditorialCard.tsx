import Link from "next/link";
import { getThumbnailUrl } from "@/lib/utils/thumbnail";

interface EditorialCardProps {
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
  variant?: "featured" | "grid" | "compact" | "list-small";
}

// Strip HTML for excerpt
const extractText = (html: string) => {
  return html.replace(/<[^>]+>/g, '').substring(0, 150) + '...';
};

export default function EditorialCard({ post, variant = "grid" }: EditorialCardProps) {
  const thumbnailUrl = getThumbnailUrl(post.id);
  const authorName = post.author.name || post.author.email.split('@')[0];
  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${authorName}`;
  const excerpt = extractText(post.content);

  if (variant === "featured") {
    return (
      <Link href={`/blog/${post.id}`} className="flex flex-col group block">
        {/* Massive Image Block */}
        <div className="w-full aspect-[16/9] md:aspect-[3/2] relative overflow-hidden border border-white/10 mb-6 p-2 bg-black">
          <img src={thumbnailUrl} alt={post.title} className="w-full h-full object-cover" />
        </div>
        
        <div className="flex flex-col text-center items-center px-4">
          <div className="text-xs uppercase tracking-widest text-gray-400 mb-3 font-sans">
            Featured
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white mb-4 group-hover:underline decoration-1 underline-offset-4">
            {post.title}
          </h2>
          <p className="text-gray-400 font-serif text-lg leading-relaxed max-w-xl mb-4 line-clamp-2">
            {excerpt}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-600 bg-white/10 flex items-center justify-center">
              <img src={avatarUrl} alt={authorName} className="w-full h-full object-cover grayscale" />
            </div>
            <span className="text-xs text-gray-400 font-sans tracking-wide">{authorName}</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "list-small") {
    return (
      <Link href={`/blog/${post.id}`} className="flex items-start gap-4 group py-3 border-b border-white/10 border-dashed last:border-0">
        <div className="w-16 h-16 shrink-0 relative border border-white/10 p-1 bg-black overflow-hidden">
          <img src={thumbnailUrl} alt={post.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col">
          <h3 className="text-sm font-serif text-white leading-snug group-hover:underline decoration-1 underline-offset-2 mb-1 line-clamp-2">
            {post.title}
          </h3>
          <span className="text-[10px] text-gray-500 font-sans tracking-wider uppercase">{authorName}</span>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/blog/${post.id}`} className="flex flex-col group">
        <div className="w-full aspect-[16/9] mb-3 border border-white/10 p-1 bg-black overflow-hidden">
          <img src={thumbnailUrl} alt={post.title} className="w-full h-full object-cover" />
        </div>
        <div className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-sans">
          Technology
        </div>
        <h3 className="text-lg font-serif text-white leading-tight group-hover:underline decoration-1 underline-offset-2 mb-2 line-clamp-2">
          {post.title}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-5 h-5 rounded-full overflow-hidden border border-gray-600 bg-white/10 flex items-center justify-center">
            <img src={avatarUrl} alt={authorName} className="w-full h-full object-cover grayscale" />
          </div>
          <span className="text-[10px] text-gray-500 font-sans">{authorName}</span>
        </div>
      </Link>
    );
  }

  // Default: Grid Card
  return (
    <Link href={`/blog/${post.id}`} className="flex flex-col group h-full">
      <div className="w-full aspect-square relative border border-white/10 mb-4 p-1.5 bg-black overflow-hidden">
        <img src={thumbnailUrl} alt={post.title} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col flex-grow">
        <div className="text-[11px] font-sans font-bold text-white mb-2 tracking-wide uppercase line-clamp-1">
          {post.title}
        </div>
        <p className="text-gray-400 font-serif text-sm leading-relaxed line-clamp-3 mb-4">
          {excerpt}
        </p>
        <div className="flex items-center gap-2 mt-auto">
          <div className="w-5 h-5 rounded-full overflow-hidden border border-gray-600 bg-white/10 flex items-center justify-center">
            <img src={avatarUrl} alt={authorName} className="w-full h-full object-cover grayscale" />
          </div>
          <span className="text-[10px] text-gray-400 font-sans uppercase tracking-wider">{authorName}</span>
        </div>
      </div>
    </Link>
  );
}
