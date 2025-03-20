import { DropdownProfile } from "@/components/DropdownProfile";
import { LoginButton } from "@/components/LoginButton";
import { authUser } from "./lib/auth-session";
import { verifyEmailUser } from "./lib/auth-user";

export const AuthButton = async () => {
  const user = await authUser();

  if (!user) {
    return <LoginButton />;
  }

  if (!user.emailVerified) {
    const updatedUser = await verifyEmailUser(user.id);

    // Update the user in the navbar
    return <DropdownProfile user={updatedUser} />;
  }

  return <DropdownProfile user={user} />;
};
