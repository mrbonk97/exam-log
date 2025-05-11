export type CertType = {
  ID: string;
  TITLE: string;
  ORGANIZATION: string;
  DESCRIPTION: string;
  HOMEPAGE: string;
  HOMEPAGE_URL: string;
  HOMEPAGE_IMG_URL: string;
};

export type ExamType = {
  ID: number;
  CERT_ID: string;
  TITLE: string;
  EXAM_ROUND: number;
  YEAR: number;
  IS_REGISTERED: boolean;
  SUBJECT_1: string;
  SUBJECT_2: string;
  SUBJECT_3: string;
  SUBJECT_4: string;
  SUBJECT_5: string;
  REGISTER_START_DATE: string;
  REGISTER_END_DATE: string;
  EXAM_START_DATE: string;
  EXAM_END_DATE: string;
  RESULT_DATE: string;
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
  QUESTION_NUMBER: number;
  SUBJECT: number;
};

export type UserType = {
  name: string;
  profileImage: string;
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
