import { NextRequest, NextResponse } from "next/server";
import { getConn } from "@/app/api/db";
import OracleDB from "oracledb";
import { CustomError } from "@/app/api/custom-error";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const SQL1 = "SELECT * FROM EL_CERT WHERE ID = :id";
const SQL2 = "SELECT * FROM EL_EXAM WHERE CERT_ID = :id ORDER BY RESULT_DATE";

export const GET = async (req: NextRequest, { params }: Props) => {
  const id = (await params).id;
  let conn = null;
  try {
    conn = await getConn();

    const certInfo = await conn.execute(SQL1, [id], { outFormat: OracleDB.OUT_FORMAT_OBJECT });
    const examInfo = await conn.execute(SQL2, [id], { outFormat: OracleDB.OUT_FORMAT_OBJECT });

    if (!certInfo || !certInfo.rows || certInfo.rows.length == 0)
      throw new CustomError(`id: ${id}에 해당하는 자격증이 없습니다.`);

    return NextResponse.json({
      code: "success",
      data: {
        CERT_INFO: certInfo.rows[0],
        EXAM_LIST: examInfo.rows,
      },
    });
  } catch (err) {
    if (err instanceof CustomError)
      return NextResponse.json({ code: "error", message: err.message }, { status: 400 });

    return NextResponse.json(
      { code: "error", message: "서버 내부 오류가 발생했습니다." },
      { status: 500 }
    );
  } finally {
    if (conn) conn.close();
  }
};
