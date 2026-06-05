import { requireAuth } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth();

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 max-w-5xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8 border-dashed">
        <h1 className="text-3xl md:text-4xl font-serif text-white tracking-tight uppercase">Dashboard</h1>
      </div>
      {children}
    </div>
  );
}
