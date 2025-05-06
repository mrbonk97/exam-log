import { ExamButtonSection } from "@/components/section/exam-button-section";
import { CertType, ExamType, ResponseType } from "@/lib/types";
import { BirdIcon, Flower } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

type Response = {
  CERT_INFO: CertType;
  EXAM_LIST: ExamType[];
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;
  //prettier-ignore
  const res: ResponseType<Response> = await fetch(`${process.env.API_URL}/api/certs/${id}`).then((res) => res.json());

  if (!res || res.code == "fail") throw new Error(res.message);

  return {
    title: `${res.data.CERT_INFO.TITLE} - 기출로그`,
  };
}

const CertDetailPage = async ({ params }: Props) => {
  const id = (await params).id;
  //prettier-ignore
  const res: ResponseType<Response> = await fetch(`${process.env.API_URL}/api/certs/${id}`).then((res) => res.json());

  if (!res || res.code == "error") throw new Error(res.message);

  // 올해 시험인 것은 schedule 아닌 것은 시험 리스트
  const schedule: ExamType[] = [];
  const examList: ExamType[] = [];

  for (const item of res.data.EXAM_LIST) {
    if (item.YEAR == new Date().getFullYear()) schedule.push(item);
    else if (item.IS_REGISTERED) examList.push(item);
  }

  return (
    <main className="pt-14">
      <header className="p-5 h-24 md:h-32 bg-secondary">
        <div className="mx-auto h-full max-w-7xl flex justify-between gap-5">
          <div className="flex items-center gap-5">
            <Flower className="h-full w-16 md:w-20 text-purple-400" />
            <hgroup>
              <h1 className="text-2xl md:text-4xl font-bold">{res.data.CERT_INFO.TITLE}</h1>
              <h2 className="md:mt-1 text-base md:text-lg font-semibold opacity-80">
                {res.data.CERT_INFO.ORGANIZATION}
              </h2>
            </hgroup>
          </div>
        </div>
      </header>
      <p className="p-5 mx-auto max-w-7xl text-sm md:text-base border-b break-keep">
        {res.data.CERT_INFO.DESCRIPTION}
      </p>
      <ExamButtonSection
        homepage={res.data.CERT_INFO.HOMEPAGE}
        homepageUrl={res.data.CERT_INFO.HOMEPAGE_URL}
        homepageImgUrl={res.data.CERT_INFO.HOMEPAGE_IMG_URL}
        schedule={schedule}
        examList={examList}
      />
      <section className="p-5 mx-auto max-w-7xl">
        <h4 className="text-xl font-semibold">기출문제</h4>
        {examList.length == 0 && (
          <div className="mt-20">
            <BirdIcon className="mx-auto" size={64} />
            <p className="mt-5 text-center font-medium">등록된 시험이 없습니다</p>
          </div>
        )}
        <ul className="mt-5 space-y-5 font-medium">
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
