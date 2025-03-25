import { adminVerification } from "@/components/lib/auth-user";
import { unauthorized } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const isAdmin = adminVerification();

  if (!isAdmin) unauthorized();

  return <section>{children}</section>;
}
