import Link from "next/link";

export const MenuList = () => {
  return (
    <ul className="flex items-center gap-5 text-sm sm:text-base underline-offset-2 [&_li]:hover:underline">
      <li>
        <Link href={"/certs"}>자격증</Link>
      </li>
      <li>
        <Link href={"/calendar"}>시험일정</Link>
      </li>
      <li>
        <Link href={"/my-study"}>나의 공부</Link>
      </li>
    </ul>
  );
};
