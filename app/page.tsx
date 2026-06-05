import LandingPostCard from "@/components/LandingPostCard";
import TrendingSidebar from "@/components/TrendingSidebar";
import { dummyPosts } from "@/lib/data";

export const dynamic = "force-static";

export default function Home() {
  const trendingPosts = [...dummyPosts].sort((a, b) => b.upvotes - a.upvotes).slice(0, 5);
  const featuredPost = dummyPosts[0];
  const mainPosts = dummyPosts.slice(1, 9); // Display 8 posts in a 2x4 grid

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 md:py-16">
      <div className="mb-12 md:mb-16">
        <h2 className="text-purple-600 font-bold mb-4 tracking-wide text-sm md:text-base">The Prismic Blog</h2>
        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold text-slate-900 tracking-tight leading-[1.05]">
          Nail your workflow.
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        {/* Main Grid Column */}
        <div className="w-full lg:w-2/3 flex flex-col gap-8">
          {/* Featured Post */}
          <LandingPostCard post={featuredPost} featured={true} />
          
          {/* Grid of other posts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {mainPosts.map(post => (
              <LandingPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="w-full lg:w-1/3 relative">
          <TrendingSidebar posts={trendingPosts} />
        </div>
      </div>
    </div>
  );
}
