import { Flower } from "lucide-react";

interface Props {
  title: string;
  org: string;
}

export const CertHeaderSection = ({ title, org }: Props) => {
  return (
    <header className="bg-secondary">
      <section className="p-5 mx-auto max-w-7xl flex items-center gap-5">
        <Flower className="h-full w-16 md:w-20 text-purple-400" />
        <hgroup>
          <h1 className="text-2xl md:text-4xl font-bold">{title}</h1>
          <h2 className="md:mt-1 text-base md:text-lg font-semibold opacity-80">{org}</h2>
        </hgroup>
      </section>
    </header>
  );
};
