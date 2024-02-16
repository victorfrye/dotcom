import type { Metadata } from "next";
import "@dotcom/styles/globals.css";
import ThemeProvider from "@dotcom/components/providers/theme";
import Frame from "@dotcom/components/shared/frame";
import Header from "@dotcom/components/shared/header";
import Footer from "@dotcom/components/shared/footer";

export const metadata: Metadata = {
  metadataBase: new URL('https://victorfrye.com'),
  title: "Victor Frye | Your friendly neighborhood technologist",
  description: "Hello from Grand Rapids! I'm Victor Frye, your friendly neighborhood developer, and this is my personal landing page.",
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
    description: "The personal landing page and portfolio of your friendly neighborhood developer, Victor Frye.",
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
      <body>
        <ThemeProvider>
          <Frame>
            <Header />

            <main>
              {children}
            </main>

            <Footer />
          </Frame>
        </ThemeProvider>
      </body>
    </html>
  );
}
