import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black mt-auto">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link href="/" className="font-serif text-2xl tracking-widest text-white uppercase mb-2 hover:opacity-80 transition-opacity">
            aipress
          </Link>
          <p className="text-gray-500 font-sans text-[10px] tracking-widest uppercase">
            © {new Date().getFullYear()} AIPRESS. Built for the future.
          </p>
        </div>
        
        <div className="flex gap-8 text-[10px] font-sans tracking-widest uppercase text-gray-500">
          <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
          <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
          <Link href="#" className="hover:text-white transition-colors">RSS</Link>
        </div>
      </div>
    </footer>
  );
}
