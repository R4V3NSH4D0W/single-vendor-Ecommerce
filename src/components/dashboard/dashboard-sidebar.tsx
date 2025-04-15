import { PanelLeft } from "lucide-react";
import React from "react";

function DashBoardSideBar() {
  return (
    <aside className=" min-w-[250px] bg-primary/10 p-4">
      <div className=" flex flex-row justify-between items-center">
        <h1 className=" font-bold text-lg uppercase inline-block">luxstore</h1>
        <PanelLeft size={18} />
      </div>
    </aside>
  );
}

export default DashBoardSideBar;
