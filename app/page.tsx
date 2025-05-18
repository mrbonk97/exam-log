import { Topnav } from "@/components/nav/top-nav";
import { Footer } from "@/components/nav/footer";
import CertPage from "@/app/(default)/certs/page";
import { DarkModeToggle } from "@/components/dark-theme/mode-toggle";

const HomePage = () => {
  return (
    <>
      <Topnav />
      <CertPage searchParams={Promise.resolve({ q: undefined })} />
      <DarkModeToggle />
      <Footer />
    </>
  );
};

export default HomePage;
