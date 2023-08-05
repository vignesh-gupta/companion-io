import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen">
      <Navbar />
      <main className="h-full pt-16 md:pl-20">
        {children}
      </main>
    </div>
    );
}
