import { verifyJwt } from "@/lib/jwt";
import { Footer } from "@/components/nav/footer";
import { ProfileSection } from "@/components/section/profile-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeAlert } from "lucide-react";
import { cookies } from "next/headers";
import { errorFactory } from "@/lib/el-error";

const MyStudyPage = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");
  if (!accessToken) throw errorFactory("ERROR_01");

  const userId = verifyJwt(accessToken.value);

  return (
    <main className="pt-14 mx-auto max-w-7xl">
      <ProfileSection userId={userId} />
      <section className="mt-5 grid grid-cols-2 gap-5">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>최근 푼 기출문제</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="hover:bg-rose-100">정보처리기사 2025년 2회차</li>
              <li className="hover:bg-rose-100">정보처리기사 2024년 2회차</li>
              <li className="hover:bg-rose-100">정보처리기사 2025년 1회차</li>
            </ul>
          </CardContent>
          <CardFooter className="border-t">
            <Button className="ml-auto">상세보기</Button>
          </CardFooter>
        </Card>
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>저장한 문제</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="hover:bg-rose-100">정보처리기사 2025년 2회차</li>
              <li className="hover:bg-rose-100">정보처리기사 2024년 2회차</li>
              <li className="hover:bg-rose-100">정보처리기사 2025년 1회차</li>
            </ul>
          </CardContent>
          <CardFooter className="border-t">
            <Button className="ml-auto">상세보기</Button>
          </CardFooter>
        </Card>
      </section>
      <section className="mt-10 border-t space-y-5">
        <h4 className="mt-5 text-lg font-semibold opacity-80">저장한 시험</h4>
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>정보처리기사</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="hover:bg-rose-100">정보처리기사 2025년 2회차</li>
              <li className="hover:bg-rose-100">정보처리기사 2024년 2회차</li>
              <li className="hover:bg-rose-100">정보처리기사 2025년 1회차</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>정보처리기사</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="hover:bg-rose-100">정보처리기사 2025년 2회차</li>
              <li className="hover:bg-rose-100">정보처리기사 2024년 2회차</li>
              <li className="hover:bg-rose-100">정보처리기사 2025년 1회차</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mt-5 border-t flex flex-col gap-5">
        <h4 className="mt-5 text-lg font-semibold opacity-80">설정</h4>
        <Button className="py-6 justify-start max-w-96 w-full">
          <BadgeAlert strokeWidth={3} className="h-20 w-20" />
          로그아웃
        </Button>
        <Button variant={"destructive"} className="py-6 justify-start max-w-96 w-full">
          <BadgeAlert strokeWidth={3} className="h-20 w-20" />
          회원탈퇴
        </Button>
      </section>
      <Footer />
    </main>
  );
};

export default MyStudyPage;
