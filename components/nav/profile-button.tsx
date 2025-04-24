import Link from "next/link";
import { Button } from "../ui/button";
import { LogInIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const ProfileButton = () => {
  const isLoggedIn = true;

  if (!isLoggedIn)
    return (
      <Button asChild>
        <Link href={"/sign-in"}>
          로그인 <LogInIcon />
        </Link>
      </Button>
    );

  return (
    <Avatar>
      <AvatarImage src="/morty.jpg" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};
