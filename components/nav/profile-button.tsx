import Link from "next/link";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { verifyJwt } from "@/lib/jwt";
import { getUserById } from "@/actions/user-action";
import { errorFactory } from "@/lib/el-error";

export const ProfileButton = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token");
    if (!accessToken) throw errorFactory("ERROR_01");

    const userId = verifyJwt(accessToken.value);
    const userInfo = await getUserById(userId);

    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <Avatar className="cursor-pointer">
            <AvatarImage src={userInfo.PROFILE_IMAGE} />
            <AvatarFallback>{userInfo.NAME}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{userInfo.NAME}</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href={"/profile"}>프로필</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href={"/api/sign-out"}>로그아웃</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } catch {
    return (
      <Button asChild>
        <Link href={"/sign-in"}>
          <span className="hidden sm:inline">로그인</span> <LogInIcon />
        </Link>
      </Button>
    );
  }
};
