import { NextRequest, NextResponse } from "next/server";
import { getConn } from "@/app/api/db";
import OracleDB from "oracledb";
import { CustomError } from "@/app/api/custom-error";
import { QuestionType } from "@/lib/types";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const SQL1 = "SELECT * FROM EL_EXAM WHERE ID = :id";
const SQL2 = "SELECT * FROM EL_QUESTION WHERE EXAM_ID = :id ORDER BY QUESTION_NUMBER";

export const GET = async (req: NextRequest, { params }: Props) => {
  const id = (await params).id;
  let conn = null;

  try {
    conn = await getConn();
    const examInfo = await conn.execute(SQL1, [id], { outFormat: OracleDB.OUT_FORMAT_OBJECT });
    // prettier-ignore
    const questionInfo = await conn.execute<QuestionType>(SQL2, [id], { outFormat: OracleDB.OUT_FORMAT_OBJECT });

    if (!examInfo || !examInfo.rows || examInfo.rows.length == 0)
      throw new CustomError(`ID: ${id}에 해당하는 시험이 존재하지 않습니다.`);
    if (!questionInfo || !questionInfo.rows || questionInfo.rows.length == 0)
      throw new CustomError(`ID: ${id}에 해당하는 시험이 존재하지 않습니다.`);

    const question: QuestionType[][] = [[], [], [], [], []];
    for (const qqq of questionInfo.rows) {
      if (qqq.SUBJECT == 1) question[0].push(qqq);
      if (qqq.SUBJECT == 2) question[1].push(qqq);
      if (qqq.SUBJECT == 3) question[2].push(qqq);
      if (qqq.SUBJECT == 4) question[3].push(qqq);
      if (qqq.SUBJECT == 5) question[4].push(qqq);
    }

    return NextResponse.json({
      code: "success",
      data: {
        EXAM_INFO: examInfo.rows[0],
        QUESTION_LIST: question,
      },
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
