import type { Metadata } from "next";
// import "@dotcom/styles/globals.css";
import ThemeProvider from "@dotcom/components/providers/theme";
import Profile from "@dotcom/components/shared/profile";
import DarkModeProvider from "@dotcom/components/providers/darkMode";
// import useDarkMode from "@dotcom/components/providers/darkMode";

export const metadata: Metadata = {
  metadataBase: new URL('https://victorfrye.com'),
  title: "Victor Frye | Your friendly neighborhood developer",
  description: "Hello from Grand Rapids! I'm Victor Frye, your friendly neighborhood developer, and this is my personal landing page.",
  keywords: ["victor frye", "grand rapids", "developer", "software engineer", "web", "cloud", "ai", "full stack", "next", "react", "typescript", "javascript", "css", "html", ".net", "c#", "azure", "devops", "github"],
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
        <DarkModeProvider>
          <ThemeProvider>
            <Profile>
              {children}
            </Profile>
          </ThemeProvider>
        </DarkModeProvider>
      </body>
    </html>
  );
}
