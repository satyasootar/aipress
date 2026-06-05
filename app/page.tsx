import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = "force-static";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center space-y-8">
      <h1 className="text-5xl font-extrabold tracking-tight">
        Welcome to BlogPlatform
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl">
        A modern full-stack blog built with Next.js 16, Prisma, NeonDB, and shadcn/ui.
        Read thoughts, share yours, and manage your posts easily.
      </p>
      <div className="flex gap-4">
        <Link href="/blog">
          <Button size="lg">Read the Blog</Button>
        </Link>
        <Link href="/dashboard">
          <Button size="lg" variant="outline">Go to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
