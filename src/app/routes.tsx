import { createBrowserRouter, Outlet } from "react-router";
import { Shell } from "./components/shell";
import { ScenarioLanding } from "./pages/scenario-landing";
import { ControlRoom } from "./pages/control-room";
import { BusinessInsights } from "./pages/business-insights";
import { MarketIntelligence } from "./pages/market-intelligence";
import { Training } from "./pages/training";
import { Funding } from "./pages/funding";
import { Documents } from "./pages/documents";
import { Settings } from "./pages/settings";
import { DfiDashboard } from "./pages/dfi-dashboard";
import { DfiLayout } from "./components/dfi-layout";
import { SmePortfolio } from "./pages/sme-portfolio";
import { ReadinessRisk } from "./pages/readiness-risk";
import { TechnicalAssistance } from "./pages/technical-assistance";
import { FundingPathways } from "./pages/funding-pathways";
import { ImpactInclusion } from "./pages/impact-inclusion";
import { Reports } from "./pages/reports";
import { DfiSettings } from "./pages/dfi-settings";

function ProtectedLayout() {
  return (
    <Shell>
      <Outlet />
    </Shell>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, Component: ScenarioLanding },
      {
        path: "dfi-dashboard",
        Component: DfiLayout,
        children: [
          { index: true, Component: DfiDashboard },
          { path: "sme-portfolio", Component: SmePortfolio },
          { path: "readiness-risk", Component: ReadinessRisk },
          { path: "technical-assistance", Component: TechnicalAssistance },
          { path: "funding-pathways", Component: FundingPathways },
          { path: "impact-inclusion", Component: ImpactInclusion },
          { path: "reports", Component: Reports },
          { path: "settings", Component: DfiSettings },
        ],
      },
      {
        Component: ProtectedLayout,
        children: [
          { path: "control-room", Component: ControlRoom },
          { path: "business-insights", Component: BusinessInsights },
          { path: "market-intelligence", Component: MarketIntelligence },
          { path: "training", Component: Training },
          { path: "funding", Component: Funding },
          { path: "documents", Component: Documents },
          { path: "settings", Component: Settings },
        ],
      },
    ],
  },
]);