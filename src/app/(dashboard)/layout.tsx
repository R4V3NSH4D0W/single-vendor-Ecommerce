import DashBoardNavBar from "@/features/dashboard/components/dashboard-navbar";
import React from "react";

interface DashBoardLayoutProps {
  children: React.ReactNode;
}
function DashBoardLayout({ children }: DashBoardLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <DashBoardNavBar />
        {children}
      </main>
    </div>
  );
}

export default DashBoardLayout;
