import { CustomError } from "@/app/api/custom-error";
import { NextRequest, NextResponse } from "next/server";
import { URL } from "url";

export const GET = async (req: NextRequest) => {
  try {
    if (req.cookies.get("refresh_token") == undefined)
      throw new CustomError("refresh_token이 없습니다.");

    const url = new URL(`${process.env.NAVER_API_URL}/token`);
    url.searchParams.append("grant_type", "refresh_token");
    url.searchParams.append("client_id", process.env.NAVER_CLIENT_ID!);
    url.searchParams.append("client_secret", process.env.NAVER_CLIENT_SECRET!);
    url.searchParams.append("refresh_token", req.cookies.get("refresh_token")!.value);

    const res1 = await fetch(url.toString()).then((r) => r.json());

    const res2 = NextResponse.json({ code: "success" });
    res2.cookies.set("access_token", res1.access_token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: res1.expires_in,
    });

    return res2;
  } catch (err) {
    if (err instanceof CustomError)
      return NextResponse.json({ code: "error", message: err.message }, { status: 400 });

    return NextResponse.json(
      { code: "error", message: "서버에서 오류가 발생했습니다." },
      { status: 500 }
    );
  }
};
