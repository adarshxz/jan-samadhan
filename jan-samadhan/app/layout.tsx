import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "JAN-SAMADHAN — Community Innovation & Collaboration Platform",
  description: "A digital platform to crowdsource societal challenges and facilitate collaborative problem solving through universities and industry partnerships. SIH 2026.",
  keywords: "Jan Samadhan, SIH 2026, Smart India Hackathon, citizen challenges, government innovation, Jharkhand",
  openGraph: {
    title: "JAN-SAMADHAN",
    description: "Community Innovation & Collaboration Platform",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-background antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

