import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  userId: number;
}

export const ActivitySection = ({ userId }: Props) => {
  console.log(userId);
  return (
    <section className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
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
  );
};
