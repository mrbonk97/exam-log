import OracleDB from "oracledb";
import { getConn } from "@/lib/db";
import { CertType, ExamType } from "@/lib/types";
import { errorFactory } from "@/lib/el-error";

export const getCerts = async (q: string) => {
  const SQL = "SELECT * FROM EL_CERT WHERE TITLE LIKE '%' || :q || '%'";

  const conn = await getConn();
  const res = await conn.execute<CertType>(SQL, [q], { outFormat: OracleDB.OUT_FORMAT_OBJECT });
  await conn.close();
  return res.rows || [];
};

export const getFavoriteCerts = async (userId: number) => {
  const SQL = `
        SELECT A.CERT_ID as ID, B.TITLE FROM EL_FAVORITE_CERT A
        LEFT OUTER JOIN EL_CERT B
        ON A.CERT_ID = B.ID
        WHERE A.USER_ID = :user_id`;

  const conn = await getConn();
  const res = await conn.execute<CertType>(SQL, [userId], {
    outFormat: OracleDB.OUT_FORMAT_OBJECT,
  });
  await conn.close();
  return res.rows || [];
};

export const getCertById = async (certId: string) => {
  const SQL1 = "SELECT * FROM EL_CERT WHERE ID = :id";
  const SQL2 = "SELECT * FROM EL_EXAM WHERE CERT_ID = :id ORDER BY RESULT_DATE";

  const conn = await getConn();

  const certInfo = await conn.execute<CertType>(SQL1, [certId], {
    outFormat: OracleDB.OUT_FORMAT_OBJECT,
  });

  const examInfo = await conn.execute<ExamType>(SQL2, [certId], {
    outFormat: OracleDB.OUT_FORMAT_OBJECT,
  });

  if (!certInfo || !certInfo.rows)
    throw errorFactory("ERROR_03", `아이디에 해당하는 시험이 없습니다. ID: ${certId}`);

  return {
    CERT_INFO: certInfo.rows[0],
    EXAM_LIST: examInfo.rows || [],
  };
};
