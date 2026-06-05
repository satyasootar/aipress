import React from "react";
import { ChevronRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="w-full flex flex-col mt-16 mb-8 border-t border-dashed-faint pt-3 relative group cursor-pointer">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-[11px] sm:text-xs font-bold tracking-[0.15em] text-white uppercase font-sans group-hover:text-gray-300 transition-colors">
          {title}
        </h2>
        <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
      </div>
      {subtitle && (
        <p className="text-gray-400 text-[13px] mt-1 font-serif italic">
          {subtitle}
        </p>
      )}
    </div>
  );
}
