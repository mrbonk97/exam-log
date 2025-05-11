import { NextRequest, NextResponse } from "next/server";
import { CustomError } from "../../custom-error";

export const GET = async (req: NextRequest) => {
  try {
    const accessToken = req.cookies.get("access_token")?.value;
    if (!accessToken) throw new CustomError("access_token이 없습니다.");

    const res = await fetch("https://openapi.naver.com/v1/nid/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json());

    if (res.resultcode != "00") throw new CustomError(res.message);

    return NextResponse.json({
      code: "success",
      data: {
        ID: res.response.id,
        PROFILE_IMAGE: res.response.profile_image,
        NAME: res.response.name,
      },
    });
  } catch (err) {
    if (err instanceof CustomError)
      return NextResponse.json({ code: "error", message: err.message }, { status: 400 });

    return NextResponse.json(
      { code: "error", message: "서버에서 오류가 발생했습니다." },
      { status: 500 }
    );
  }
};
