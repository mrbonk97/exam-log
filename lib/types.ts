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
  examSchedule: {
    ID: number;
    CERT_ID: string;
    REGISTER_START_DATE: string;
    REGISTER_END_DATE: string;
    EXAM_START_DATE: string;
    EXAM_END_DATE: string;
    RESULT_DATE: string;
  }[];
  examList: {
    ID: number;
    CERT_ID: string;
    TITLE: string;
    EXAM_ROUND: string;
    YEAR: number;
  }[];
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
