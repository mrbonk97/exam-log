import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const accessToken = req.cookies.get("access_token")?.value;

  if (accessToken) {
    const url = new URL("https://nid.naver.com/oauth2.0/token");
    url.searchParams.set("grant_type", "delete");
    url.searchParams.set("client_id", process.env.NAVER_CLIENT_ID!);
    url.searchParams.set("client_secret", process.env.NAVER_CLIENT_SECRET!);
    url.searchParams.set("access_token", accessToken);
    url.searchParams.set("service_provider", "NAVER");
    await fetch(url);
  }

  const res = NextResponse.json({ code: "success" });

  res.cookies.set("access_token", "deleted", {
    maxAge: 0,
    httpOnly: true,
    sameSite: "lax",
  });

  res.cookies.set("refresh_token", "deleted", {
    maxAge: 0,
    httpOnly: true,
    sameSite: "lax",
  });

  return res;
};
