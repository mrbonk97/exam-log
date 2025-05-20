import { getFavoriteCerts } from "@/actions/cert-action";
import { getUserId } from "@/lib/auth";
import { ELError } from "@/lib/el-error";
import { BirdIcon } from "lucide-react";
import Link from "next/link";

export const FavoriteCertSection = async () => {
  try {
    const userId = await getUserId();
    const certs = await getFavoriteCerts(userId);

    return (
      <section className="p-5">
        <h2 className="text-lg md:text-xl font-semibold">
          즐겨찾기 <span className="text-yellow-400">★</span>
        </h2>
        {certs.length == 0 && (
          <p className="md:mt-5 p-5 text-muted-foreground">
            <BirdIcon className="mb-5" size={36} />
            즐겨찾기가 비어있습니다.
          </p>
        )}
        {certs.length > 0 && (
          <ul className="md:mt-5 p-5 space-x-5 underline-offset-2 [&_li]:hover:underline">
            {certs.map((item) => (
              <li key={`fav-cert-${item.ID}`} className="inline-block">
                <Link href={`/certs/${item.ID}`}>{item.TITLE}</Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  } catch (err) {
    let message = null;

    if (err instanceof ELError && err.code === "ERROR_01")
      message = (
        <p className="md:mt-5 p-5 text-muted-foreground">
          즐겨찾기를 등록하시려면{" "}
          <Link href="/sign-in" className="underline-offset-2 underline">
            로그인
          </Link>
          하세요
        </p>
      );
    else if (err instanceof Error)
      message = <p className="md:mt-5 p-5 text-muted-foreground">오류가 발생했습니다.</p>;

    return (
      <section className="p-5">
        <h2 className="text-lg md:text-2xl font-semibold">
          즐겨찾기 <span className="text-yellow-400">★</span>
        </h2>
        {message}
      </section>
    );
  }
};
