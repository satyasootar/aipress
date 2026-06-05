import Navbar from "@/components/Navbar";
import FooterWrapper from "@/components/FooterWrapper";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <FooterWrapper />
    </div>
  );
}
