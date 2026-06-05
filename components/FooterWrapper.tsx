"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterWrapper() {
  const pathname = usePathname();
  
  // Show only on Home ("/") and Blog Reader ("/blog/...")
  if (pathname === "/" || pathname?.startsWith("/blog/")) {
    return <Footer />;
  }
  
  return null;
}
