import { authUser } from "@/components/lib/auth-session";
import { verifyUserRole } from "@/components/lib/auth-user";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const checkUserRole = async () => {
  const user = await authUser();

  if (user) {
    verifyUserRole();
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Verify if the user role is completed
  checkUserRole();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="cupcake"
          themes={["cupcake", "forest"]}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
