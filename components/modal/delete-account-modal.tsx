"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangleIcon, BadgeAlert } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";

export const DeleteAccountModal = () => {
  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch(`/api/users`, { method: "DELETE", credentials: "include" });
    if (res.ok) router.push("/");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"} className="py-6 justify-start max-w-96 w-full">
          <BadgeAlert strokeWidth={3} className="h-20 w-20" />
          회원탈퇴
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:min-w-2xl">
        <DialogHeader>
          <DialogTitle>회원 탈퇴</DialogTitle>
          <DialogDescription>
            회원 탈퇴 시, 모든 데이터가 즉시 삭제되며, 복구가 불가능합니다.
          </DialogDescription>
        </DialogHeader>
        <AlertTriangleIcon className="mt-10 mb-5 mx-auto text-destructive" size={64} />
        <DialogFooter>
          <Button asChild>
            <DialogClose>취소</DialogClose>
          </Button>
          <Button variant={"destructive"} onClick={handleDelete}>
            회원 탈퇴
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
