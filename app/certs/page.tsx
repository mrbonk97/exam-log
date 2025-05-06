import Link from "next/link";
import { SearchSection } from "@/components/section/search-section";
import { Metadata } from "next";

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
    };

  return {
    title: "자격증 목록 - 기출로그",
  };
}

const CertPage = async ({ searchParams }: Props) => {
  const q = (await searchParams).q || "";
  const res = await fetch(`${process.env.API_URL}/api/certs?q=${q}`).then((res) => res.json());

  return (
    <main className="p-5 pt-20 md:pt-24 mx-auto max-w-7xl">
      <h1 className="text-2xl md:text-4xl font-bold">자격증 목록</h1>
      <SearchSection defaultValue={q} />
      <section className="mt-5 md:mt-10 py-5 border-b">
        <h2 className="text-lg md:text-2xl font-semibold">
          즐겨찾기 <span className="text-yellow-400">★</span>
        </h2>
        <p className="md:mt-5 p-5 text-muted-foreground">
          즐겨찾기를 등록하시려면{" "}
          <Link href={"/sign-in"} className="underline-offset-2 underline">
            로그인
          </Link>
          하세요
        </p>
      </section>
      <section className="mt-5 py-5">
        <h2 className="text-lg md:text-2xl font-semibold">
          {q ? `검색: ${q}` : "국가기술자격시험"}
        </h2>
        {res.data.certs.length == 0 ? (
          <p className="md:mt-5 p-5 text-muted-foreground">검색 결과가 없습니다.</p>
        ) : (
          <List data={res.data.certs} />
        )}
      </section>
    </main>
  );
};

interface Props2 {
  data: {
    ID: string;
    TITLE: string;
  }[];
}

const List = ({ data }: Props2) => {
  return (
    <ul className="md:mt-5 p-5 space-y-5 underline-offset-2 [&_li]:hover:underline">
      {data.map((item) => (
        <li key={`cert-${item.ID}`}>
          <Link href={`/certs/${item.ID}`}>{item.TITLE}</Link>
        </li>
      ))}
    </ul>
  );
};

export default CertPage;
