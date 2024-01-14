import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import { Toaster } from "@ui/toaster";
import ProModal from "@/components/ProModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Companion IO",
  description: "Expand your imagination and create an existing person or a imaginary person with Companion IO",
  keywords: ["Companion", "AI", "Person", "Imaginary", "Create", "Personal" , "Personality", "Vignesh" , "dud3-droid" , "dud3" , "gupta" ],
  authors: {
    name: "Vignesh Gupta",
    url: "http://vigneshgupta.tech/",
  },
  openGraph: {
    type: "website",
    title: "Companion IO",
    description:
      "Expand your imagination and create an existing person or a imaginary person with Companion IO",
    // url: ,
    images: "/logo.png",
  },
  creator: 'Vignesh Gupta',
  metadataBase: new URL("https://companionio.vigneshgupta.tech/")
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(inter.className , "bg-secondary")}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ProModal />
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
