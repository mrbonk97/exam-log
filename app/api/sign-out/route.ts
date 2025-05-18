import { verifyJwt } from "@/lib/jwt";
import { errorFactory } from "@/lib/el-error";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const accessToken = req.cookies.get("access_token");

  try {
    if (!accessToken || !accessToken.value) throw errorFactory("ERROR_07");
    const userId = verifyJwt(accessToken.value);
    console.log(`사용자 로그아웃함 ID: ${userId}`);
  } catch {
    console.log(`사용자 로그아웃함 ID: 알수없음`);
  }

  const res = NextResponse.redirect(`${process.env.API_URL}/sign-out`);

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
