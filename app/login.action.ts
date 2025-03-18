import { auth } from "@lib/auth";

export type Provider = "github" | "google";

export const ProviderLoginAction = async (provider: Provider) => {
  await auth.api.signInSocial({
    body: {
      provider,
    },
  });
};
