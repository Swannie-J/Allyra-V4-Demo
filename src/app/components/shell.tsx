import { useState } from "react";
import { ProductHeader } from "./product-header";
import { BusinessContextStrip } from "./business-context-strip";
import { LeftSidebar } from "./left-sidebar";
import { useChatContext } from "./chat-context";

interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const { businessProfile, journeyStage } = useChatContext();

  // Show "Learning about your business" until analysis is complete (journeyStage < 3)
  // journeyStage 3 = after analysis, before insights
  const showBusinessDetails = journeyStage >= 3;

  return (
    <div className="h-screen w-full flex flex-col bg-white overflow-hidden">
      {/* Product Header */}
      <ProductHeader />

      {/* Business Context Strip */}
      <BusinessContextStrip
        isOnboarding={!businessProfile}
        profile={businessProfile}
        showBusinessDetails={showBusinessDetails}
      />

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <LeftSidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}