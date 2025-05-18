import Link from "next/link";
import { Logo } from "@/components/logo";
import { DogIcon } from "lucide-react";

const SignOutPage = () => {
  return (
    <main className="p-5 min-h-[450px] h-full flex flex-col items-center justify-center gap-5 bg-muted">
      <Logo />
      <section className="mb-20 p-5 min-w-xs sm:min-w-sm border rounded-xl bg-background">
        <header className="pb-5 border-b">
          <h1 className="text-center text-xl font-semibold">로그아웃 완료</h1>
        </header>

        <Link href={"/"} className="block py-10 text-muted-foreground group">
          <DogIcon className="mx-auto" size={48} />
          <p className="mt-5 text-center group-hover:underline underline-offset-2">
            첫 화면으로 이동
          </p>
        </Link>
      </section>
    </main>
  );
};

export default SignOutPage;
