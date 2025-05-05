"use client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { ExamType } from "@/lib/types";
import { HandPlatter } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";

interface Props {
  homePage: string;
  schedule: ExamType[];
  examList: ExamType[];
}

export const ExamButtonSection = ({ homePage, schedule, examList }: Props) => {
  const router = useRouter();
  const getRandomTest = () => {
    const randomIdx = Math.floor(Math.random() * examList.length);
    router.push(`/exams/${examList[randomIdx].ID}`);
  };

  return (
    <section className="py-5 mx-auto max-w-7xl grid grid-cols-3 gap-10 border-b">
      <Card className="col-span-1 shadow-none">
        <CardHeader>
          <CardTitle>접수 홈페이지</CardTitle>
        </CardHeader>
        <CardContent>
          <Link href={homePage} className="hover:underline underline-offset-2">
            <Image src={"/logos/qnet.svg"} alt="qnet" height={96} width={96} className="mx-auto" />
            <p className="mt-1 text-center">큐넷</p>
          </Link>
        </CardContent>
      </Card>
      <Card className="col-span-1 shadow-none">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <h5>시험 일정</h5>
            <Dialog>
              <DialogTrigger className="cursor-pointer">상세보기</DialogTrigger>
              <DialogContent className="max-w-full min-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">시험 상세 일정</DialogTitle>
                </DialogHeader>
                <ul className="space-y-1">
                  <li className="p-2 grid grid-cols-11 border-b">
                    <div className="col-span-1">시험</div>
                    <div className="col-span-2 text-right">접수시작</div>
                    <div className="col-span-2 text-right">접수마감</div>
                    <div className="col-span-2 text-right">시험시작</div>
                    <div className="col-span-2 text-right">시험종료</div>
                    <div className="col-span-2 text-right">결과발표</div>
                  </li>
                  {schedule.map((item) => {
                    const _title = item.TITLE.split(" ");
                    const title = `${_title[2]} ${_title[3]}`;
                    const startDate = item.REGISTER_START_DATE.substring(0, 10);
                    const endDate = item.REGISTER_END_DATE.substring(0, 10);
                    return (
                      <li
                        key={`schedule-${item.ID}`}
                        className="p-2 grid grid-cols-11 hover:bg-secondary rounded duration-150"
                      >
                        <div className="col-span-1">{title}</div>
                        <div className="col-span-2 text-right">{startDate}</div>
                        <div className="col-span-2 text-right">{endDate}</div>
                        <div className="col-span-2 text-right">{startDate}</div>
                        <div className="col-span-2 text-right">{endDate}</div>
                        <div className="col-span-2 text-right">{endDate}</div>
                      </li>
                    );
                  })}
                </ul>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1">
            <li className="p-1 grid grid-cols-5 border-b">
              <div className="col-span-1">시험</div>
              <div className="col-span-2 text-right">접수시작</div>
              <div className="col-span-2 text-right">접수마감</div>
            </li>
            {schedule.map((item) => {
              const _title = item.TITLE.split(" ");
              const title = `${_title[2]} ${_title[3]}`;
              const startDate = item.REGISTER_START_DATE.substring(0, 10);
              const endDate = item.REGISTER_END_DATE.substring(0, 10);
              return (
                <li
                  key={`schedule-${item.ID}`}
                  className="py-0.5 px-1 grid grid-cols-5 hover:bg-secondary rounded duration-150"
                >
                  <div className="col-span-1">{title}</div>
                  <div className="col-span-2 text-right">{startDate}</div>
                  <div className="col-span-2 text-right">{endDate}</div>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
      <button
        className="h-full col-span-1 border rounded-lg flex items-center justify-center gap-5 cursor-pointer hover:bg-secondary duration-150 font-medium text-xl"
        onClick={getRandomTest}
      >
        <HandPlatter size={48} className="text-yellow-500" />
        랜덤 회차 풀기
      </button>
    </section>
  );
};
