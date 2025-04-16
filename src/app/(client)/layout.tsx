import Footer from "@/components/footer";
import Navbar from "@/components/nav-bar";
import { ReduxProvider } from "@/provider/redux-provider";
import React from "react";
interface ClientLayoutProps {
  children: React.ReactNode;
}

function clientLayout({ children }: ClientLayoutProps) {
  return (
    <ReduxProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </ReduxProvider>
  );
}

export default clientLayout;
