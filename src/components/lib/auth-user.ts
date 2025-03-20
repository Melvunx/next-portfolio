import { getRequiredUser } from "./auth-session";
import { prisma } from "./prisma";

export async function verifyEmailUser(userId: string) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
        emailVerified: false,
      },
      data: {
        emailVerified: true,
      },
    });

    return updatedUser;
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de la mise à jour du compte");
  }
}

export const verifyUserRole = async () => {
  const user = await getRequiredUser();

  const account = await prisma.account.findFirstOrThrow({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      userId: true,
      roleId: true,
    },
  });

  if (!account.roleId) {
    const accountUpdated = await prisma.account.update({
      where: {
        id: account.id,
      },
      data: {
        roleId: process.env.ROLE_ID,
      },
      select: {
        id: true,
        userId: true,
        roleId: true,
      },
    });

    if (process.env.NODE_ENV === "development")
      console.log("account updated", accountUpdated);
  }

  console.log("Verification completed !");
};
