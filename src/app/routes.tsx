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
import { FspLayout } from "./components/fsp-layout";
import { FspDashboard } from "./pages/fsp-dashboard";
import { FspLendingBook } from "./pages/fsp-lending-book";
import { FspCreditRisk } from "./pages/fsp-credit-risk";
import { FspLoanProducts } from "./pages/fsp-loan-products";
import { FspAllyraIntelligence } from "./pages/fsp-allyra-intelligence";
import { FspReports } from "./pages/fsp-reports";
import { FspSettings } from "./pages/fsp-settings";
import { EsdLayout } from "./components/esd-layout";
import { EsdDashboard } from "./pages/esd-dashboard";
import { EsdSmePortfolio } from "./pages/esd-sme-portfolio";
import { EsdCompliance } from "./pages/esd-compliance";
import { EsdProcurement } from "./pages/esd-procurement";
import { EsdImpact } from "./pages/esd-impact";
import { EsdReports } from "./pages/esd-reports";
import { EsdSettings } from "./pages/esd-settings";

function ProtectedLayout() {
  return (
    <Shell>
      <Outlet />
    </Shell>
  );
}

const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

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
        path: "fsp-dashboard",
        Component: FspLayout,
        children: [
          { index: true, Component: FspDashboard },
          { path: "lending-book", Component: FspLendingBook },
          { path: "credit-risk", Component: FspCreditRisk },
          { path: "loan-products", Component: FspLoanProducts },
          { path: "allyra-intelligence", Component: FspAllyraIntelligence },
          { path: "reports", Component: FspReports },
          { path: "settings", Component: FspSettings },
        ],
      },
      {
        path: "esd-dashboard",
        Component: EsdLayout,
        children: [
          { index: true, Component: EsdDashboard },
          { path: "sme-portfolio", Component: EsdSmePortfolio },
          { path: "compliance", Component: EsdCompliance },
          { path: "procurement", Component: EsdProcurement },
          { path: "impact", Component: EsdImpact },
          { path: "reports", Component: EsdReports },
          { path: "settings", Component: EsdSettings },
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
], { basename });