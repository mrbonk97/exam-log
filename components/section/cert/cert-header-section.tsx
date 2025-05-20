import { getIsFavoriteCert } from "@/actions/cert-action";
import { AddFavoriteButton } from "@/components/add-favorite-button";
import { verifyJwt } from "@/lib/jwt";
import { Flower } from "lucide-react";
import { cookies } from "next/headers";

interface Props {
  examId: string;
  title: string;
  org: string;
}

export const CertHeaderSection = async ({ examId, title, org }: Props) => {
  let isLoggedIn = false;
  let isFavorite = false;

  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token");
    if (accessToken) {
      const userId = verifyJwt(accessToken.value);
      isFavorite = await getIsFavoriteCert(userId, examId);
      isLoggedIn = true;
    }
  } catch {}

  return (
    <header className="bg-secondary">
      <section className="p-5 mx-auto max-w-7xl flex flex-row justify-between gap-5">
        <div className="flex items-center gap-2">
          <Flower className="h-full w-16 md:w-20 text-purple-400" />
          <hgroup>
            <h1 className="text-2xl md:text-4xl font-bold">{title}</h1>
            <h2 className="md:mt-1 text-base md:text-lg font-semibold opacity-80">{org}</h2>
          </hgroup>
        </div>
        <AddFavoriteButton examId={examId} defaultFavorite={isFavorite} isLoggedIn={isLoggedIn} />
      </section>
    </header>
  );
};
