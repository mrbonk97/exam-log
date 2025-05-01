import "./globals.css";
import type { Metadata } from "next";
import { SuitFont } from "@/lib/font/font";
import { Topnav } from "@/components/nav/top-nav";
import { ThemeProvider } from "@/components/dark-theme/theme-provider";

export const metadata: Metadata = {
  title: "기출로그",
  description: "자격증 대비! 세상의 모든 기출문제",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${SuitFont.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Topnav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
