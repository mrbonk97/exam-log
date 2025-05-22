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
  REGISTER_START_DATE: Date;
  REGISTER_END_DATE: Date;
  EXAM_START_DATE: Date;
  EXAM_END_DATE: Date;
  RESULT_DATE: Date;
};

export type QuestionType = {
  ID: number;
  EXAM_ID: number;
  SUBJECT: number;
  QUESTION_IDX: number;
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

export type UserType = {
  ID: number;
  AUTH_PROVIDER: string;
  NAME: string;
  PROFILE_IMAGE: string;
  CREATED_AT: Date;
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
