import { DeleteAccountModal } from "@/components/modal/delete-account-modal";

export const DangerSection = () => {
  return (
    <section className="p-5">
      <div className="border-t" />
      <h2 className="my-5 text-lg md:text-xl font-semibold">회원 탈퇴</h2>
      <DeleteAccountModal />
    </section>
  );
};
