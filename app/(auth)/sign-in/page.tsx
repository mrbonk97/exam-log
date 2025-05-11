import Script from "next/script";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { NaverButton } from "@/components/naver-button";

const SignInPage = () => {
  return (
    <main className="p-5 md:p-10 h-full flex flex-col items-center justify-center gap-6 bg-muted">
      <Script src="https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js" />
      <Logo />
      <Card className="min-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">로그인</CardTitle>
          <CardDescription>소셜 계정으로 로그인하세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <button className="p-3 w-full rounded-md flex2 gap-2 bg-[#fee500] cursor-pointer hover:opacity-80 duration-150">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" height={28} width={28}>
              <path d="m540 34c-298.2 0-540 187.7-540 419.2 0 143.9 93.5 270.9 235.9 346.4l-59.9 219.9c-5.3 19.4 16.8 34.9 33.8 23.6l262.6-174.1c22.2 2.1 44.7 3.4 67.6 3.4 298.2 0 540-187.7 540-419.2 0-231.5-241.8-419.2-540-419.2" />
            </svg>
            <span className="font-bold">카카오로 로그인</span>
          </button>
          <NaverButton />
        </CardContent>
      </Card>
    </main>
  );
};

export default SignInPage;
