import { SearchSection } from "@/components/section/search-section";
import { EXAM_LIST } from "@/constants/constants";
import { StarIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  searchParams: {
    q?: string;
  };
}
const CertPage = async ({ searchParams }: Props) => {
  const q = (await searchParams).q;

  return (
    <main className="p-5 pt-[4.75rem] mx-auto max-w-7xl">
      <h1 className="p-5 text-4xl font-bold">자격증 목록</h1>
      <SearchSection defaultValue={q} />
      <section className="p-5">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          즐겨찾기 <StarIcon className="inline text-yellow-400" />
        </h2>
        <div className="p-5 text-muted-foreground">
          <p>즐겨찾기를 등록하시려면 로그인하세요</p>
        </div>
      </section>
      <section className="p-5 border-t">
        <h3 className="text-2xl font-semibold">국가기술자격시험</h3>
        <List />
      </section>
    </main>
  );
};

const List = () => {
  return (
    <ul className="mt-10 p-5 space-y-5 underline-offset-2 [&_li]:hover:underline">
      {EXAM_LIST.map((item) => (
        <li key={item.id}>
          <Link href={`/certs/${item.id}`}>{item.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default CertPage;
