// import DashBoardSideBar from "@/components/dashboard/dashboard-sidebar";
import QueryProvider from "@/provider/query-provider";
import React from "react";

interface DashBoardLayoutProps {
  children: React.ReactNode;
}
function DashBoardLayout({ children }: DashBoardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* <DashBoardSideBar /> */}
      <QueryProvider>
        <main className="flex-1">{children}</main>
      </QueryProvider>
    </div>
  );
}

export default DashBoardLayout;
