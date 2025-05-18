import * as jwt from "jsonwebtoken";
import { ELError, errorFactory } from "@/lib/el-error";

const secret = process.env.JWT_SECRET;

// 기본시간 = 1시간
export const generateJwt = (payload: object, expiresIn = 3_600_000) => {
  if (!secret) throw errorFactory("ERROR_04");

  return jwt.sign(payload, secret, {
    expiresIn: expiresIn,
  });
};

export const verifyJwt = (token: string) => {
  if (!secret) throw errorFactory("ERROR_04");

  try {
    const decoded = jwt.verify(token, secret);
    // decoded가 JwtPayload인지 확인 후 사용
    if (typeof decoded === "object" && "id" in decoded) return (decoded as jwt.JwtPayload).id;
    else throw errorFactory("ERROR_04");
  } catch (err) {
    if (err instanceof ELError) throw err;
    if (err instanceof jwt.JsonWebTokenError) throw errorFactory("ERROR_06");
    if (err instanceof jwt.TokenExpiredError) throw errorFactory("ERROR_05");
    throw errorFactory("ERROR_06");
  }
};
