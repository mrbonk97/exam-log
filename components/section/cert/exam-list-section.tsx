import { ExamType } from "@/lib/types";
import { BirdIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  exams: ExamType[];
}

export const ExamListSection = ({ exams }: Props) => {
  return (
    <section className="p-5 mx-auto max-w-7xl">
      <h2 className="text-lg md:text-xl font-semibold">기출문제</h2>
      {exams.length == 0 && (
        <div className="mt-20 text-muted-foreground">
          <BirdIcon className="mx-auto" size={64} />
          <p className="mt-5 text-center font-medium">등록된 시험이 없습니다</p>
        </div>
      )}
      {exams.length > 0 && (
        <ul className="mt-5 space-x-5">
          {exams.reverse().map((item) => (
            <li key={`exam-schedule-${item.ID}`}>
              <Link
                href={`/exams/${item.ID}`}
                className="block p-5 rounded-lg border hover:bg-secondary cursor-pointer"
              >
                {item.TITLE}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
