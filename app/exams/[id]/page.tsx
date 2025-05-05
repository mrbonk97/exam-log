import { SideNav } from "@/components/nav/side-nav";
import { QuestionCard } from "@/components/question-card";
import { SubjectHeader } from "@/components/subject-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { QuestionType } from "@/lib/types";
import { HeartIcon } from "lucide-react";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const ExamDetailPage = async ({ params }: Props) => {
  const id = (await params).id;
  const res = await fetch(`${process.env.API_URL}/api/exams/${id}`).then((res) => res.json());
  console.log(res);
  return (
    <main className="pt-14">
      <SideNav />
      <header className="px-5 py-14 bg-secondary text-center">
        <h1 className="text-4xl font-bold">정보처리기사 2025년 1회차</h1>
        <h2 className="mt-1 font-medium opacity-80">시험일: 2025년 3월 21일 ~ 2025년 3월 31일</h2>
      </header>
      {/* <section className="p-5 mx-auto max-w-7xl">
        <div className="ml-auto w-fit">
          <Button className="ml-auto">2개씩 보기</Button>
        </div>
      </section> */}
      <section>
        <SubjectHeader title={"1과목: 통신 일반"} />
        <div className="p-5 mx-auto max-w-7xl grid grid-cols-2 gap-10">
          {res.data.map((item: QuestionType) => (
            <QuestionCard
              key={`q${item.ID}`}
              id={item.ID}
              answer={item.ANSWER}
              question={item.QUESTION}
              choice_1={item.CHOICE_1}
              choice_2={item.CHOICE_2}
              choice_3={item.CHOICE_3}
              choice_4={item.CHOICE_4}
              choice_5={item.CHOICE_5}
            />
          ))}
        </div>
      </section>
      <section>
        <SubjectHeader title={"2과목: 이과목 깔깔"} />
        <div className="p-5 mx-auto max-w-7xl grid grid-cols-2 gap-10">
          {Array.from({ length: 40 }).map((item, idx) => (
            <Card key={`q2-${idx}`} className="col-span-1 shadow-none">
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <h5>1. 대충 정보처리기사 1번 문제</h5>
                  <HeartIcon size={18} role="button" className="cursor-pointer" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>1. 대충 1번 항목</li>
                  <li>2. 대충 2번 항목</li>
                  <li>3. 대충 2번 항목</li>
                  <li>4. 대충 2번 항목</li>
                </ul>
              </CardContent>
              <CardFooter className="ml-auto space-x-2">
                <Button variant={"secondary"} className="cursor-pointer">
                  오류 수정 요청
                </Button>
                <Button className="cursor-pointer">정답 확인</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
      <section className="p-5 mx-auto max-w-7xl">
        <Button className="py-6 w-full cursor-pointer">체점</Button>
      </section>
    </main>
  );
};

export default ExamDetailPage;
