import oracledb from "oracledb";

let pool: oracledb.Pool | null = null;
let initPromise: Promise<oracledb.Pool> | null = null;

async function initOracleClient(): Promise<oracledb.Pool> {
  if (pool) return pool;

  // 초기화 중이면 같은 Promise 반환
  if (initPromise) return initPromise;

  initPromise = oracledb
    .createPool({
      user: "dspoon",
      password: "CiderSecurity97##",
      connectionString:
        "(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1521)(host=adb.ap-chuncheon-1.oraclecloud.com))(connect_data=(service_name=g5d41c7c8b6d641_dividendspoon_high.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))",
      poolMin: 1,
      poolMax: 5,
      poolIncrement: 1,
    })
    .then((createdPool) => {
      pool = createdPool;
      console.log("✅ Oracle DB Pool 초기화 완료");
      return createdPool;
    })
    .catch((err) => {
      console.error("❌ Oracle DB Pool 초기화 실패", err);
      initPromise = null; // 실패 시 다음 시도 허용
      throw err;
    });

  return initPromise;
}

export async function getConn(): Promise<oracledb.Connection> {
  const currentPool = pool || (await initOracleClient());
  return currentPool.getConnection();
}

// 안전하게 pool 종료
process.on("SIGINT", async () => {
  console.log("🔌 DB 연결 종료 시작...");
  try {
    if (oracledb.getPool()) {
      await oracledb.getPool().close(10);
      console.log("✅ DB 연결 종료 완료");
    }
  } catch (err) {
    console.error("❌ DB 연결 종료 중 오류 발생", err);
  } finally {
    process.exit(0);
  }
});
