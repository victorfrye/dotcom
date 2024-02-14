import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@dotcom/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://victorfrye.com'),
  title: "Victor Frye",
  description: "Hello from Grand Rapids! I'm Victor Frye, your friendly neighborhood technologist.",
  keywords: ["victor frye", "grand rapids", "technologist", "software engineer", "web developer", "full stack", "next.js", "react", "typescript", "javascript", "css", "html", ".net", "c#", "azure", "devops", "github"],
  icons: ["images/profile.png"],
  authors: {
    name: "Victor Frye",
    url: "https://victorfrye.com/",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
     type: "website",
     url: "/",
     title: "Victor Frye",
     description: "Your friendly neighborhood technologist",
     siteName: "VictorFrye.COM",
     }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
