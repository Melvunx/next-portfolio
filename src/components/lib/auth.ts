import { Account } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "./prisma";

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  CLIENT_GITHUB_ID,
  CLIENT_GITHUB_SECRET,
  ROLE_ID,
} = process.env;

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
    onBeforeCreateAccount: async (account: Account) => {
      return {
        ...account,
        role_id: ROLE_ID as string,
      };
  },
}),
  socialProviders: {
    google: {
      clientId: GOOGLE_CLIENT_ID as string,
      clientSecret: GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: CLIENT_GITHUB_ID as string,
      clientSecret: CLIENT_GITHUB_SECRET as string,
    },
  },
  plugins: [nextCookies()],
});
