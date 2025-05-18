import { Topnav } from "@/components/nav/top-nav";
import { Footer } from "@/components/nav/footer";
import { DarkModeToggle } from "@/components/dark-theme/mode-toggle";

const defaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Topnav />
      {children}
      <DarkModeToggle />
      <Footer />
    </>
  );
};

export default defaultLayout;
