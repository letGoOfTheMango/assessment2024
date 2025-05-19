"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import TabButton from "@tabs/TabButton";

// * didnt know about this and its implementation
const FinanceTab = dynamic(() => import("@tabs/FinanceTab"), {
  ssr: false,
});
const PlanningTab = dynamic(() => import("@tabs/PlanningTab"), {
  ssr: false,
});

type Tab = "finance" | "planning";

const Tabs: React.FC = () => {

  const [activeTab, setActiveTab] = useState<Tab>("planning");

  const tabChangeHandler = (value: Tab) => {
    if (value === activeTab) return;
    console.log(value);
    setActiveTab(value);
  };

  return (
    <div>
      <nav
        role="tablist"
        aria-label="Maskenteile"
        id="buttonWrapper"
        className="flex justify-center gap-4"
      >
        <TabButton
          text="Finanzierung"
          active={activeTab === "finance"}
          onClick={() => tabChangeHandler("finance")}
        />
        <TabButton
          text="Aufgabenplanung"
          active={activeTab === "planning"}
          onClick={() => tabChangeHandler("planning")}
        />
      </nav>
      <div role="tabpanel">
        {activeTab === "finance" ? <FinanceTab /> : <PlanningTab />} {/* * abgecheckt ob ternary oder &&  aber nachdems nur 2 sind */}
      </div>
    </div>
  );
};
export default Tabs;
