import EditorialCard from "@/components/EditorialCard";
import SectionHeader from "@/components/SectionHeader";
import { dummyPosts } from "@/lib/data";

export const dynamic = "force-static";

export default function Home() {
  const heroLeftPosts = dummyPosts.slice(0, 2);
  const heroFeaturedPost = dummyPosts[2];
  const heroRightPosts = dummyPosts.slice(3, 7);
  
  const dispatchesPosts = dummyPosts.slice(7, 11);
  const superhumanPosts = dummyPosts.slice(11, 15);
  const softwarePosts = dummyPosts.slice(15, 19);
  const historyPosts = dummyPosts.slice(19, 23);
  const podcastPosts = dummyPosts.slice(23, 27);

  return (
    <div className="bg-black min-h-screen text-gray-100 pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl pt-8">
        
        {/* Top Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          {/* Left Column: Stacked Compact */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            {heroLeftPosts.map(post => (
              <EditorialCard key={post.id} post={post} variant="compact" />
            ))}
          </div>

          {/* Center Column: Featured */}
          <div className="lg:col-span-6 flex flex-col border-l border-r border-dashed-faint px-0 lg:px-8">
            <EditorialCard post={heroFeaturedPost} variant="featured" />
          </div>

          {/* Right Column: List */}
          <div className="lg:col-span-3 flex flex-col">
            <div className="text-[10px] sm:text-xs font-bold tracking-[0.15em] text-white uppercase font-sans mb-4">
              MOST RECENT
            </div>
            <div className="flex flex-col">
              {heroRightPosts.map(post => (
                <EditorialCard key={post.id} post={post} variant="list-small" />
              ))}
            </div>
          </div>
        </div>

        {/* Section 1: DISPATCHES */}
        <SectionHeader 
          title="Dispatches From the Frontier of AI" 
          subtitle="A newsletter on the people, ideas, and companies building the future." 
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dispatchesPosts.map(post => (
            <EditorialCard key={post.id} post={post} variant="grid" />
          ))}
        </div>

        {/* Banner */}
        <div className="w-full my-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-sm py-16 px-8 flex flex-col items-center justify-center text-center">
          <h2 className="text-black font-serif text-3xl sm:text-4xl lg:text-5xl mb-4 opacity-30 tracking-widest uppercase">
            AIPRESS
          </h2>
          <p className="text-slate-900 font-serif text-2xl sm:text-3xl max-w-2xl mx-auto leading-snug">
            Stories, software, podcasts, and courses to help you build the future
          </p>
        </div>

        {/* Section 2: SUPERHUMAN */}
        <SectionHeader 
          title="Superhuman" 
          subtitle="Everything you need to know about AI, productivity, and the future of work." 
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {superhumanPosts.map(post => (
            <EditorialCard key={post.id} post={post} variant="grid" />
          ))}
        </div>

        {/* Section 3: THE ARTS OF SOFTWARE */}
        <SectionHeader 
          title="The Arts of Software and Company" 
          subtitle="Strategy, culture, and craftsmanship for software teams." 
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {softwarePosts.map(post => (
            <EditorialCard key={post.id} post={post} variant="grid" />
          ))}
        </div>
        
        {/* Section 4: THE HISTORY OF NOW */}
        <SectionHeader 
          title="The History of Now" 
          subtitle="Contextualizing current events through the lens of history." 
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {historyPosts.map(post => (
            <EditorialCard key={post.id} post={post} variant="grid" />
          ))}
        </div>

      </div>
    </div>
  );
}
