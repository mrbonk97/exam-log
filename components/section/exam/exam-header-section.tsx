interface Props {
  title: string;
  examStart: Date;
  examEnd: Date;
}

export const ExamHeaderSection = ({ title, examStart, examEnd }: Props) => (
  <header className="p-5 bg-secondary">
    <hgroup className="p-5 sm:py-7 md:py-10 xl:py-20 mx-auto max-w-7xl text-center">
      <h1 className="text-lg sm:text-2xl md:text-4xl font-bold">{title}</h1>
      <h2 className="sm:mt-2 md:mt-5 text-sm sm:text-base font-medium opacity-80">
        {`시험일 : ${examStart.toLocaleDateString()} ~ ${examEnd.toLocaleDateString()}`}
      </h2>
    </hgroup>
  </header>
);
