import { Metadata } from "next";
import { SearchSection } from "@/components/section/cert/search-section";
import { CertListSection } from "@/components/section/cert/cert-list-section";
import { FavoriteCertSection } from "@/components/section/cert/favorite-cert-section";

interface Props {
  searchParams: Promise<{
    q?: string;
  }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const q = (await searchParams).q || "";
  if (q)
    return {
      title: `${q} - 기출로그 검색`,
      description: `${q} 관련 자격증 기출문제를 쉽고 빠르게 검색해보세요. 기출로그가 정확한 답을 찾아드립니다.`,
      keywords: `${q}, 자격증, 기출문제, 시험, 기출로그, 공부`,
      openGraph: {
        title: `${q} - 기출로그 검색`,
        description: `${q} 관련 자격증 기출문제를 쉽고 빠르게 검색해보세요.`,
      },
    };

  return {
    title: "자격증 목록 - 기출로그",
    description: "다양한 자격증의 최신 기출문제를 한눈에 확인하고, 시험 준비를 효율적으로 하세요.",
    keywords: "자격증, 기출문제, 시험, 공부, 기출로그",
    openGraph: {
      title: "자격증 목록 - 기출로그",
      description:
        "다양한 자격증의 최신 기출문제를 한눈에 확인하고, 시험 준비를 효율적으로 하세요.",
    },
  };
}

const CertPage = async ({ searchParams }: Props) => {
  const q = (await searchParams).q || "";

  return (
    <main className="pt-14 mx-auto max-w-7xl min-h-full">
      <SearchSection defaultValue={q} />
      <header className="pt-0 md:pt-5 p-5">
        <h1 className="text-2xl md:text-4xl font-bold">자격증 목록</h1>
      </header>
      <FavoriteCertSection />
      <CertListSection q={q} />
    </main>
  );
};

export default CertPage;
