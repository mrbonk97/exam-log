import { Logo } from "@/components/logo";
import { KakaoButton } from "@/components/kakao-button";
import { NaverButton } from "@/components/naver-button";

const SignInPage = () => {
  return (
    <main className="p-5 min-h-[450px] h-full flex flex-col items-center justify-center gap-5 bg-muted">
      <Logo />
      <section className="mb-20 p-5 min-w-xs sm:min-w-sm border rounded-xl bg-background">
        <header className="pb-5 border-b">
          <h1 className="text-center text-xl font-semibold">로그인</h1>
          <p className="text-center text-sm text-muted-foreground">소셜 계정으로 로그인하세요</p>
        </header>
        <ul className="mt-5 space-y-5">
          <li>
            <KakaoButton />
          </li>
          <li>
            <NaverButton />
          </li>
        </ul>
      </section>
    </main>
  );
};

export default SignInPage;
