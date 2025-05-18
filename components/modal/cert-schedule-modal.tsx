import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ExamType } from "@/lib/types";

interface Props {
  schedules: ExamType[];
}

export const CertScheduleModal = ({ schedules }: Props) => {
  return (
    <Dialog>
      <DialogTrigger className="underline underline-offset">상세보기</DialogTrigger>
      <DialogContent className="lg:min-w-2xl">
        <DialogHeader>
          <DialogTitle>시험 상세 일정</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>시험</TableHead>
              <TableHead className="text-right">접수시작</TableHead>
              <TableHead className="text-right">접수마감</TableHead>
              <TableHead className="text-right">시험시작</TableHead>
              <TableHead className="text-right">시험종료</TableHead>
              <TableHead className="text-right">결과발표</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedules.map((item) => (
              <TableRow key={`schedule-modal-${item.ID}`}>
                <TableCell>{item.TITLE.substring(item.TITLE.indexOf(" ", 0))}</TableCell>
                <TableCell className="text-right">
                  {item.REGISTER_START_DATE.toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  {item.REGISTER_END_DATE.toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  {item.EXAM_START_DATE.toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  {item.EXAM_END_DATE.toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  {item.RESULT_DATE.toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <DialogFooter>
          <Button asChild>
            <DialogClose>닫기</DialogClose>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
