import { EXAM_LIST } from "@/constants/constants";
import { NextRequest, NextResponse } from "next/server";
import { getDbPool } from "@/app/api/db";
import OracleDB from "oracledb";
import { CustomError } from "@/app/api/custom-error";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const SQL1 = "SELECT * FROM EL_EXAM WHERE CERT_ID = :id ORDER BY RESULT_DATE";

export const GET = async (req: NextRequest, { params }: Props) => {
  try {
    const id = (await params).id;
    const exam = EXAM_LIST.find((item) => item.id == id);
    if (!exam) throw new CustomError(`${id}에 해당하는 시험이 없습니다.`);

    const db = await getDbPool();
    const conn = await db.getConnection();
    const res = await conn.execute(SQL1, [id], { outFormat: OracleDB.OUT_FORMAT_OBJECT });
    await conn.close();

    return NextResponse.json({
      code: "success",
      data: {
        examInfo: exam,
        examList: res.rows,
      },
    });
  } catch (err) {
    if (err instanceof CustomError)
      return NextResponse.json({ code: "error", message: err.message }, { status: 400 });

    return NextResponse.json(
      { code: "error", message: "서버 내부 오류가 발생했습니다." },
      { status: 500 }
    );
  }
};
