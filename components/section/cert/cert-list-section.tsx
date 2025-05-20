import { getCerts } from "@/actions/cert-action";
import Link from "next/link";

interface Props {
  q: string;
}

export const CertListSection = async ({ q }: Props) => {
  try {
    const certs = await getCerts(q);

    return (
      <section className="p-5">
        <div className="border-t" />
        <h2 className="mt-5 text-lg md:text-xl font-semibold">
          {q ? `검색: ${q}` : "국가기술자격시험"}
        </h2>
        {certs.length == 0 && (
          <p className="md:mt-5 p-5 text-muted-foreground">검색 결과가 없습니다.</p>
        )}

        {certs.length > 0 && (
          <ul className="md:mt-5 p-5 space-y-5 underline-offset-2 [&_li]:hover:underline">
            {certs.map((item) => (
              <li key={`cert-${item.ID}`}>
                <Link href={`/certs/${item.ID}`}>{item.TITLE}</Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  } catch (err) {
    if (err instanceof Error)
      return (
        <section className="p-5">
          <h2 className="text-lg md:text-xl font-semibold">
            {q ? `검색: ${q}` : "국가기술자격시험"}
          </h2>
          <p className="md:mt-5 p-5 text-muted-foreground">오류가 발생했습니다.</p>
        </section>
      );
  }
};
