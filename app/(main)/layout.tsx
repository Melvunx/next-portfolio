import { AuthButton } from "@/components/AuthButton";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@components/layout/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex justify-around">
        <AuthButton />
        <Navbar />
      </div>
      {children}
      <Footer />
    </>
  );
}
