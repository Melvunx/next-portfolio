import { DropdownProfile } from "@/components/DropdownProfile";
import { LoginButton } from "@/components/LoginButton";
import { authUser } from "./lib/auth-session";

export const AuthButton = async () => {
  const user = await authUser();

  if (!user) {
    return <LoginButton />;
  }

  return <DropdownProfile user={user} />;
};
