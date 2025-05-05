import { ExamButtonSection } from "@/components/section/exam-button-section";
import { CertifiateType, ExamType, ResponseType } from "@/lib/types";
import { Flower } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const CertDetailPage = async ({ params }: Props) => {
  const id = (await params).id;
  const res: ResponseType<CertifiateType> = await fetch(
    `${process.env.API_URL}/api/certs/${id}`
  ).then((res) => res.json());

  if (!res || res.code == "fail") throw new Error(res.message);

  // 올해 시험인 것은 schedule 아닌 것은 시험 리스트
  const schedule: ExamType[] = [];
  const examList: ExamType[] = [];

  for (const item of res.data.examList) {
    if (item.YEAR == 2025) schedule.push(item);
    else examList.push(item);
  }

  return (
    <main className="pt-14">
      <header className="p-5 h-32 bg-secondary">
        <div className="mx-auto h-full max-w-7xl flex justify-between gap-5">
          <div className="flex items-center gap-5">
            <Flower size={96} className="text-purple-400" />
            <hgroup>
              <h1 className="text-4xl font-bold">{res.data.examInfo.title}</h1>
              <h2 className="mt-1 text-lg font-semibold opacity-80">{res.data.examInfo.agency}</h2>
            </hgroup>
          </div>
        </div>
      </header>
      <section className="p-5 mx-auto max-w-7xl border-b">
        <p>{res.data.examInfo.description}</p>
      </section>
      <ExamButtonSection homePage="asd" schedule={schedule} examList={examList} />
      <section className="p-5 mx-auto max-w-7xl">
        <ul className="p-5 space-y-10 font-medium">
          {examList.reverse().map((item) => (
            <li key={`exam-schedule-${item.ID}`}>
              <Link
                href={`/exams/${item.ID}`}
                className="block p-5 rounded-lg border hover:bg-secondary cursor-pointer"
              >
                {item.TITLE}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default CertDetailPage;
