import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/_styles/globals.css";

import { APP_NAME } from "@/lib/constants";
import { APP_DESCRIPTION } from "@/lib/constants";
import { ThemeProvider } from "./context/ThemeProvider";
import { SessionProvider } from "./context/SessionProvider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: `Welcome | ${APP_NAME}`,
  },
  description: `${APP_DESCRIPTION}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster position="bottom-right" richColors expand={true} />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
