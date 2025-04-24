import { Shrub } from "lucide-react";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center text-green-500">
      <Shrub />
      <h4 className="ml-1 text-lg font-bold">기출나무</h4>
    </Link>
  );
};
