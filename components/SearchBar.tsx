"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2 group relative">
      <button type="submit" className="text-gray-400 hover:text-white transition-colors z-10 relative">
        <Search className="w-5 h-5" />
      </button>
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search articles..." 
        className="bg-transparent border-b border-white/20 text-white text-sm outline-none placeholder:text-gray-600 px-2 py-1 absolute left-6 w-48 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto focus:opacity-100 focus:pointer-events-auto transition-all duration-300"
      />
    </form>
  );
}
