import type { Metadata } from "next";
import Navigation from "@/components/global/Navigation";
import NavigationFooter from "@/components/global/NavigationFooter";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import NavigationBeforeAuth from "@/components/global/NavigationBeforeAuth";

export const metadata: Metadata = {
  title: {
    template: "%s | My Body Buddy",
    default: "My Body Buddy",
  },
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <link rel="icon" href="/favicon.ico" />
        <body>
          <header>
            <SignedOut>
              <NavigationBeforeAuth />
            </SignedOut>
            <SignedIn>
              <Navigation />
            </SignedIn>
          </header>

          <main className="pt-16 pb-20 main-content">{children}</main>

          <SignedIn>
            <NavigationFooter />
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
