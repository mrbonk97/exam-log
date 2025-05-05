"use client";
import { DotIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Props {
  title: string;
}

export const SubjectHeader = ({ title }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const handleScroll = () => {
      const stickyOffset = ref.current!.offsetTop;
      setIsSticky(stickyOffset > 236);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={ref}
      className={`py-5 sticky top-14 col-span-2 border-b duration-500
      ${isSticky ? "bg-secondary" : "bg-background"}`}
    >
      <h4 className="mx-auto max-w-7xl text-xl font-bold opacity-80">
        <DotIcon className="inline mb-1" />
        {title}
      </h4>
    </header>
  );
};
