import { verifyJwt } from "@/lib/jwt";
import { cookies } from "next/headers";
import { errorFactory } from "./el-error";

export const getUserId = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");
  if (!accessToken) throw errorFactory("ERROR_01");
  return verifyJwt(accessToken.value);
};
