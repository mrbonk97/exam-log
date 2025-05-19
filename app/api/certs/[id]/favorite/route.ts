import { getConn } from "@/lib/db";
import { ELError, errorFactory } from "@/lib/el-error";
import { verifyJwt } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: {
    id: Promise<string>;
  };
}

const SQL1 = "INSERT INTO EL_FAVORITE_CERT(USER_ID, CERT_ID) VALUES(:user_id, :cert_id)";

export const POST = async (req: NextRequest, { params }: Props) => {
  const certId = (await params).id;
  let conn = null;

  try {
    const accessToken = req.cookies.get("access_token");
    if (!accessToken) throw errorFactory("ERROR_01");
    const userId = verifyJwt(accessToken.value);

    conn = await getConn();
    await conn.execute(SQL1, [userId, certId], { autoCommit: true });

    return NextResponse.json({
      code: "success",
      message: `즐겨찾기에 추가했습니다.${userId} ${certId}`,
    });
  } catch (err) {
    console.log(err);
    if (err instanceof ELError && err.code == "ERROR_01")
      return NextResponse.json({ code: "error", message: err.message }, { status: 401 });

    if (err instanceof ELError && err.code == "ERROR_02")
      return NextResponse.json({ code: "error", message: err.message }, { status: 403 });

    if (err instanceof ELError && err.code == "ERROR_03")
      return NextResponse.json({ code: "error", message: err.message }, { status: 404 });

    return NextResponse.json(
      { code: "error", message: "서버에서 오류가 발생했습니다." },
      { status: 500 }
    );
  } finally {
    if (conn) await conn.close();
  }
};

const SQL2 = "DELETE FROM EL_FAVORITE_CERT WHERE USER_ID = :user_id AND CERT_ID = :cert_id";

export const DELETE = async (req: NextRequest, { params }: Props) => {
  const certId = (await params).id;
  let conn = null;

  try {
    const accessToken = req.cookies.get("access_token");
    if (!accessToken) throw errorFactory("ERROR_01");
    const userId = verifyJwt(accessToken.value);

    conn = await getConn();
    await conn.execute(SQL2, [userId, certId], { autoCommit: true });

    return NextResponse.json({
      code: "success",
      message: `즐겨찾기에서 삭제했습니다.${userId} ${certId}`,
    });
  } catch (err) {
    console.log(err);

    if (err instanceof ELError && err.code == "ERROR_01")
      return NextResponse.json({ code: "error", message: err.message }, { status: 401 });

    if (err instanceof ELError && err.code == "ERROR_02")
      return NextResponse.json({ code: "error", message: err.message }, { status: 403 });

    if (err instanceof ELError && err.code == "ERROR_03")
      return NextResponse.json({ code: "error", message: err.message }, { status: 404 });

    return NextResponse.json(
      { code: "error", message: "서버에서 오류가 발생했습니다." },
      { status: 500 }
    );
  } finally {
    if (conn) await conn.close();
  }
};
