import Link from "next/link";

export const NaverButton = () => {
  const url = new URL("https://nid.naver.com/oauth2.0/authorize");
  url.searchParams.append("response_type", "code");
  url.searchParams.append("client_id", process.env.NAVER_CLIENT_ID!);
  url.searchParams.append("redirect_uri", process.env.NAVER_CALLBACK_URL!);

  return (
    <Link
      className="p-3 w-full rounded-md flex2 gap-2 text-white bg-[#03c75a] cursor-pointer hover:opacity-80 duration-150"
      href={url.toString()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1080 1080"
        height={28}
        width={28}
        fill="white"
      >
        <path d="m732.3 578.2l-400.4-573.2h-331.9v1070.9h347.7v-573.2l400.4 573.2h331.9v-1070.9h-347.7z" />
      </svg>
      <span className="font-bold">네이버로 로그인</span>
    </Link>
  );
  return (
    <button className="p-3 w-full rounded-md flex2 gap-2 text-white bg-[#03c75a] cursor-pointer hover:opacity-80 duration-150">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1080 1080"
        height={28}
        width={28}
        fill="white"
      >
        <path d="m732.3 578.2l-400.4-573.2h-331.9v1070.9h347.7v-573.2l400.4 573.2h331.9v-1070.9h-347.7z" />
      </svg>
      <span className="font-bold">네이버로 로그인</span>
    </button>
  );
};
