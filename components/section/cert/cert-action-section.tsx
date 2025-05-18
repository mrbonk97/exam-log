import Link from "next/link";
import Image from "next/image";
import { ExamType } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Shuffle } from "lucide-react";
import { CertScheduleModal } from "@/components/modal/cert-schedule-modal";

interface Props {
  description: string;
  homepage: string;
  homepageUrl: string;
  homepageImgUrl: string;
  schedule: ExamType[];
  examList: ExamType[];
}

export const CertActionSection = ({
  homepage,
  description,
  homepageUrl,
  homepageImgUrl,
  schedule,
  examList,
}: Props) => {
  const randomIdx = Math.floor(Math.random() * examList.length);

  return (
    <section className="p-5 mx-auto max-w-7xl">
      <p className="pb-5 text-sm md:text-base break-keep text-center border-b">{description}</p>
      <div className="mt-5 grid grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10">
        <Link href={homepageUrl} className="p-5 hidden lg:block col-span-1 border rounded-xl group">
          <p className="pb-2 border-b">접수 홈페이지</p>
          <Image
            src={homepageImgUrl}
            alt={homepage}
            height={96}
            width={96}
            className="my-5 mx-auto h-20"
          />
          <p className="text-center group-hover:underline underline-offset-2">{homepage}</p>
        </Link>
        <div className="p-5 col-span-2 lg:col-span-1 border rounded-xl">
          <div className="pb-2 border-b flex justify-between gap-5">
            <span>시험 일정</span>
            <CertScheduleModal schedules={schedule} />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>시험</TableHead>
                <TableHead className="text-right">접수시작</TableHead>
                <TableHead className="text-right">접수마감</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedule.map((item) => (
                <TableRow key={`schedule-${item.ID}`}>
                  <TableCell>{item.TITLE.substring(item.TITLE.indexOf(" ", 0))}</TableCell>
                  <TableCell className="text-right">
                    {item.REGISTER_START_DATE.toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.REGISTER_END_DATE.toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Link href={homepageUrl} className="p-5 lg:hidden col-span-1 border rounded-xl group">
          <p className="pb-2 border-b">접수 홈페이지</p>
          <Image
            src={homepageImgUrl}
            alt={homepage}
            height={96}
            width={96}
            className="my-5 mx-auto h-20"
          />
          <p className="text-center group-hover:underline underline-offset-2">{homepage}</p>
        </Link>
        <Link
          href={`/exams/${examList[randomIdx].ID}`}
          className="p-5 col-span-1 border rounded-xl group"
        >
          <p className="pb-2 border-b">랜덤회차</p>
          <Shuffle size={48} className="my-5 mx-auto h-20 text-purple-400" />
          <p className="text-center group-hover:underline underline-offset-2">랜덤회차 도전</p>
        </Link>
      </div>
    </section>
  );
};
