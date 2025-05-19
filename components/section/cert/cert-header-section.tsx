import { AddFavoriteButton } from "@/components/add-favorite-button";
import { Flower } from "lucide-react";

interface Props {
  examId: string;
  title: string;
  org: string;
  isFavorite: boolean;
}

export const CertHeaderSection = ({ examId, title, org, isFavorite }: Props) => {
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
        <AddFavoriteButton examId={examId} defaultFavorite={isFavorite} />
      </section>
    </header>
  );
};
