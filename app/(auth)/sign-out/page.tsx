import Link from "next/link";
import { Logo } from "@/components/logo";

const SignOutPage = () => {
  return (
    <main className="min-h-[450px] h-full flex2 flex-col gap-5">
      <Logo />
      <h1 className="text-2xl font-bold opacity-80">로그아웃 완료</h1>
      <Link href={"/"} className="mt-20 opacity-70 hover:underline underline-offset-2">
        첫 화면으로 돌아가기
      </Link>
    </main>
  );
};

export default SignOutPage;
