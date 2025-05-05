import OracleDB from "oracledb";
import { NextRequest, NextResponse } from "next/server";
import { getConn } from "@/app/api/db";

const SQL = "SELECT * FROM EL_CERT WHERE TITLE LIKE '%' || :q || '%'";

export const GET = async ({ nextUrl }: NextRequest) => {
  const q = nextUrl.searchParams.get("q") || "";
  let conn = null;

  try {
    conn = await getConn();
    const res = await conn.execute(SQL, { q }, { outFormat: OracleDB.OUT_FORMAT_OBJECT });

    return NextResponse.json({
      code: "success",
      data: {
        certs: res.rows,
      },
    });
  } catch {
    return NextResponse.json(
      { code: "error", message: "서버 내부 오류가 발생했습니다." },
      { status: 500 }
    );
  } finally {
    if (conn) conn.close();
  }
};
