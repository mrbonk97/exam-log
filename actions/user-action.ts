import OracleDB from "oracledb";
import { getConn } from "@/lib/db";
import { UserType } from "@/lib/types";
import { ELError, errorFactory } from "@/lib/el-error";

export const getUserById = async (userId: number) => {
  const SQL =
    "SELECT ID, AUTH_PROVIDER, PROFILE_IMAGE, NAME, CREATED_AT FROM EL_USER WHERE id = :id";

  let conn = null;
  try {
    conn = await getConn();

    const { rows } = await conn.execute<UserType>(SQL, [userId], {
      outFormat: OracleDB.OUT_FORMAT_OBJECT,
    });

    if (!rows || rows.length == 0)
      throw errorFactory("ERROR_03", `ID: ${userId}에 해당하는 사용자가 없습니다.`);

    return rows[0];
  } catch (err) {
    throw err instanceof ELError ? err : errorFactory("ERROR_00");
  } finally {
    if (conn) await conn.close();
  }
};
