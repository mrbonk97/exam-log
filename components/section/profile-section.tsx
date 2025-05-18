import Image from "next/image";
import { getUserById } from "@/actions/user-action";

interface Props {
  userId: number;
}

export const ProfileSection = async ({ userId }: Props) => {
  const userInfo = await getUserById(userId);

  return (
    <header className="mt-5 p-5 rounded-2xl flex justify-between gap-5 bg-secondary">
      <div className="flex gap-10">
        <Image
          src={userInfo.PROFILE_IMAGE}
          alt="morty"
          height={128}
          width={128}
          className="rounded-full"
        />
        <hgroup>
          <h2 className="text-4xl font-semibold">{userInfo.NAME}</h2>
          <p className="mt-1 text-sm font-medium opacity-80">가입방식: {userInfo.AUTH_PROVIDER}</p>
          <p className="text-sm font-medium opacity-80">
            가입일: {userInfo.CREATED_AT.toLocaleDateString()}
          </p>
        </hgroup>
      </div>
      <h1 className="mt-auto font-semibold text-right opacity-80">나의 공부</h1>
    </header>
  );
};
