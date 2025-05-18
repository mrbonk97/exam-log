import { Topnav } from "@/components/nav/top-nav";
import { Footer } from "@/components/nav/footer";

const defaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Topnav />
      {children}
      <Footer />
    </>
  );
};

export default defaultLayout;
