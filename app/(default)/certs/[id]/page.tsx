import { getCertById } from "@/actions/cert-action";
import { CertActionSection } from "@/components/section/cert/cert-action-section";
import { CertHeaderSection } from "@/components/section/cert/cert-header-section";
import { ExamListSection } from "@/components/section/cert/exam-list-section";
import { ExamType } from "@/lib/types";
import { Metadata } from "next";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;
  const cert = await getCertById(id);
  return {
    title: `${cert.CERT_INFO.TITLE} - 기출로그`,
  };
}

const CertDetailPage = async ({ params }: Props) => {
  const id = (await params).id;
  const cert = await getCertById(id);

  // 올해 시험인 것은 schedule 아닌 것은 시험 리스트
  const schedule: ExamType[] = [];
  const examList: ExamType[] = [];

  for (const item of cert.EXAM_LIST) {
    if (item.YEAR == new Date().getFullYear()) schedule.push(item);
    else if (item.IS_REGISTERED) examList.push(item);
  }

  return (
    <main className="pt-14 min-h-full">
      <CertHeaderSection
        title={cert.CERT_INFO.TITLE}
        org={cert.CERT_INFO.ORGANIZATION}
        examId={id}
        isFavorite={false}
      />
      <CertActionSection
        description={cert.CERT_INFO.DESCRIPTION}
        homepage={cert.CERT_INFO.HOMEPAGE}
        homepageUrl={cert.CERT_INFO.HOMEPAGE_URL}
        homepageImgUrl={cert.CERT_INFO.HOMEPAGE_IMG_URL}
        schedule={schedule}
        examList={examList}
      />
      <ExamListSection exams={examList} />
    </main>
  );
};

export default CertDetailPage;
