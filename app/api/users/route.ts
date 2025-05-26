import { getConn } from "@/lib/db";
import { errorFactory } from "@/lib/el-error";
import { verifyJwt } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";

const SQL = "DELETE FROM EL_USER WHERE ID = :id";

export const DELETE = async (req: NextRequest) => {
  let conn = null;

  try {
    const accessToken = req.cookies.get("access_token");
    if (!accessToken) throw errorFactory("ERROR_01");
    const userId = verifyJwt(accessToken.value);

    conn = await getConn();
    const res = await conn.execute(SQL, [userId], { autoCommit: true });

    if (res.rowsAffected != 1) throw errorFactory("ERROR_00");

    const response = NextResponse.json({
      code: "success",
      message: `회원을 삭제했습니다.ID: ${userId}`,
    });

    response.cookies.set("access_token", "deleted", {
      maxAge: 0,
      httpOnly: true,
      sameSite: "lax",
    });

    response.cookies.set("refresh_token", "deleted", {
      maxAge: 0,
      httpOnly: true,
      sameSite: "lax",
    });

    return res;
  } catch (err) {
    console.log(err);
    return NextResponse.json({ code: "error", message: "서버에서 오류가 발생했습니다." });
  } finally {
    if (conn) await conn.close();
  }
};
