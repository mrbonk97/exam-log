"use client";
import { BirdIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  error: Error & { digest?: string };
}

const Error = ({ error }: Props) => {
  return (
    <main className="pt-14 h-full flex flex-col items-center justify-center gap-10">
      <hgroup className="mt-20">
        <h1 className="text-4xl font-bold text-center">오류가 발생했습니다.</h1>
        <h2 className="mt-2 text-lg font-medium text-center text-muted-foreground">
          {error.message}
        </h2>
      </hgroup>
      <BirdIcon size={72} className="text-blue-400" />
      <Link href={"/"} className="font-medium opacity-80 underline-offset-2 hover:underline">
        홈으로 이동
      </Link>
    </main>
  );
};

export default Error;
