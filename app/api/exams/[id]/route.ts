import { NextRequest, NextResponse } from "next/server";
import { getConn } from "@/app/api/db";
import OracleDB from "oracledb";
import { CustomError } from "@/app/api/custom-error";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const SQL = "SELECT * FROM EL_QUESTION WHERE EXAM_ID = :id";

export const GET = async (req: NextRequest, { params }: Props) => {
  const id = (await params).id;
  let conn = null;

  try {
    conn = await getConn();
    const res = await conn.execute(SQL, [id], { outFormat: OracleDB.OUT_FORMAT_OBJECT });

    if (!res.rows || res.rows.length == 0)
      throw new CustomError(`${id}에 해당하는 시험이 존재하지 않습니다.`);

    return NextResponse.json({
      code: "success",
      data: res.rows,
    });
  } catch (err) {
    if (err instanceof CustomError)
      return NextResponse.json(
        {
          code: "error",
          message: err.message,
        },
        { status: 404 }
      );

    return NextResponse.json(
      { code: "error", message: "서버 내부 오류가 발생했습니다." },
      { status: 500 }
    );
  } finally {
    if (conn) await conn.close();
  }
};
