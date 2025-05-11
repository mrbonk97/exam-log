import { BeanIcon } from "lucide-react";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center text-blue-500">
      <BeanIcon />
      <h4 className="ml-1 text-lg font-bold">기출로그</h4>
    </Link>
  );
};
