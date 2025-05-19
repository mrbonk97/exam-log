"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Props {
  examId: string;
  defaultFavorite: boolean;
}

export const AddFavoriteButton = ({ examId, defaultFavorite }: Props) => {
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

  return (
    <Button
      disabled={isLoading}
      onClick={handleClick}
      variant={isFavorite ? "default" : "outline"}
      className="py-0 sm:py-5 h-9 w-9 sm:w-auto"
    >
      <span className="hidden sm:inline">즐겨찾기 {isFavorite ? "해제" : "추가"}</span>
      <span className="text-yellow-400">★</span>
    </Button>
  );
};
