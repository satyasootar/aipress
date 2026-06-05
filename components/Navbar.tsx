import Link from "next/link";
import { getSession } from "@/lib/auth";
import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default async function Navbar() {
  const session = await getSession();

  return (
    <div className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top Navbar */}
      <nav className="border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex gap-2 items-center">
            {/* Logo placeholder */}
            <div className="w-6 h-6 bg-purple-600 rounded-sm isometric-cube scale-75 hidden sm:block"></div>
            <Link href="/" className="font-bold text-xl tracking-tight flex items-center">
              <span className="font-extrabold mr-1">blogpage</span> <span className="text-gray-400 font-light mx-1">/</span> Blog
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
            <Link href="#" className="hover:text-slate-900 transition-colors">Product</Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">Solutions</Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">Showcase</Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">Resources</Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">Enterprise</Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">Pricing</Link>
          </div>

          <div className="flex gap-4 items-center">
            {session ? (
              <>
                <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <form action={logout}>
                  <Button variant="ghost" size="sm" className="font-medium">
                    Logout
                  </Button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium hover:text-slate-900 hidden sm:block">
                  Login
                </Link>
                <Link href="#" className="text-sm font-medium hover:text-slate-900 hidden sm:block">
                  Request a demo
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-slate-900 text-white hover:bg-slate-800 rounded-lg px-4 font-semibold">
                    Get started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Secondary Navbar / Categories */}
      <nav className="bg-white">
        <div className="container mx-auto px-4 lg:px-8 h-14 flex items-center justify-between overflow-x-auto hide-scrollbar">
          <div className="flex gap-6 items-center text-sm font-semibold text-slate-700 whitespace-nowrap">
            <Link href="#" className="text-slate-900">Latest Articles</Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">Performance & UX</Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">Tech stack</Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">Developer Workflow</Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">Announcements</Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">Business of Web Development</Link>
          </div>
          <div className="hidden sm:flex ml-4">
            <button className="p-2 bg-slate-100 text-slate-600 rounded-md hover:bg-slate-200 transition-colors">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
