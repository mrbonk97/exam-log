"use client";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";

interface Props {
  examId: string;
  defaultFavorite: boolean;
  isLoggedIn: boolean;
}

export const AddFavoriteButton = ({ examId, defaultFavorite, isLoggedIn }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(defaultFavorite);

  const handleClick = async () => {
    setIsLoading(true);

    const res = await fetch(`/api/certs/${examId}/favorite`, {
      credentials: "include",
      method: isFavorite ? "DELETE" : "POST",
    });

    if (res.ok) setIsFavorite((cur) => !cur);
    setIsLoading(false);
  };

  if (!isLoggedIn)
    return (
      <Link
        className={
          "h-10 w-10 sm:w-36 flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-background hover:opacity-80 duration-150"
        }
        href={"/sign-in"}
      >
        <span className="hidden sm:inline"> 즐겨찾기 추가</span>
        <span className="text-yellow-400">★</span>
      </Link>
    );
  return (
    <button
      disabled={isLoading}
      onClick={handleClick}
      className={`h-10 w-10 sm:w-36 flex items-center justify-center gap-2 rounded-md text-sm font-medium
        ${isFavorite ? "bg-primary" : "bg-background"}
        ${isFavorite ? "text-primary-foreground" : ""}
         hover:opacity-80 disabled:opacity-80 duration-150`}
    >
      {isLoading && <LoaderCircle className="animate-spin" />}
      {!isLoading && (
        <>
          <span className="hidden sm:inline">{isFavorite ? "즐겨찾기 삭제" : "즐겨찾기 추가"}</span>
          <span className="text-yellow-400">★</span>
        </>
      )}
    </button>
  );
};
