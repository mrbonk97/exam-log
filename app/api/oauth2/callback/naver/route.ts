import { CustomError } from "@/app/api/custom-error";
import { getConn } from "@/app/api/db";
import { NextRequest, NextResponse } from "next/server";
import OracleDB from "oracledb";

const clientId = process.env.NAVER_CLIENT_ID!;
const clientSecret = process.env.NAVER_CLIENT_SECRET!;

const SQL1 = "SELECT * FROM EL_USER WHERE id = :id";
const SQL2 =
  "INSERT INTO EL_USER (ID, PROFILE_IMAGE, NAME, AUTH_PROVIDER) VALUES(:id, :profile_image, :name, :auth_provider)";

export const GET = async (req: NextRequest) => {
  const code = req.nextUrl.searchParams.get("code");
  let conn = null;

  try {
    // 1단계. naver에서 access & refresh 토큰을 가져온다.
    if (!code) throw new CustomError("로그인에 필요한 코드가 없습니다.");
    const url = new URL("https://nid.naver.com/oauth2.0/token");
    url.searchParams.append("grant_type", "authorization_code");
    url.searchParams.append("client_id", clientId);
    url.searchParams.append("client_secret", clientSecret);
    url.searchParams.append("redirect_uri", "https://www.google.com");
    url.searchParams.append("code", code!);

    const res1 = await fetch(url.toString(), {
      headers: {
        "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID!,
        "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET!,
      },
    }).then((res) => res.json());

    // 2단계. naver에서 사용자 프로필을 가져온다.
    const res2 = await fetch("https://openapi.naver.com/v1/nid/me", {
      headers: {
        Authorization: `Bearer ${res1.access_token}`,
      },
    }).then((res) => res.json());

    // 3단계. db를 확인해서 가입한 사용자가 아니라면 db애 등록한다.
    conn = await getConn();
    const res3 = await conn.execute(SQL1, [res2.response.id], {
      outFormat: OracleDB.OUT_FORMAT_OBJECT,
    });
    // 등록된 계정이 없으면 회원가입
    if (!res3.rows || res3.rows.length != 1) {
      await conn.execute(
        SQL2,
        [res2.response.id, res2.response.profile_image, res2.response.name, "NAVER"],
        {
          outFormat: OracleDB.OUT_FORMAT_OBJECT,
          autoCommit: true,
        }
      );
    }

    const redirectUrl = new URL("/", "http://localhost:3000");
    const res4 = NextResponse.redirect(redirectUrl);

    res4.cookies.set("access_token", res1.access_token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: res1.expires_in,
    });

    res4.cookies.set("refresh_token", res1.refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return res4;
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) await conn.close();
  }
};
