CREATE TABLE EL_CERT (
    ID VARCHAR2(255) PRIMARY KEY,
    TITLE VARCHAR2(255)
);

CREATE TABLE EL_EXAM (
    ID NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    CERT_ID VARCHAR2(255),
    TITLE VARCHAR2(255),
    EXAM_ROUND VARCHAR2(255)
);

CREATE TABLE EL_QUESTION (
    ID NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    EXAM_ID NUMBER,
    QUESTION VARCHAR2(4000),
    IS_MULTIPLE BOOLEAN DEFAULT FALSE,
    CHOICE_1 VARCHAR2(1000),
    CHOICE_2 VARCHAR2(1000),
    CHOICE_3 VARCHAR2(1000),
    CHOICE_4 VARCHAR2(1000),
    CHOICE_5 VARCHAR2(1000),
    IMAGE_1 VARCHAR2(1000),
    IMAGE_2 VARCHAR2(1000),
    ANSWER VARCHAR2(100),
    CONSTRAINT FK_EL_QUESTION_EXAM FOREIGN KEY (EXAM_ID) REFERENCES EL_EXAM(ID)
);


CREATE TABLE EL_EXAM_SCHEDULE (
    ID NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    CERT_ID VARCHAR2(255),
    TITLE VARCHAR2(255),
    REGISTER_START_DATE DATE,
    REGISTER_END_DATE DATE,
    EXAM_START_DATE DATE,
    EXAM_END_DATE DATE,
    RESULT_DATE DATE
)

CREATE TABLE EL_USER (
   ID VARCHAR2(255) PRIMARY KEY,
    AUTH_PROVIDER VARCHAR2(255),
    PROFILE_IMAGE VARCHAR2(255),
    NAME VARCHAR2(255),
    CREATED_AT TIMESTAMP DEFAULT SYSDATE,
    UPDATED_AT TIMESTAMP DEFAULT SYSDATE
)



CREATE TABLE EL_FAVORITE_CERT (
   ID NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
   USER_ID NUMBER,
   CERT_ID VARCHAR2(255),
   CREATED_AT TIMESTAMP DEFAULT SYSDATE,
   UPDATED_AT TIMESTAMP DEFAULT SYSDATE
)