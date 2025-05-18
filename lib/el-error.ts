export class ELError extends Error {
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.name = "ELError";
  }
}

export const errorFactory = (code: string, msg?: string) => {
  const error = ERROR_CODE.find((item) => item.code == code) || ERROR_CODE[ERROR_CODE.length - 1];
  return new ELError(error.code, msg || error.message);
};

const ERROR_CODE = [
  { code: "ERROR_01", message: "UNAUTHORIZED: 인증된 사용자만 접근할 수 있습니다." },
  { code: "ERROR_02", message: "FORBIDDEN: 해당 기능에 접근 권한이 없습니다." },
  { code: "ERROR_03", message: "NOT FOUND: 요청한 자료를 찾을 수 없습니다." },
  { code: "ERROR_04", message: "INTERNAL: .env파일의 Jwt Secret이 비어있습니다." },
  { code: "ERROR_04", message: "INTERNAL: 토큰 payload에 id가 없습니다." },
  { code: "ERROR_05", message: "access_token이 만료되었습니다." },
  { code: "ERROR_06", message: "토큰을 검증하는 중 알 수 없는 오류가 발생했습니다." },
  { code: "ERROR_07", message: "access_token이 없습니다." },
  { code: "ERROR_00", message: "INTERNAL: 알 수 없는 오류가 발생했습니다." },
];
