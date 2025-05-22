import OracleDB from "oracledb";
import { getConn } from "@/lib/db";
import { ExamType, QuestionType } from "@/lib/types";
import { errorFactory } from "@/lib/el-error";

export const getExamById = async (id: number) => {
  const SQL1 = "SELECT * FROM EL_EXAM WHERE ID = :id";
  const SQL2 = "SELECT * FROM EL_QUESTION WHERE EXAM_ID = :id ORDER BY QUESTION_IDX";

  const conn = await getConn();

  const examInfo = await conn.execute<ExamType>(SQL1, [id], {
    outFormat: OracleDB.OUT_FORMAT_OBJECT,
  });
  const questionInfo = await conn.execute<QuestionType>(SQL2, [id], {
    outFormat: OracleDB.OUT_FORMAT_OBJECT,
  });

  if (
    !examInfo ||
    !examInfo.rows ||
    examInfo.rows.length == 0 ||
    !questionInfo ||
    !questionInfo.rows ||
    questionInfo.rows.length == 0
  )
    throw errorFactory("ERROR_03", `ID: ${id}에 해당하는 시험을 찾을 수 없습니다.`);

  const question: QuestionType[][] = [[], [], [], [], []];

  for (const qqq of questionInfo.rows) {
    if (qqq.SUBJECT == 1) question[0].push(qqq);
    if (qqq.SUBJECT == 2) question[1].push(qqq);
    if (qqq.SUBJECT == 3) question[2].push(qqq);
    if (qqq.SUBJECT == 4) question[3].push(qqq);
    if (qqq.SUBJECT == 5) question[4].push(qqq);
  }

  await conn.close();

  return {
    EXAM_INFO: examInfo.rows[0],
    QUESTION_LIST: question,
  };
};
