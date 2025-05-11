import "./globals.css";
import type { Metadata } from "next";
import { Topnav } from "@/components/nav/top-nav";
import { ThemeProvider } from "@/components/dark-theme/theme-provider";
import { Noto_Sans_KR } from "next/font/google";
import Script from "next/script";

export const metadata: Metadata = {
  title: "기출로그",
  description: "자격증 대비! 세상의 모든 기출문제",
};

const notosans = Noto_Sans_KR({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <Script src="https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js" />
      <body className={`${notosans.className} antialiased`}>
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
