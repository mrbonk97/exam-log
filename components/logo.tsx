import { BeanIcon } from "lucide-react";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center text-blue-500">
      <BeanIcon size={20} />
      <span className="ml-2 mb-0.5 hidden sm:inline-block font-bold">기출로그</span>
    </Link>
  );
};
