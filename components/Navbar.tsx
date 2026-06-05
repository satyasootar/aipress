import Link from "next/link";
import { getSession } from "@/lib/auth";
import { logout } from "@/actions/auth";
import { Search } from "lucide-react";

export default async function Navbar() {
  const session = await getSession();

  return (
    <header className="w-full bg-black border-b border-solid-faint sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Left: Search */}
        <div className="flex-1 flex items-center">
          <button className="text-gray-400 hover:text-white transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Center: Logo */}
        <div className="flex-1 flex justify-center">
          <Link href="/" className="font-serif text-3xl tracking-widest text-white uppercase">
            aipress
          </Link>
        </div>

        {/* Right: Auth & Subscribe */}
        <div className="flex-1 flex items-center justify-end gap-6 text-sm font-sans">
          {session ? (
            <>
              <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                Dashboard
              </Link>
              <form action={logout}>
                <button type="submit" className="text-gray-300 hover:text-white transition-colors">
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
                Sign in
              </Link>
              <Link href="/signup" className="bg-white text-black px-4 py-1.5 rounded-sm font-semibold hover:bg-gray-200 transition-colors tracking-wide">
                Subscribe
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
