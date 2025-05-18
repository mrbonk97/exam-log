import Link from "next/link";

export const KakaoButton = () => {
  const url = new URL("https://nid.naver.com/oauth2.0/authorize");
  url.searchParams.append("response_type", "code");
  url.searchParams.append("client_id", process.env.NAVER_CLIENT_ID!);
  url.searchParams.append("redirect_uri", process.env.NAVER_CALLBACK_URL!);

  return (
    <Link
      className="p-3 w-full rounded-md flex2 gap-2 text-black bg-[#fee500] cursor-pointer hover:opacity-80 duration-150"
      href={url.toString()}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" height={22} width={22}>
        <path d="m540 34c-298.2 0-540 187.7-540 419.2 0 143.9 93.5 270.9 235.9 346.4l-59.9 219.9c-5.3 19.4 16.8 34.9 33.8 23.6l262.6-174.1c22.2 2.1 44.7 3.4 67.6 3.4 298.2 0 540-187.7 540-419.2 0-231.5-241.8-419.2-540-419.2" />
      </svg>
      <span className="font-bold">카카오로 로그인</span>
    </Link>
  );
};
