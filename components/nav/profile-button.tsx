"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { LogInIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useEffect, useState } from "react";
import { UserType } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const ProfileButton = () => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const f = async () => {
      const res = await fetch("/api/users/me", {
        credentials: "include",
      }).then((r) => r.json());

      if (res.code == "success")
        setUser({
          name: res.data.NAME,
          profileImage: res.data.PROFILE_IMAGE,
        });
    };

    f();
  }, []);

  const signOut = async () => {
    const res = await fetch("/api/sign-out", {
      credentials: "include",
    }).then((r) => r.json());
    if (res.code == "success") setUser(null);
  };

  if (!user)
    return (
      <Button asChild>
        <Link href={"/sign-in"}>
          로그인 <LogInIcon />
        </Link>
      </Button>
    );

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user.profileImage} />
          <AvatarFallback>{user.name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href={"/profile"}>프로필</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut} className="cursor-pointer" role="button">
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
