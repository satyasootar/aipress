import Link from "next/link";
import { DummyPost } from "@/lib/data";

interface EditorialCardProps {
  post: DummyPost;
  variant?: "featured" | "grid" | "compact" | "list-small";
}

export default function EditorialCard({ post, variant = "grid" }: EditorialCardProps) {
  
  if (variant === "featured") {
    return (
      <Link href="#" className="flex flex-col group block">
        {/* Massive Image Block */}
        <div className="w-full aspect-[4/3] relative overflow-hidden border border-[#333] mb-6 p-2 bg-black">
           <div className="w-full h-full relative" style={{ backgroundColor: post.colorHex }}>
             {/* Abstract Vintage Graphic Placeholder */}
             <div className="absolute inset-0 vintage-image-filter opacity-50 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 border-4 border-black rounded-full mix-blend-overlay"></div>
             </div>
             {/* Inner Border Frame */}
             <div className="absolute inset-2 border-2 border-black pointer-events-none"></div>
           </div>
        </div>
        
        <div className="flex flex-col text-center items-center px-4">
          <div className="text-xs uppercase tracking-widest text-gray-400 mb-3 font-sans">
            {post.category}
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white mb-4 group-hover:underline decoration-1 underline-offset-4">
            {post.title}
          </h2>
          <p className="text-gray-400 font-serif text-lg leading-relaxed max-w-xl mb-4 line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-600">
              <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover grayscale" />
            </div>
            <span className="text-xs text-gray-400 font-sans tracking-wide">{post.author.name}</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "list-small") {
    return (
      <Link href="#" className="flex items-start gap-4 group py-3 border-b border-solid-faint last:border-0">
        <div className="w-16 h-16 shrink-0 relative border border-[#333] p-1 bg-black">
          <div className="w-full h-full" style={{ backgroundColor: post.colorHex }}></div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-sm font-serif text-white leading-snug group-hover:underline decoration-1 underline-offset-2 mb-1 line-clamp-2">
            {post.title}
          </h3>
          <span className="text-[10px] text-gray-500 font-sans tracking-wider uppercase">{post.author.name}</span>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href="#" className="flex flex-col group">
        <div className="w-full aspect-[16/9] mb-3 border border-[#333] p-1 bg-black">
          <div className="w-full h-full" style={{ backgroundColor: post.colorHex }}></div>
        </div>
        <div className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-sans">
          {post.category}
        </div>
        <h3 className="text-lg font-serif text-white leading-tight group-hover:underline decoration-1 underline-offset-2 mb-2 line-clamp-2">
          {post.title}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-5 h-5 rounded-full overflow-hidden border border-gray-600">
            <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover grayscale" />
          </div>
          <span className="text-[10px] text-gray-500 font-sans">{post.author.name}</span>
        </div>
      </Link>
    );
  }

  // Default: Grid Card
  return (
    <Link href="#" className="flex flex-col group h-full">
      <div className="w-full aspect-square relative border border-[#333] mb-4 p-1.5 bg-black">
        <div className="w-full h-full relative" style={{ backgroundColor: post.colorHex }}>
          <div className="absolute inset-0 vintage-image-filter opacity-40 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>
          {/* Inner graphical element */}
          <div className="absolute inset-4 border border-black flex items-center justify-center overflow-hidden">
             <div className="w-full h-px bg-black absolute top-1/2 -translate-y-1/2 transform rotate-45"></div>
             <div className="w-px h-full bg-black absolute left-1/2 -translate-x-1/2 transform rotate-45"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-grow">
        <div className="text-[11px] font-sans font-bold text-white mb-2 tracking-wide uppercase line-clamp-1">
          {post.title}
        </div>
        <p className="text-gray-400 font-serif text-sm leading-relaxed line-clamp-3 mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-2 mt-auto">
          <div className="w-5 h-5 rounded-full overflow-hidden border border-gray-600">
            <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover grayscale" />
          </div>
          <span className="text-[10px] text-gray-400 font-sans uppercase tracking-wider">{post.author.name}</span>
        </div>
      </div>
    </Link>
  );
}
