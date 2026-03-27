import Footer from "@/components/Footer";
import Header from "@/components/shared/header/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HOME",
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1 wrapper">{children}</main>
      <Footer />
    </div>
  );
}
