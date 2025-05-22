import { DotIcon } from "lucide-react";

interface Props {
  title: string;
}

// 두번째 과목 부터는 색상을 안바꿔도 되어서 간단하게 간다.
export const SubjectHeader2 = ({ title }: Props) => {
  return (
    <header className={"py-2 lg:py-5 sticky top-14 border-b bg-secondary"}>
      <h4 className="mx-auto max-w-7xl text-lg lg:text-xl font-bold opacity-80">
        <DotIcon className="inline mb-1" />
        {title}
      </h4>
    </header>
  );
};
