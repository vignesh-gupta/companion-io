import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="fixed inset-y-0 flex-col hidden w-20 mt-16 md:flex">
        <Sidebar />
      </div>
      <main className="h-full pt-16 md:pl-20">
        {children}
      </main>
    </div>
    );
}
