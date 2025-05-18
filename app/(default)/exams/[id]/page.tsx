import { getExamById } from "@/actions/exam-action";
import { SideNav } from "@/components/nav/side-nav";
import { QuestionCard } from "@/components/question-card";
import { SubjectHeader } from "@/components/subject-header";
import { SubjectHeader2 } from "@/components/subject-header2";

interface Props {
  params: Promise<{
    id: number;
  }>;
}

const ExamDetailPage = async ({ params }: Props) => {
  const id = (await params).id;
  const examInfo = await getExamById(id);

  return (
    <main className="pt-14">
      <SideNav />
      <header className="px-5 py-5 lg:py-14 bg-secondary text-center">
        <h1 className="text-2xl lg:text-4xl font-bold">{examInfo.EXAM_INFO.TITLE}</h1>
        <h2 className="mt-1 font-medium opacity-80">
          시험일: {examInfo.EXAM_INFO.EXAM_START_DATE.toLocaleDateString()} ~{" "}
          {examInfo.EXAM_INFO.EXAM_END_DATE.toLocaleDateString()}
        </h2>
      </header>
      {new Array({ length: 5 }).map((_, idx) => {
        let subjectTitle = null;
        if (idx == 0) subjectTitle = examInfo.EXAM_INFO.SUBJECT_1;
        if (idx == 1) subjectTitle = examInfo.EXAM_INFO.SUBJECT_2;
        if (idx == 2) subjectTitle = examInfo.EXAM_INFO.SUBJECT_3;
        if (idx == 3) subjectTitle = examInfo.EXAM_INFO.SUBJECT_4;
        if (idx == 4) subjectTitle = examInfo.EXAM_INFO.SUBJECT_5;
        if (!subjectTitle) return;

        return (
          <section key={`subject-${idx}`}>
            {idx == 0 ? (
              <SubjectHeader title={`${idx + 1}. ${subjectTitle}`} />
            ) : (
              <SubjectHeader2 title={`${idx + 1}. ${subjectTitle}`} />
            )}
            <div className="p-5 mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10">
              {examInfo.QUESTION_LIST[idx].map((item) => (
                <QuestionCard
                  key={`q${item.ID}`}
                  id={item.ID}
                  answer={item.ANSWER}
                  question={item.QUESTION}
                  choice_1={item.CHOICE_1}
                  choice_2={item.CHOICE_2}
                  choice_3={item.CHOICE_3}
                  choice_4={item.CHOICE_4}
                  choice_5={item.CHOICE_5}
                />
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
};

export default ExamDetailPage;
