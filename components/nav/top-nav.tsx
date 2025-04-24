import { Logo } from "../logo";
import { MenuList } from "./meu-list";
import { ProfileButton } from "./profile-button";

export const Topnav = () => {
  return (
    <nav className="fixed top-0 left-0 py-2 px-[5%] h-14 w-full border-b flex items-center justify-between">
      <Logo />
      <MenuList />
      <ProfileButton />
    </nav>
  );
};
