import type { Metadata } from "next";
import { Fraunces, Geist } from "next/font/google";

import { ProfileProvider } from "@/components/profile-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Beside — someone to work beside in NYC",
    template: "%s · Beside",
  },
  description:
    "In-person matching for sustained, focused work in NYC. Tell us what you’re working toward, how you work, and when. We find the person, the schedule, and the place.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ProfileProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </ProfileProvider>
      </body>
    </html>
  );
}
