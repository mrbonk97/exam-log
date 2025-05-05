export type ExamType = {
  ID: number;
  CERT_ID: string;
  TITLE: string;
  EXAM_ROUND: string;
  YEAR: number;
  REGISTER_START_DATE: string;
  REGISTER_END_DATE: string;
  EXAM_START_DATE: string;
  EXAM_END_DATE: string;
  RESULT_DATE: string;
};

export type CertifiateType = {
  examInfo: {
    id: string;
    group: string;
    title: string;
    description: string;
    agency: string;
    homepage: {
      title: string;
      logo: string;
      url: string;
    };
  };
  examList: ExamType[];
};

export type QuestionType = {
  ID: number;
  EXAM_ID: number;
  QUESTION: string;
  IS_MULTIPLE: boolean;
  CHOICE_1: string;
  CHOICE_2: string;
  CHOICE_3: string;
  CHOICE_4: string;
  CHOICE_5: string | null;
  IMAGE_1: string | null;
  IMAGE_2: string | null;
  ANSWER: string;
  POINT: number;
};

export type ErrorType = {
  code: string;
  message: string;
};

export type ResponseType<T> = {
  code: string;
  message?: string;
  data: T;
};
