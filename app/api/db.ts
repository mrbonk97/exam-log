import oracledb from "oracledb";

let pool: oracledb.Pool | null = null;

async function initOracleClient() {
  try {
    pool = await oracledb.createPool({
      user: "dspoon",
      password: "CiderSecurity97##",
      connectionString:
        "(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1521)(host=adb.ap-chuncheon-1.oraclecloud.com))(connect_data=(service_name=g5d41c7c8b6d641_dividendspoon_high.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))",
      poolMin: 1,
      poolMax: 5,
      poolIncrement: 1,
    });

    console.log("Oracle Db Pool 초기화");
    return pool;
  } catch (err) {
    console.log("Oracle Db Pool 초기화 실패", err);
    throw err;
  }
}

export function getDbPool() {
  if (pool) return pool;
  return initOracleClient();
}

export async function getConn() {
  if (pool) return pool.getConnection();
  return initOracleClient().then((res) => res.getConnection());
}

process.on("SIGINT", async () => {
  console.log("DB 연결 종료 시작");
  try {
    await oracledb.getPool()?.close(10);
    console.log("DB 연결 종료 성공");
  } catch (err) {
    console.error("❌ DB 연결 종료 중 오류 발생생", err);
  } finally {
    process.exit(0); // 프로세스 종료
  }
});
