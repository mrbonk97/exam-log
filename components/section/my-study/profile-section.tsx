import Image from "next/image";
import { getUserById } from "@/actions/user-action";

interface Props {
  userId: number;
}

export const ProfileSection = async ({ userId }: Props) => {
  const userInfo = await getUserById(userId);

  return (
    <header className="p-5">
      <div className="p-5 flex gap-5 md:gap-10 rounded-2xl bg-secondary relative">
        <Image
          src={userInfo.PROFILE_IMAGE}
          alt={userInfo.NAME}
          height={128}
          width={128}
          className="rounded-full"
        />
        <hgroup>
          <h2 className="text-lg md:text-2xl font-semibold">{userInfo.NAME}</h2>
          <p className="md:mt-1 text-xs md:text-sm font-medium opacity-70">
            가입방식: {userInfo.AUTH_PROVIDER}
          </p>
          <p className="text-xs md:text-sm font-medium opacity-70">
            가입일: {userInfo.CREATED_AT.toLocaleDateString()}
          </p>
        </hgroup>
        <h1 className="absolute bottom-3 md:bottom-5 right-5 text-sm md:text-base font-semibold opacity-80">
          나의 공부
        </h1>
      </div>
    </header>
  );
};
