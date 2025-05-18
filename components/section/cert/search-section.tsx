"use client";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

interface Props {
  defaultValue?: string;
}

export const SearchSection = ({ defaultValue }: Props) => {
  const router = useRouter();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = formData.get("q")?.toString();
    if (!q || q.length == 0) router.push("/certs");
    else router.push(`/certs?q=${q}`);
  };

  return (
    <section className="p-5">
      <form onSubmit={handleSubmit} className="h-14 relative">
        <Input
          name="q"
          className="pl-14 pr-2 h-full"
          placeholder="자격증을 검색하세요"
          defaultValue={defaultValue}
        />
        <Button
          type="submit"
          variant={"secondary"}
          className="absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer"
        >
          <SearchIcon />
        </Button>
      </form>
    </section>
  );
};
