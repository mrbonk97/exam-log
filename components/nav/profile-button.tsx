import Link from "next/link";
import { cookies } from "next/headers";
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
        <DropdownMenuTrigger className="ml-auto sm:ml-0">
          <Avatar>
            <AvatarImage src={userInfo.PROFILE_IMAGE} />
            <AvatarFallback>{userInfo.NAME}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{userInfo.NAME}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={"/my-study"} className="w-full cursor-pointer">
              프로필
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <form action={"/api/sign-out"} className="w-full">
              <button className="h-full w-full cursor-pointer text-left" type="submit">
                로그아웃
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } catch {
    return (
      <Link
        href={"/sign-in"}
        className="ml-auto sm:ml-0 sm:px-4 sm:py-2 flex items-center gap-2 rounded-md transition-all sm:bg-primary sm:text-primary-foreground shadow-xs hover:bg-primary/90"
      >
        <span className="hidden sm:block text-sm font-medium">로그인</span> <LogInIcon size={20} />
      </Link>
    );
  }
};
