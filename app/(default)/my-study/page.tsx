import { verifyJwt } from "@/lib/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ProfileSection } from "@/components/section/my-study/profile-section";
import { ActivitySection } from "@/components/section/my-study/activity-section";
import { DangerSection } from "@/components/section/my-study/danger-section";
import { MyCertSection } from "@/components/section/my-study/my-cert-section";

const MyStudyPage = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");
  if (!accessToken) redirect("/sign-in");

  const userId = verifyJwt(accessToken.value);

  return (
    <main className="pt-14 mx-auto max-w-7xl">
      <ProfileSection userId={userId} />
      <ActivitySection userId={userId} />
      <MyCertSection userId={userId} />
      <DangerSection />
    </main>
  );
};

export default MyStudyPage;
