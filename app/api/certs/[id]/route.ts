import { EXAM_LIST } from "@/constants/constants";
import { NextRequest, NextResponse } from "next/server";
import { getDbPool } from "@/app/api/db";
import OracleDB from "oracledb";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const SQL1 = "SELECT * FROM EL_EXAM WHERE CERT_ID = :id";
const SQL2 = "SELECT * FROM EL_EXAM_SCHEDULE WHERE CERT_ID = :id";

export const GET = async (req: NextRequest, { params }: Props) => {
  const id = (await params).id;
  const exam = EXAM_LIST.find((item) => item.id == id);

  const db = await getDbPool();
  const conn = await db.getConnection();
  const res1 = await conn.execute(SQL1, [id], { outFormat: OracleDB.OUT_FORMAT_OBJECT });
  const res2 = await conn.execute(SQL2, [id], { outFormat: OracleDB.OUT_FORMAT_OBJECT });
  await conn.close();

  if (!exam)
    return NextResponse.json(
      { code: "fail", message: "해당 시험이 존재하지 않습니다." },
      { status: 400 }
    );

  return NextResponse.json({
    code: "success",
    data: {
      examInfo: exam,
      examList: res1.rows,
      examSchedule: res2.rows,
    },
  });
};
