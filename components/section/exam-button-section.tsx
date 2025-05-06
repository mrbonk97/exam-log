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
  homepage: string;
  homepageUrl: string;
  homepageImgUrl: string;
  schedule: ExamType[];
  examList: ExamType[];
}

export const ExamButtonSection = ({
  homepage,
  homepageUrl,
  homepageImgUrl,
  schedule,
  examList,
}: Props) => {
  const router = useRouter();
  const getRandomTest = () => {
    const randomIdx = Math.floor(Math.random() * examList.length);
    router.push(`/exams/${examList[randomIdx].ID}`);
  };

  return (
    <section className="p-5 mx-auto max-w-7xl grid grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 border-b">
      <Link href={homepageUrl} className="h-full col-span-1">
        <Card className="h-full shadow-none cursor-pointer duration-150 hover:bg-secondary">
          <CardHeader>
            <CardTitle>접수 홈페이지</CardTitle>
          </CardHeader>
          <CardContent className="h-full flex items-center justify-center">
            <Image
              src={homepageImgUrl}
              alt={homepage}
              height={96}
              width={96}
              className="h-12 lg:h-auto"
            />
          </CardContent>
        </Card>
      </Link>
      <Card
        role="button"
        onClick={getRandomTest}
        className="lg:hidden col-span-1 shadow-none cursor-pointer duration-150 hover:bg-secondary"
      >
        <CardHeader>
          <CardTitle>랜덤회차 도전</CardTitle>
        </CardHeader>
        <CardContent className="h-full flex items-center justify-center">
          <HandPlatter size={64} className="h-12 lg:h-auto text-yellow-500" />
        </CardContent>
      </Card>
      <Card className="col-span-2 lg:col-span-1 shadow-none">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <h5>시험 일정</h5>
            <Dialog>
              <DialogTrigger>상세일정</DialogTrigger>
              <DialogContent className="lg:min-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">시험 상세 일정</DialogTitle>
                </DialogHeader>
                <ul className="text-xs lg:text-base space-y-1 overflow-x-auto">
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
          <ul className="space-y-1 text-sm lg:text-base">
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
      <Card
        role="button"
        onClick={getRandomTest}
        className="hidden lg:block col-span-1 shadow-none cursor-pointer duration-150 hover:bg-secondary"
      >
        <CardHeader>
          <CardTitle>랜덤회차 도전</CardTitle>
        </CardHeader>
        <CardContent className="h-full flex items-center justify-center">
          <HandPlatter size={64} className="text-yellow-500 mx-auto" />
        </CardContent>
      </Card>
    </section>
  );
};
