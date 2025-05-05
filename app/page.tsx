import CertPage from "./certs/page";

export const dynamic = "force-dynamic";

export default function Home() {
  return <CertPage searchParams={Promise.resolve({ q: undefined })} />;
}
