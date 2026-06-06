import prisma from "@/lib/prisma";
import EditorialCard from "@/components/EditorialCard";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q || "";

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { content: { contains: query, mode: "insensitive" } },
      ],
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-black min-h-screen text-gray-100 py-16">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="mb-12 border-b border-white/10 pb-8">
          <h1 className="text-4xl lg:text-6xl font-serif text-white uppercase mb-4">
            Search Results
          </h1>
          <p className="text-gray-400 font-sans tracking-widest uppercase text-sm">
            {posts.length} {posts.length === 1 ? "result" : "results"} for &quot;{query}&quot;
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-gray-400 font-sans tracking-widest uppercase py-20 text-center">
            No articles match your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {posts.map((post: any) => (
              <EditorialCard key={post.id} post={post} variant="grid" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
