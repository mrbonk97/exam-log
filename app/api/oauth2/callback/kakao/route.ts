import { getConn } from "@/lib/db";
import { ELError, errorFactory } from "@/lib/el-error";
import { generateJwt } from "@/lib/jwt";
import { UserType } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import OracleDB from "oracledb";

const clientId = process.env.KAKAO_CLIENT_ID!;
const clientSecret = process.env.KAKAO_CLIENT_SECRET!;

const SQL1 = "SELECT * FROM EL_USER WHERE PROVIDER_ID = :id";
// prettier-ignore
const SQL2 = "INSERT INTO EL_USER (PROVIDER_ID, AUTH_PROVIDER, PROFILE_IMAGE, NAME) VALUES(:id, :auth_provider, :profile_image, :name)";
// prettier-ignore
const SQL3 = "UPDATE EL_USER SET PROFILE_IMAGE = :profile_image, NAME = :name WHERE PROVIDER_ID = :id";

export const GET = async (req: NextRequest) => {
  const code = req.nextUrl.searchParams.get("code");
  let conn = null;

  try {
    // 1단계. naver에서 access & refresh 토큰을 가져온다.
    if (!code) throw errorFactory("ERROR_00", "로그인에 필요한 코드가 없습니다.");
    const url = new URL("https://kauth.kakao.com/oauth/token");
    url.searchParams.append("grant_type", "authorization_code");
    url.searchParams.append("client_id", clientId);
    url.searchParams.append("client_secret", clientSecret);
    url.searchParams.append("redirect_uri", process.env.KAKAO_CALLBACK_URL!);
    url.searchParams.append("code", code);

    const res1 = await fetch(url.toString()).then((res) => res.json());

    // 2단계. naver에서 사용자 프로필을 가져온다.
    const res2 = await fetch("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${res1.access_token}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    }).then((res) => res.json());

    // 3단계. db를 확인해서 가입한 사용자가 아니라면 db애 등록한다.
    let userId = null;
    conn = await getConn();
    const res3 = await conn.execute<UserType>(SQL1, [res2.id.toString()], {
      outFormat: OracleDB.OUT_FORMAT_OBJECT,
    });

    // 등록된 계정이 없으면 회원가입
    if (!res3.rows || res3.rows.length != 1) {
      await conn.execute(
        SQL2,
        [res2.id.toString(), "KAKAO", res2.properties.profile_image, res2.properties.nickname],
        { autoCommit: true }
      );

      const res4 = await conn.execute<UserType>(SQL1, [res2.id.toString()], {
        outFormat: OracleDB.OUT_FORMAT_OBJECT,
      });

      if (!res4 || !res4.rows || res4.rows.length != 1)
        throw errorFactory("ERROR_03", `ID: ${res2.response.id}에 해당하는 사용자가 없습니다.`);

      userId = res4.rows[0].ID;
    }

    // 동록되어있다면 기존 계정의 정보 업데이트
    else if (res3.rows.length == 1) {
      userId = res3.rows[0].ID;
      await conn.execute(
        SQL3,
        [res2.properties.profile_image, res2.properties.nickname, res2.id.toString()],
        { autoCommit: true }
      );
    }

    const accessToken = generateJwt({ id: userId }, 1000 * 60 * 60); // 1시간
    const refreshToken = generateJwt({ id: userId }, 1000 * 60 * 60 * 24 * 30); // 30일

    const redirectUrl = new URL("/", process.env.API_URL!);
    const res4 = NextResponse.redirect(redirectUrl);

    res4.cookies.set("access_token", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    res4.cookies.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return res4;
  } catch (err) {
    console.log(err);
    if (err instanceof ELError)
      return NextResponse.json({ code: "error", message: err.message }, { status: 400 });
    return NextResponse.json({ code: "error", message: "서버 오류" }, { status: 500 });
  } finally {
    if (conn) await conn.close();
  }
};
