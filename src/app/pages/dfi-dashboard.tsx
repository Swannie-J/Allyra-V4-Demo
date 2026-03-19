import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  ArrowLeft, Search, SlidersHorizontal, Download, Calendar,
  Users, ShieldCheck, Wrench, TrendingUp, AlertTriangle, Briefcase,
  LayoutDashboard, FolderOpen, Shield, BookOpen, Landmark, BarChart3,
  FileText, Settings, Sparkles, ChevronRight, ArrowUpRight, ArrowDownRight,
  Target, DollarSign, MapPin, Clock, UserCheck,
} from "lucide-react";
import logo from "../../assets/365cd6f2dd45be695d6550c45d6280e22785450e.png";
import { SMEDetailDrawer } from "../components/sme-detail-drawer";
import { ImpactMetricsModal } from "../components/impact-metrics-modal";

// ─── DATA ────────────────────────────────────────────────────────────────────

const SUMMARY_CARDS = [
  { label: "Total SMEs", value: "200", sub: "in portfolio", icon: Users, color: "#2d6a4f", bg: "#f0faf4", border: "#c6e9d4", trend: "+12", trendUp: true },
  { label: "Finance-Ready", value: "47", sub: "SMEs", icon: ShieldCheck, color: "#0f766e", bg: "#f0fdfa", border: "#99f6e4", trend: "+8", trendUp: true },
  { label: "Require TA", value: "68", sub: "SMEs", icon: Wrench, color: "#d97706", bg: "#fffbeb", border: "#fde68a", trend: "-3", trendUp: false },
  { label: "Active Pipeline", value: "34", sub: "in funding", icon: TrendingUp, color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe", trend: "+5", trendUp: true },
  { label: "Elevated Risk", value: "19", sub: "signals", icon: AlertTriangle, color: "#dc2626", bg: "#fef2f2", border: "#fecaca", trend: "+2", trendUp: true },
  { label: "Jobs Supported", value: "3,420", sub: "across portfolio", icon: Briefcase, color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe", trend: "+340", trendUp: true },
];

const SECTOR_DATA = [
  { id: "sector-1", name: "Agri-processing", value: 42 },
  { id: "sector-2", name: "Manufacturing", value: 35 },
  { id: "sector-3", name: "Retail", value: 38 },
  { id: "sector-4", name: "Services", value: 32 },
  { id: "sector-5", name: "Logistics", value: 28 },
  { id: "sector-6", name: "Energy", value: 25 },
];

const GEO_DATA = [
  { id: "geo-1", name: "South Africa", value: 68 },
  { id: "geo-2", name: "Kenya", value: 42 },
  { id: "geo-3", name: "Nigeria", value: 35 },
  { id: "geo-4", name: "Ghana", value: 22 },
  { id: "geo-5", name: "Tanzania", value: 18 },
  { id: "geo-6", name: "Rwanda", value: 15 },
];

const SECONDARY_INDICATORS = [
  { label: "Export vs Domestic", values: ["38% Export", "62% Domestic"] },
  { label: "Business Age", values: ["<2yr: 24%", "2-5yr: 41%", "5yr+: 35%"] },
  { label: "Urban vs Rural", values: ["72% Urban", "28% Rural"] },
  { label: "Supply-Chain", values: ["56% Participating"] },
];

const STAGES = [
  { label: "Early Stage", count: 52, pct: 26, color: "#f59e0b" },
  { label: "Growth Stage", count: 58, pct: 29, color: "#2d6a4f" },
  { label: "Expansion", count: 43, pct: 21.5, color: "#1d4ed8" },
  { label: "Finance-Ready", count: 32, pct: 16, color: "#0f766e" },
  { label: "Post-Investment", count: 15, pct: 7.5, color: "#7c3aed" },
];

const FUNNEL = [
  { label: "Diagnosed", count: 200, pct: 100 },
  { label: "In Support", count: 142, pct: 71 },
  { label: "Investment-Ready", count: 78, pct: 39 },
  { label: "In Funding Process", count: 34, pct: 17 },
  { label: "Funded", count: 18, pct: 9 },
];

const CAPABILITY_PILLARS = [
  { label: "Strategy", score: 62, gaps: 48, color: "#2d6a4f" },
  { label: "Finance", score: 45, gaps: 72, color: "#dc2626" },
  { label: "Sales & Market Access", score: 54, gaps: 58, color: "#d97706" },
  { label: "Operations", score: 68, gaps: 38, color: "#1d4ed8" },
  { label: "HR / Workforce", score: 58, gaps: 44, color: "#7c3aed" },
];

const BOTTLENECKS = [
  { label: "Working capital pressure", count: 64, pct: 32 },
  { label: "Weak records & reporting", count: 56, pct: 28 },
  { label: "Market access constraints", count: 48, pct: 24 },
  { label: "Founder dependence", count: 42, pct: 21 },
  { label: "Operational capacity", count: 38, pct: 19 },
  { label: "Customer concentration", count: 32, pct: 16 },
];

const EARLY_WARNINGS = [
  { label: "Cash flow stress", severity: "high", count: 18 },
  { label: "Declining sales momentum", severity: "high", count: 14 },
  { label: "Execution delays", severity: "medium", count: 22 },
  { label: "Documentation gaps", severity: "medium", count: 28 },
  { label: "Margin pressure", severity: "low", count: 12 },
];

const TA_TYPES = [
  { type: "Financial Management", active: 28, planned: 12, completed: 18 },
  { type: "Market Access", active: 22, planned: 8, completed: 14 },
  { type: "Operations", active: 16, planned: 10, completed: 22 },
  { type: "Governance", active: 12, planned: 6, completed: 8 },
  { type: "Investment Readiness", active: 18, planned: 14, completed: 10 },
];

const IMPACT_METRICS = [
  { label: "Women-Led SMEs", value: "42%", count: 84, icon: UserCheck, color: "#e11d48" },
  { label: "Youth-Led SMEs", value: "28%", count: 56, icon: Users, color: "#7c3aed" },
  { label: "Underserved Regions", value: "35%", count: 70, icon: MapPin, color: "#d97706" },
  { label: "Avg Revenue Growth", value: "+18%", count: null, icon: TrendingUp, color: "#2d6a4f" },
  { label: "Avg Employment Growth", value: "+12%", count: null, icon: Briefcase, color: "#1d4ed8" },
];

const PRIORITY_SMES = [
  { name: "Tshwane Agri Co-op", country: "South Africa", sector: "Agri-processing", stage: "Growth", readiness: 78, bottleneck: "Working capital", support: "Financial Mgmt", pathway: "Debt facility", risk: "low" },
  { name: "Nairobi Fresh Foods", country: "Kenya", sector: "Agri-processing", stage: "Expansion", readiness: 82, bottleneck: "Market access", support: "Market Access", pathway: "Equity round", risk: "low" },
  { name: "Lagos Textiles Ltd", country: "Nigeria", sector: "Manufacturing", stage: "Growth", readiness: 55, bottleneck: "Weak reporting", support: "Financial Mgmt", pathway: "Grant + Debt", risk: "medium" },
  { name: "Accra Solar Systems", country: "Ghana", sector: "Energy", stage: "Early", readiness: 42, bottleneck: "Founder dependence", support: "Governance", pathway: "Pending", risk: "high" },
  { name: "Kigali Logistics Hub", country: "Rwanda", sector: "Logistics", stage: "Finance-Ready", readiness: 88, bottleneck: "Capacity scaling", support: "Operations", pathway: "DFI facility", risk: "low" },
  { name: "Dar Coffee Exports", country: "Tanzania", sector: "Agri-processing", stage: "Expansion", readiness: 71, bottleneck: "Documentation gaps", support: "Inv. Readiness", pathway: "Trade finance", risk: "medium" },
  { name: "Soweto Quick Serve", country: "South Africa", sector: "Retail", stage: "Growth", readiness: 63, bottleneck: "Cash flow stress", support: "Financial Mgmt", pathway: "Micro-loan", risk: "medium" },
  { name: "Mombasa Marine Svcs", country: "Kenya", sector: "Services", stage: "Early", readiness: 38, bottleneck: "Operational capacity", support: "Operations", pathway: "Pending", risk: "high" },
  { name: "Abuja Green Energy", country: "Nigeria", sector: "Energy", stage: "Growth", readiness: 67, bottleneck: "Market access", support: "Market Access", pathway: "Blended finance", risk: "low" },
  { name: "Cape Harvest Foods", country: "South Africa", sector: "Manufacturing", stage: "Finance-Ready", readiness: 85, bottleneck: "Customer concentration", support: "Market Access", pathway: "Equity round", risk: "low" },
];

const ALLYRA_SIGNALS = [
  "32 SMEs are commercially active but not yet finance-ready due to reporting gaps.",
  "Agri-processing shows the strongest near-term funding potential across the portfolio.",
  "Technical assistance demand is concentrated in working capital management and market access.",
  "12 SMEs have elevated execution risk and may need proactive intervention within 60 days.",
];

const SIDEBAR_NAV = [
  { label: "Portfolio Dashboard", icon: LayoutDashboard, active: true },
  { label: "SME Portfolio", icon: FolderOpen, active: false, path: "/sme-portfolio" },
  { label: "Readiness & Risk", icon: Shield, active: false, path: "/readiness-risk" },
  { label: "Technical Assistance", icon: Wrench, active: false, path: "/technical-assistance" },
  { label: "Funding Pathways", icon: DollarSign, active: false, path: "/funding-pathways" },
  { label: "Impact & Inclusion", icon: Target, active: false, path: "/impact-inclusion" },
  { label: "Reports", icon: FileText, active: false, path: "/reports" },
  { label: "Settings", icon: Settings, active: false, path: "/settings" },
];

const PIE_COLORS = ["#2d6a4f", "#0891b2", "#d97706", "#7c3aed", "#1d4ed8", "#dc2626"];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function riskColor(risk: string) {
  if (risk === "high") return { bg: "#fef2f2", text: "#dc2626", border: "#fecaca" };
  if (risk === "medium") return { bg: "#fffbeb", text: "#d97706", border: "#fde68a" };
  return { bg: "#f0faf4", text: "#2d6a4f", border: "#c6e9d4" };
}

function severityColor(sev: string) {
  if (sev === "high") return "#dc2626";
  if (sev === "medium") return "#d97706";
  return "#2d6a4f";
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export function DfiDashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSignals, setShowSignals] = useState(true);
  const [selectedSME, setSelectedSME] = useState<any>(null);
  const [impactMetric, setImpactMetric] = useState<any>(null);

  return (
    <>
      {/* ── Main Area ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* ── Top Bar ── */}
        <header className="bg-white border-b border-[var(--allyra-neutral-200)] px-5 py-3 flex items-center gap-4">
          {/* Mobile back */}
          <button
            onClick={() => navigate("/")}
            className="lg:hidden mr-1 text-[var(--allyra-neutral-500)]"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex-1 min-w-0">
            <h1 className="text-[18px] text-[var(--allyra-neutral-900)] truncate" style={{ fontWeight: 600 }}>
              Portfolio Dashboard
            </h1>
            <p className="text-[12px] text-[var(--allyra-neutral-500)]">
              Allyra-enabled SME portfolio overview
            </p>
          </div>

          {/* Controls */}
          <div className="hidden sm:flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--allyra-neutral-200)] text-[12px] text-[var(--allyra-neutral-600)] hover:bg-[var(--allyra-neutral-50)] transition-colors">
              <Calendar className="w-3.5 h-3.5" />
              Mar 2026
            </button>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--allyra-neutral-400)]" />
              <input
                type="text"
                placeholder="Search SMEs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-lg border border-[var(--allyra-neutral-200)] text-[12px] w-44 focus:outline-none focus:border-[#2d6a4f] transition-colors bg-white"
              />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--allyra-neutral-200)] text-[12px] text-[var(--allyra-neutral-600)] hover:bg-[var(--allyra-neutral-50)] transition-colors">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filters
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--allyra-neutral-200)] text-[12px] text-[var(--allyra-neutral-600)] hover:bg-[var(--allyra-neutral-50)] transition-colors">
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
          </div>

          {/* Institution badge */}
          <div className="hidden md:flex items-center gap-2 pl-3 border-l border-[var(--allyra-neutral-200)]">
            <div className="w-7 h-7 rounded-full bg-[#eff6ff] flex items-center justify-center">
              <Landmark className="w-3.5 h-3.5 text-[#1d4ed8]" strokeWidth={2} />
            </div>
            <div>
              <p className="text-[12px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 600 }}>Pan-African DFI</p>
              <p className="text-[10px] text-[var(--allyra-neutral-400)]">Portfolio Manager</p>
            </div>
          </div>
        </header>

        {/* ── Scrollable Content ── */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex">
            {/* Main Content */}
            <div className="flex-1 min-w-0 p-5 space-y-5">
              {/* Section 1: Executive Summary */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <SectionHeader title="Executive Summary" />
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
                  {SUMMARY_CARDS.map((card) => {
                    const Icon = card.icon;
                    const isNegativeSignal = card.label === "Elevated Risk" && card.trendUp;
                    const trendPositive = card.trendUp && !isNegativeSignal;
                    
                    // Determine click target
                    let clickPath = "";
                    if (card.label === "Total SMEs" || card.label === "Finance-Ready") clickPath = "/dfi-dashboard/sme-portfolio";
                    else if (card.label === "Require TA") clickPath = "/dfi-dashboard/technical-assistance";
                    else if (card.label === "Active Pipeline") clickPath = "/dfi-dashboard/funding-pathways";
                    else if (card.label === "Elevated Risk") clickPath = "/dfi-dashboard/readiness-risk";
                    
                    return (
                      <div
                        key={card.label}
                        onClick={() => clickPath && navigate(clickPath)}
                        className="rounded-xl border bg-white px-3.5 py-3 cursor-pointer hover:shadow-md transition-all group"
                        style={{ borderColor: card.border }}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                            style={{ backgroundColor: card.bg }}
                          >
                            <Icon className="w-3.5 h-3.5" style={{ color: card.color }} strokeWidth={2} />
                          </div>
                          <p className="text-[12px] text-[var(--allyra-neutral-700)]" style={{ fontWeight: 600 }}>{card.label}</p>
                        </div>
                        <div className="flex items-end justify-between">
                          <p className="text-[20px] text-[var(--allyra-neutral-900)] leading-none" style={{ fontWeight: 700 }}>
                            {card.value}
                          </p>
                          <span
                            className="flex items-center gap-0.5 text-[12px] px-1.5 py-0.5 rounded-md"
                            style={{
                              fontWeight: 700,
                              color: trendPositive ? "#2d6a4f" : "#dc2626",
                              backgroundColor: trendPositive ? "#f0faf4" : "#fef2f2",
                            }}
                          >
                            {card.trendUp ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                            {card.trend}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Section 2: Impact & Inclusion */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
              >
                <div className="rounded-2xl bg-[#1b3a2d] p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                      <Target className="w-4 h-4 text-[#6ee7b7]" strokeWidth={2} />
                    </div>
                    <div>
                      <h2 className="text-[14px] text-white" style={{ fontWeight: 600 }}>
                        Impact & Inclusion
                      </h2>
                      <p className="text-[11px] text-white/50">Portfolio development mandate metrics</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {IMPACT_METRICS.map((m) => {
                      const Icon = m.icon;
                      return (
                        <div 
                          key={m.label} 
                          className="rounded-xl bg-white/8 border border-white/10 p-4 hover:bg-white/12 transition-colors cursor-pointer"
                          onClick={() => m.count !== null && setImpactMetric(m)}
                        >
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-2.5" style={{ backgroundColor: `${m.color}22` }}>
                            <Icon className="w-3.5 h-3.5" style={{ color: m.color }} strokeWidth={2} />
                          </div>
                          <p className="text-[22px] text-white leading-none" style={{ fontWeight: 700 }}>
                            {m.value}
                          </p>
                          <p className="text-[11px] text-white/60 mt-1">{m.label}</p>
                          {m.count !== null && (
                            <p className="text-[10px] text-white/40 mt-0.5">{m.count} SMEs</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* Section 3: Portfolio Composition */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <SectionHeader title="Portfolio Composition" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Sector Chart */}
                  <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5">
                    <p className="text-[13px] text-[var(--allyra-neutral-700)] mb-3" style={{ fontWeight: 600 }}>
                      By Sector
                    </p>
                    <div className="h-52">
                      <ResponsiveContainer width="100%" height="100%" key="sector-chart">
                        <BarChart data={SECTOR_DATA} layout="vertical" margin={{ left: 10 }} id="sector-chart">
                          <XAxis 
                            type="number" 
                            tick={{ fontSize: 11 }} 
                            axisLine={false} 
                            tickLine={false} 
                            tickFormatter={(value) => String(value)}
                          />
                          <YAxis 
                            type="category" 
                            dataKey="name" 
                            tick={{ fontSize: 11 }} 
                            axisLine={false} 
                            tickLine={false} 
                            width={100}
                            tickFormatter={(value) => String(value)}
                          />
                          <Tooltip contentStyle={{ fontSize: "12px", borderRadius: "8px", border: "1px solid #e5e7eb" }} />
                          <Bar dataKey="value" fill="#2d6a4f" radius={[0, 4, 4, 0]} barSize={14} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Geography Chart */}
                  <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5">
                    <p className="text-[13px] text-[var(--allyra-neutral-700)] mb-3" style={{ fontWeight: 600 }}>
                      By Geography
                    </p>
                    <div className="h-52">
                      <ResponsiveContainer width="100%" height="100%" key="geo-chart">
                        <BarChart data={GEO_DATA} layout="vertical" margin={{ left: 10 }} id="geo-chart">
                          <XAxis 
                            type="number" 
                            tick={{ fontSize: 11 }} 
                            axisLine={false} 
                            tickLine={false}
                            tickFormatter={(value) => String(value)}
                          />
                          <YAxis 
                            type="category" 
                            dataKey="name" 
                            tick={{ fontSize: 11 }} 
                            axisLine={false} 
                            tickLine={false} 
                            width={90}
                            tickFormatter={(value) => String(value)}
                          />
                          <Tooltip contentStyle={{ fontSize: "12px", borderRadius: "8px", border: "1px solid #e5e7eb" }} />
                          <Bar dataKey="value" fill="#2d6a4f" radius={[0, 4, 4, 0]} barSize={16} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Secondary Indicators */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                  {SECONDARY_INDICATORS.map((ind) => (
                    <div key={ind.label} className="rounded-lg border border-[var(--allyra-neutral-150)] bg-white px-4 py-2.5" style={{ borderColor: "var(--allyra-neutral-200)" }}>
                      <p className="text-[10px] tracking-[0.05em] uppercase text-[var(--allyra-neutral-400)] mb-1" style={{ fontWeight: 600 }}>
                        {ind.label}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {ind.values.map((v) => (
                          <span key={v} className="text-[11px] text-[var(--allyra-neutral-700)] px-2 py-0.5 rounded-full bg-[var(--allyra-neutral-100)]">
                            {v}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Section 4: Readiness & Progression */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <SectionHeader title="Readiness & Progression" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Stage Distribution */}
                  <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5">
                    <p className="text-[13px] text-[var(--allyra-neutral-700)] mb-4" style={{ fontWeight: 600 }}>
                      Stage Distribution
                    </p>
                    <div className="space-y-3">
                      {STAGES.map((s) => (
                        <div key={s.label}>
                          <div className="flex justify-between mb-1">
                            <span className="text-[12px] text-[var(--allyra-neutral-700)]">{s.label}</span>
                            <span className="text-[12px] text-[var(--allyra-neutral-500)]">{s.count} ({s.pct}%)</span>
                          </div>
                          <div className="h-2 rounded-full bg-[var(--allyra-neutral-100)] overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${s.pct}%` }}
                              transition={{ duration: 0.6, delay: 0.2 }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: s.color }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Progression Funnel */}
                  <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5">
                    <p className="text-[13px] text-[var(--allyra-neutral-700)] mb-4" style={{ fontWeight: 600 }}>
                      Progression Funnel
                    </p>
                    <div className="space-y-2">
                      {FUNNEL.map((step, i) => (
                        <div key={step.label} className="relative">
                          <div
                            className="rounded-lg py-2.5 px-4 flex items-center justify-between transition-all"
                            style={{
                              backgroundColor: `rgba(45, 106, 79, ${0.08 + i * 0.04})`,
                              width: `${Math.max(step.pct, 30)}%`,
                              minWidth: "200px",
                            }}
                          >
                            <span className="text-[12px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 500 }}>
                              {step.label}
                            </span>
                            <span className="text-[13px] text-[#2d6a4f]" style={{ fontWeight: 700 }}>
                              {step.count}
                            </span>
                          </div>
                          {i < FUNNEL.length - 1 && (
                            <div className="ml-6 h-2 w-px bg-[var(--allyra-neutral-200)]" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Section 5: Capability Overview */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                <SectionHeader title="Capability Overview" />
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {CAPABILITY_PILLARS.map((p) => (
                    <div
                      key={p.label}
                      className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-4 cursor-pointer hover:shadow-md transition-all group"
                    >
                      <p className="text-[12px] text-[var(--allyra-neutral-700)] mb-2" style={{ fontWeight: 600 }}>
                        {p.label}
                      </p>
                      <div className="relative w-14 h-14 mx-auto mb-2">
                        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                          <circle cx="18" cy="18" r="14" fill="none" stroke="var(--allyra-neutral-100)" strokeWidth="3.5" />
                          <motion.circle
                            cx="18" cy="18" r="14" fill="none"
                            stroke={p.color}
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeDasharray={`${p.score * 0.88} 100`}
                            initial={{ strokeDasharray: "0 100" }}
                            animate={{ strokeDasharray: `${p.score * 0.88} 100` }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-[13px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 700 }}>
                          {p.score}
                        </span>
                      </div>
                      <p className="text-[11px] text-[var(--allyra-neutral-500)] text-center">
                        {p.gaps} SMEs with gaps
                      </p>
                      <ChevronRight className="w-3 h-3 text-[var(--allyra-neutral-300)] mt-1 mx-auto group-hover:text-[var(--allyra-neutral-500)] transition-colors" />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Section 6: Risk & Support Priorities */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <SectionHeader title="Risk & Support Priorities" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Bottlenecks */}
                  <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5">
                    <p className="text-[13px] text-[var(--allyra-neutral-700)] mb-4" style={{ fontWeight: 600 }}>
                      Top Portfolio Bottlenecks
                    </p>
                    <div className="space-y-2.5">
                      {BOTTLENECKS.map((b, i) => (
                        <div key={b.label} className="flex items-center gap-3">
                          <span className="text-[11px] text-[var(--allyra-neutral-400)] w-4 text-right shrink-0" style={{ fontWeight: 600 }}>
                            {i + 1}
                          </span>
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <span className="text-[12px] text-[var(--allyra-neutral-700)]">{b.label}</span>
                              <span className="text-[11px] text-[var(--allyra-neutral-500)]">{b.count} SMEs</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-[var(--allyra-neutral-100)] overflow-hidden">
                              <div className="h-full rounded-full bg-[#d97706]" style={{ width: `${b.pct * 2.5}%` }} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Early Warnings */}
                  <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5">
                    <p className="text-[13px] text-[var(--allyra-neutral-700)] mb-4" style={{ fontWeight: 600 }}>
                      Early Warning Signals
                    </p>
                    <div className="space-y-2">
                      {EARLY_WARNINGS.map((w) => (
                        <div key={w.label} className="flex items-center justify-between rounded-lg px-3.5 py-2.5 bg-[var(--allyra-neutral-50)]">
                          <div className="flex items-center gap-2.5">
                            <div
                              className="w-2 h-2 rounded-full shrink-0"
                              style={{ backgroundColor: severityColor(w.severity) }}
                            />
                            <span className="text-[12px] text-[var(--allyra-neutral-700)]">{w.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[12px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 600 }}>{w.count}</span>
                            <span
                              className="text-[9px] tracking-[0.05em] uppercase px-1.5 py-0.5 rounded"
                              style={{
                                fontWeight: 600,
                                color: severityColor(w.severity),
                                backgroundColor: w.severity === "high" ? "#fef2f2" : w.severity === "medium" ? "#fffbeb" : "#f0faf4",
                              }}
                            >
                              {w.severity}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Section 7: Technical Assistance */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
              >
                <SectionHeader title="Technical Assistance & Intervention Tracking" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* TA Table */}
                  <div className="lg:col-span-2 rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5">
                    <p className="text-[13px] text-[var(--allyra-neutral-700)] mb-3" style={{ fontWeight: 600 }}>
                      TA by Type & Status
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-[var(--allyra-neutral-100)]">
                            <th className="text-left text-[10px] tracking-[0.05em] uppercase text-[var(--allyra-neutral-400)] pb-2" style={{ fontWeight: 600 }}>Type</th>
                            <th className="text-center text-[10px] tracking-[0.05em] uppercase text-[var(--allyra-neutral-400)] pb-2" style={{ fontWeight: 600 }}>Active</th>
                            <th className="text-center text-[10px] tracking-[0.05em] uppercase text-[var(--allyra-neutral-400)] pb-2" style={{ fontWeight: 600 }}>Planned</th>
                            <th className="text-center text-[10px] tracking-[0.05em] uppercase text-[var(--allyra-neutral-400)] pb-2" style={{ fontWeight: 600 }}>Complete</th>
                            <th className="text-center text-[10px] tracking-[0.05em] uppercase text-[var(--allyra-neutral-400)] pb-2" style={{ fontWeight: 600 }}>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {TA_TYPES.map((ta) => (
                            <tr key={ta.type} className="border-b border-[var(--allyra-neutral-50)] hover:bg-[var(--allyra-neutral-50)] transition-colors">
                              <td className="py-2.5 text-[12px] text-[var(--allyra-neutral-700)]">{ta.type}</td>
                              <td className="py-2.5 text-center">
                                <span className="inline-block px-2 py-0.5 rounded-full text-[11px] bg-[#eff6ff] text-[#1d4ed8]" style={{ fontWeight: 600 }}>{ta.active}</span>
                              </td>
                              <td className="py-2.5 text-center">
                                <span className="inline-block px-2 py-0.5 rounded-full text-[11px] bg-[var(--allyra-neutral-100)] text-[var(--allyra-neutral-600)]" style={{ fontWeight: 600 }}>{ta.planned}</span>
                              </td>
                              <td className="py-2.5 text-center">
                                <span className="inline-block px-2 py-0.5 rounded-full text-[11px] bg-[#f0faf4] text-[#2d6a4f]" style={{ fontWeight: 600 }}>{ta.completed}</span>
                              </td>
                              <td className="py-2.5 text-center text-[12px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 600 }}>
                                {ta.active + ta.planned + ta.completed}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Allyra Recommends */}
                  <div className="rounded-xl border border-[#c6e9d4] bg-[#f0faf4] p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-[#2d6a4f]" strokeWidth={2} />
                      <p className="text-[13px] text-[#2d6a4f]" style={{ fontWeight: 600 }}>
                        Allyra Recommends
                      </p>
                    </div>
                    <p className="text-[12px] text-[var(--allyra-neutral-700)] mb-3 leading-relaxed">
                      Based on current portfolio signals, intervention is recommended for:
                    </p>
                    <div className="space-y-2">
                      {["14 SMEs — Financial management coaching", "8 SMEs — Market access support", "6 SMEs — Governance strengthening"].map((rec) => (
                        <div key={rec} className="flex items-start gap-2 text-[12px] text-[var(--allyra-neutral-700)]">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f] mt-1.5 shrink-0" />
                          {rec}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Section 8: Priority SMEs Table */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
              >
                <SectionHeader title="Priority SMEs" />
                <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px]">
                      <thead>
                        <tr className="bg-[var(--allyra-neutral-50)] border-b border-[var(--allyra-neutral-200)]">
                          {["SME Name", "Country", "Sector", "Stage", "Readiness", "Main Bottleneck", "Support Track", "Funding Pathway", "Risk"].map((col) => (
                            <th
                              key={col}
                              className="text-left text-[10px] tracking-[0.05em] uppercase text-[var(--allyra-neutral-400)] px-4 py-2.5"
                              style={{ fontWeight: 600 }}
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {PRIORITY_SMES.map((sme) => {
                          const rc = riskColor(sme.risk);
                          return (
                            <tr
                              key={sme.name}
                              className="border-b border-[var(--allyra-neutral-50)] hover:bg-[var(--allyra-neutral-50)] cursor-pointer transition-colors"
                              onClick={() => setSelectedSME(sme)}
                            >
                              <td className="px-4 py-3 text-[12px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 600 }}>
                                {sme.name}
                              </td>
                              <td className="px-4 py-3 text-[12px] text-[var(--allyra-neutral-600)]">{sme.country}</td>
                              <td className="px-4 py-3 text-[12px] text-[var(--allyra-neutral-600)]">{sme.sector}</td>
                              <td className="px-4 py-3">
                                <span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--allyra-neutral-100)] text-[var(--allyra-neutral-700)]">
                                  {sme.stage}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-10 h-1.5 rounded-full bg-[var(--allyra-neutral-100)] overflow-hidden">
                                    <div
                                      className="h-full rounded-full"
                                      style={{
                                        width: `${sme.readiness}%`,
                                        backgroundColor: sme.readiness >= 70 ? "#2d6a4f" : sme.readiness >= 50 ? "#d97706" : "#dc2626",
                                      }}
                                    />
                                  </div>
                                  <span className="text-[12px] text-[var(--allyra-neutral-700)]" style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                                    {sme.readiness}
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-[12px] text-[var(--allyra-neutral-600)]">{sme.bottleneck}</td>
                              <td className="px-4 py-3 text-[12px] text-[var(--allyra-neutral-600)]">{sme.support}</td>
                              <td className="px-4 py-3 text-[12px] text-[var(--allyra-neutral-600)]">{sme.pathway}</td>
                              <td className="px-4 py-3">
                                <span
                                  className="text-[10px] tracking-[0.04em] uppercase px-2 py-0.5 rounded-full"
                                  style={{
                                    fontWeight: 600,
                                    color: rc.text,
                                    backgroundColor: rc.bg,
                                    border: `1px solid ${rc.border}`,
                                  }}
                                >
                                  {sme.risk}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>

              {/* Bottom spacer */}
              <div className="h-8" />
            </div>

            {/* ── Right Signals Panel ── */}
            {showSignals && (
              <aside className="hidden xl:block w-[260px] shrink-0 border-l border-[var(--allyra-neutral-200)] bg-white p-5">
                <div className="sticky top-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#2d6a4f]" strokeWidth={2} />
                      <p className="text-[13px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 600 }}>
                        Portfolio Signals
                      </p>
                    </div>
                    <button
                      onClick={() => setShowSignals(false)}
                      className="text-[var(--allyra-neutral-400)] hover:text-[var(--allyra-neutral-600)] transition-colors text-[11px]"
                    >
                      Hide
                    </button>
                  </div>
                  <p className="text-[10px] tracking-[0.05em] uppercase text-[var(--allyra-neutral-400)] mb-3" style={{ fontWeight: 600 }}>
                    AI-Generated Observations
                  </p>
                  <div className="space-y-3">
                    {ALLYRA_SIGNALS.map((signal, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                        className="rounded-lg bg-[var(--allyra-neutral-50)] p-3 border border-[var(--allyra-neutral-100)]"
                      >
                        <p className="text-[12px] text-[var(--allyra-neutral-700)] leading-relaxed">
                          "{signal}"
                        </p>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-[var(--allyra-neutral-100)]">
                    <p className="text-[10px] text-[var(--allyra-neutral-400)] leading-relaxed">
                      Signals are generated by Allyra's portfolio intelligence engine based on current SME data.
                    </p>
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>

      {/* Modals and Drawers */}
      <SMEDetailDrawer sme={selectedSME} onClose={() => setSelectedSME(null)} />
      <ImpactMetricsModal isOpen={!!impactMetric} onClose={() => setImpactMetric(null)} metric={impactMetric} />
    </>
  );
}

// ─── SECTION HEADER ──────────────────────────────────────────────────────────

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <h2 className="text-[14px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 600 }}>
        {title}
      </h2>
      <div className="flex-1 h-px bg-[var(--allyra-neutral-150)]" style={{ backgroundColor: "var(--allyra-neutral-200)" }} />
    </div>
  );
}