import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  userId: number;
}

export const MyCertSection = ({ userId }: Props) => {
  console.log(userId);
  return (
    <section className=" p-5 space-y-5">
      <div className="border-t" />
      <h2 className="my-5 text-lg md:text-xl font-semibold">저장한 시험</h2>
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
  );
};
