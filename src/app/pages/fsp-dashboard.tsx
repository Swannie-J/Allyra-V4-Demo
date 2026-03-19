import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  Banknote, CheckCircle2, AlertTriangle, TrendingUp, ArrowDownRight, ArrowUpRight,
  Brain, Users, Shield, Clock, Sparkles, Search, SlidersHorizontal, Download,
  Landmark, Calendar, ChevronRight,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import logo from "../../assets/365cd6f2dd45be695d6550c45d6280e22785450e.png";
import { BorrowerDetailDrawer, type Borrower } from "../components/borrower-detail-drawer";

/* ─── Data ─────────────────────────────────────────── */

const SUMMARY_CARDS = [
  { label: "Total Book", value: "R2.4B", sub: "outstanding", icon: Banknote, color: "#0f766e", bg: "#f0fdfa", border: "#99f6e4", trend: "+8.2%", trendUp: true, path: "/fsp-dashboard/lending-book" },
  { label: "Performing", value: "94.2%", sub: "of book", icon: CheckCircle2, color: "#2d6a4f", bg: "#f0faf4", border: "#c6e9d4", trend: "+0.4%", trendUp: true, path: "/fsp-dashboard/credit-risk" },
  { label: "NPL Ratio", value: "3.8%", sub: "non-performing", icon: AlertTriangle, color: "#dc2626", bg: "#fef2f2", border: "#fecaca", trend: "-0.2%", trendUp: false, path: "/fsp-dashboard/credit-risk" },
  { label: "Disbursements", value: "R186M", sub: "this quarter", icon: TrendingUp, color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe", trend: "+12%", trendUp: true, path: "/fsp-dashboard/loan-products" },
  { label: "Collections", value: "97.1%", sub: "rate", icon: ArrowDownRight, color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe", trend: "+0.8%", trendUp: true, path: "/fsp-dashboard/credit-risk" },
  { label: "Allyra Coverage", value: "72%", sub: "borrowers active", icon: Brain, color: "#0891b2", bg: "#ecfeff", border: "#a5f3fc", trend: "+14%", trendUp: true, path: "/fsp-dashboard/allyra-intelligence" },
];

const ALLYRA_INTELLIGENCE = [
  { label: "Active Engagement", value: "72%", sub: "borrowers on Allyra", icon: Users, color: "#67e8f9" },
  { label: "Avg Intelligence Score", value: "68", sub: "out of 100", icon: Brain, color: "#5eead4" },
  { label: "Early Warnings", value: "14", sub: "pre-financial signals", icon: AlertTriangle, color: "#fbbf24" },
  { label: "Interventions", value: "8", sub: "to prevent defaults", icon: Shield, color: "#86efac" },
  { label: "Data Freshness", value: "92%", sub: "updated < 30 days", icon: Clock, color: "#c4b5fd" },
];

const PRODUCT_MIX = [
  { name: "Term Loans", value: 680 },
  { name: "Revolving Credit", value: 420 },
  { name: "Trade Finance", value: 380 },
  { name: "Invoice Discounting", value: 320 },
  { name: "PO Finance", value: 240 },
  { name: "Supply Chain Finance", value: 210 },
  { name: "Micro-enterprise", value: 150 },
];

const GEO_DATA = [
  { name: "South Africa", value: 820 },
  { name: "Kenya", value: 480 },
  { name: "Nigeria", value: 380 },
  { name: "Ghana", value: 280 },
  { name: "Tanzania", value: 240 },
  { name: "Rwanda", value: 200 },
];

const SECTOR_DATA = [
  { name: "Agri-processing", count: 42 },
  { name: "Manufacturing", count: 38 },
  { name: "Retail & Wholesale", count: 35 },
  { name: "Services", count: 28 },
  { name: "Logistics", count: 22 },
  { name: "Energy", count: 18 },
  { name: "Construction", count: 17 },
];

const PAR_DATA = [
  { label: "Current", count: 2256, pct: 94.0, color: "#2d6a4f" },
  { label: "PAR 1-30", count: 72, pct: 3.0, color: "#d97706" },
  { label: "PAR 31-60", count: 36, pct: 1.5, color: "#ea580c" },
  { label: "PAR 61-90", count: 24, pct: 1.0, color: "#dc2626" },
  { label: "PAR 90+", count: 12, pct: 0.5, color: "#991b1b" },
];

const PIPELINE = [
  { label: "Applications Received", count: 340, pct: 100 },
  { label: "Under Assessment", count: 186, pct: 55 },
  { label: "Approved", count: 124, pct: 36 },
  { label: "Disbursed", count: 98, pct: 29 },
  { label: "Active & Performing", count: 88, pct: 26 },
];

const SCORE_DISTRIBUTION = [
  { band: "0-20", count: 8, fill: "#dc2626" },
  { band: "21-40", count: 22, fill: "#ea580c" },
  { band: "41-60", count: 48, fill: "#d97706" },
  { band: "61-80", count: 78, fill: "#0f766e" },
  { band: "81-100", count: 44, fill: "#2d6a4f" },
];

const PRIORITY_BORROWERS: Borrower[] = [
  { name: "Tshwane Agri Co-op", country: "South Africa", sector: "Agri-processing", product: "Term Loan", outstanding: "R4.2M", dscr: 1.8, par: "Current", allyraScore: 82, risk: "low" },
  { name: "Nairobi Fresh Foods", country: "Kenya", sector: "Agri-processing", product: "Trade Finance", outstanding: "R2.8M", dscr: 1.5, par: "Current", allyraScore: 76, risk: "low" },
  { name: "Lagos Textiles Ltd", country: "Nigeria", sector: "Manufacturing", product: "Invoice Discount", outstanding: "R1.6M", dscr: 1.1, par: "PAR 1-30", allyraScore: 54, risk: "medium" },
  { name: "Accra Solar Systems", country: "Ghana", sector: "Energy", product: "PO Finance", outstanding: "R890K", dscr: 0.9, par: "PAR 31-60", allyraScore: 38, risk: "high" },
  { name: "Kigali Logistics Hub", country: "Rwanda", sector: "Logistics", product: "Revolving Credit", outstanding: "R5.1M", dscr: 2.2, par: "Current", allyraScore: 91, risk: "low" },
  { name: "Dar Coffee Exports", country: "Tanzania", sector: "Agri-processing", product: "Supply Chain Fin", outstanding: "R3.4M", dscr: 1.3, par: "Current", allyraScore: 65, risk: "medium" },
  { name: "Soweto Quick Serve", country: "South Africa", sector: "Retail", product: "Micro-enterprise", outstanding: "R420K", dscr: 1.0, par: "PAR 1-30", allyraScore: 47, risk: "medium" },
  { name: "Mombasa Marine Svcs", country: "Kenya", sector: "Services", product: "Term Loan", outstanding: "R1.2M", dscr: 0.8, par: "PAR 61-90", allyraScore: 32, risk: "high" },
  { name: "Abuja Green Energy", country: "Nigeria", sector: "Energy", product: "Trade Finance", outstanding: "R2.1M", dscr: 1.6, par: "Current", allyraScore: 71, risk: "low" },
  { name: "Cape Harvest Foods", country: "South Africa", sector: "Manufacturing", product: "Term Loan", outstanding: "R6.8M", dscr: 2.0, par: "Current", allyraScore: 88, risk: "low" },
];

const ALLYRA_SIGNALS = [
  "Accra Solar Systems and Mombasa Marine Svcs both showing declining engagement velocity — historically a 45-day leading indicator of PAR migration in this portfolio.",
  "Invoice discounting facilities in Nigeria collecting at 98.4% vs 95.2% for collateralised term loans. Product mix shift could improve portfolio-level collections.",
  "Borrowers with Intelligence Scores above 70 have migrated to PAR 30+ at less than half the rate of those below 40 — early engagement drives better outcomes.",
  "Soweto Quick Serve hasn't uploaded financials in 93 days despite quarterly covenant requirement. Dar Coffee Exports has 3 unverified findings from last analysis cycle.",
  "Tshwane Agri Co-op and Cape Harvest Foods both flagged seasonal working capital pressure in Q2 growth plan reviews — proactive facility top-ups may prevent drawdown stress.",
];

/* ─── Helpers ──────────────────────────────────────── */

function riskColor(risk: string) {
  if (risk === "high") return { bg: "#fef2f2", text: "#dc2626", border: "#fecaca" };
  if (risk === "medium") return { bg: "#fffbeb", text: "#d97706", border: "#fde68a" };
  return { bg: "#f0faf4", text: "#2d6a4f", border: "#c6e9d4" };
}

function scoreColor(score: number) {
  if (score >= 81) return "#2d6a4f";
  if (score >= 61) return "#0f766e";
  if (score >= 41) return "#d97706";
  return "#dc2626";
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <h2 className="text-[14px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 600 }}>{title}</h2>
      <div className="flex-1 h-px bg-[var(--allyra-neutral-200)]" />
    </div>
  );
}

/* ─── Component ────────────────────────────────────── */

export function FspDashboard() {
  const navigate = useNavigate();
  const [selectedBorrower, setSelectedBorrower] = useState<Borrower | null>(null);
  const [showSignals, setShowSignals] = useState(true);

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* ─── Top Bar ─── */}
      <header className="bg-white border-b border-[var(--allyra-neutral-200)] px-5 py-3 flex items-center gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-[18px] text-[var(--allyra-neutral-900)] truncate" style={{ fontWeight: 600 }}>
            Lending Dashboard
          </h1>
          <p className="text-[12px] text-[var(--allyra-neutral-500)]">SME lending book overview</p>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] border border-[var(--allyra-neutral-200)] rounded-lg hover:bg-[var(--allyra-neutral-50)]" style={{ fontWeight: 500 }}>
            <Calendar className="w-3.5 h-3.5" /> Mar 2026
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] border border-[var(--allyra-neutral-200)] rounded-lg hover:bg-[var(--allyra-neutral-50)]" style={{ fontWeight: 500 }}>
            <Search className="w-3.5 h-3.5" /> Search
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] border border-[var(--allyra-neutral-200)] rounded-lg hover:bg-[var(--allyra-neutral-50)]" style={{ fontWeight: 500 }}>
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] border border-[var(--allyra-neutral-200)] rounded-lg hover:bg-[var(--allyra-neutral-50)]" style={{ fontWeight: 500 }}>
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f0fdfa] border border-[#99f6e4]">
          <Landmark className="w-3.5 h-3.5" style={{ color: "#0f766e" }} strokeWidth={2} />
          <span className="text-[12px]" style={{ fontWeight: 600, color: "#0f766e" }}>Pan-African Bank</span>
        </div>
      </header>

      {/* ─── Content ─── */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex">
          {/* Main Content */}
          <div className="flex-1 min-w-0 p-5 space-y-5">

            {/* ── Section: Executive Summary ── */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <SectionHeader title="Executive Summary" />
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
                {SUMMARY_CARDS.map((card) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={card.label}
                      onClick={() => navigate(card.path)}
                      className="rounded-xl border bg-white px-4 py-3.5 cursor-pointer hover:shadow-md transition-all group overflow-hidden"
                      style={{ borderColor: card.border }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: card.bg }}>
                          <Icon className="w-3.5 h-3.5" style={{ color: card.color }} strokeWidth={2} />
                        </div>
                        <p className="text-[11px] text-[var(--allyra-neutral-600)] leading-tight" style={{ fontWeight: 600 }}>{card.label}</p>
                      </div>
                      <p className="text-[22px] text-[var(--allyra-neutral-900)] leading-none" style={{ fontWeight: 700 }}>{card.value}</p>
                      <div className="flex items-center justify-between mt-1.5">
                        <p className="text-[10px] text-[var(--allyra-neutral-500)]">{card.sub}</p>
                        <span
                          className="flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded-md whitespace-nowrap shrink-0"
                          style={{
                            fontWeight: 700,
                            color: card.label === "NPL Ratio" ? (card.trendUp ? "#dc2626" : "#2d6a4f") : (card.trendUp ? "#2d6a4f" : "#dc2626"),
                            backgroundColor: card.label === "NPL Ratio" ? (card.trendUp ? "#fef2f2" : "#f0faf4") : (card.trendUp ? "#f0faf4" : "#fef2f2"),
                          }}
                        >
                          {card.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {card.trend}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* ── Section: Allyra Intelligence Panel ── */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}>
              <SectionHeader title="Allyra Intelligence" />
              <div
                className="rounded-xl p-5 cursor-pointer hover:shadow-lg transition-all"
                style={{ backgroundColor: "#134e4a" }}
                onClick={() => navigate("/fsp-dashboard/allyra-intelligence")}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-5 h-5 text-[#5eead4]" strokeWidth={2} />
                  <span className="text-[13px] text-[#ccfbf1]" style={{ fontWeight: 600 }}>Portfolio Intelligence</span>
                  <ChevronRight className="w-4 h-4 text-[#5eead4] ml-auto" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
                  {ALLYRA_INTELLIGENCE.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="rounded-lg p-3" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                        <Icon className="w-4 h-4 mb-2" style={{ color: item.color }} strokeWidth={2} />
                        <p className="text-[20px] text-white leading-none" style={{ fontWeight: 700 }}>{item.value}</p>
                        <p className="text-[10px] text-[#99f6e4] mt-1" style={{ fontWeight: 500 }}>{item.label}</p>
                        <p className="text-[10px] text-[#5eead4] opacity-70 mt-0.5">{item.sub}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* ── Section: Portfolio Composition ── */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
              <SectionHeader title="Portfolio Composition" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* By Loan Product */}
                <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5">
                  <p className="text-[13px] text-[var(--allyra-neutral-700)] mb-3" style={{ fontWeight: 600 }}>By Loan Product</p>
                  <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={PRODUCT_MIX} layout="vertical" margin={{ left: 10 }}>
                        <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => String(v)} />
                        <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={120} tickFormatter={(v) => String(v)} />
                        <Tooltip contentStyle={{ fontSize: "12px", borderRadius: "8px", border: "1px solid #e5e7eb" }} />
                        <Bar dataKey="value" fill="#0f766e" radius={[0, 4, 4, 0]} barSize={14} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                {/* By Geography */}
                <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5">
                  <p className="text-[13px] text-[var(--allyra-neutral-700)] mb-3" style={{ fontWeight: 600 }}>By Geography</p>
                  <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={GEO_DATA} layout="vertical" margin={{ left: 10 }}>
                        <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => String(v)} />
                        <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={100} tickFormatter={(v) => String(v)} />
                        <Tooltip contentStyle={{ fontSize: "12px", borderRadius: "8px", border: "1px solid #e5e7eb" }} />
                        <Bar dataKey="value" fill="#0d9488" radius={[0, 4, 4, 0]} barSize={14} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Secondary Indicators */}
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-[var(--allyra-neutral-200)]">
                  <span className="text-[11px] text-[var(--allyra-neutral-500)]" style={{ fontWeight: 500 }}>Sectors:</span>
                  {SECTOR_DATA.slice(0, 5).map((s) => (
                    <span key={s.name} className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--allyra-neutral-100)] text-[var(--allyra-neutral-600)]" style={{ fontWeight: 500 }}>
                      {s.name} ({s.count})
                    </span>
                  ))}
                </div>
                {[
                  { label: "Avg Loan Size", value: "R1.0M" },
                  { label: "Avg Tenor", value: "36 mo" },
                  { label: "Collateral Coverage", value: "118%" },
                ].map((m) => (
                  <div key={m.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[var(--allyra-neutral-200)]">
                    <span className="text-[11px] text-[var(--allyra-neutral-500)]" style={{ fontWeight: 500 }}>{m.label}:</span>
                    <span className="text-[11px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 700 }}>{m.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Section: Portfolio Quality ── */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}>
              <SectionHeader title="Portfolio Quality" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* PAR Aging */}
                <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5">
                  <p className="text-[13px] text-[var(--allyra-neutral-700)] mb-3" style={{ fontWeight: 600 }}>PAR Aging</p>
                  {/* Stacked bar */}
                  <div className="h-6 rounded-full overflow-hidden flex mb-3">
                    {PAR_DATA.map((p) => (
                      <motion.div
                        key={p.label}
                        initial={{ width: 0 }}
                        animate={{ width: `${p.pct}%` }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="h-full"
                        style={{ backgroundColor: p.color }}
                        title={`${p.label}: ${p.pct}%`}
                      />
                    ))}
                  </div>
                  <div className="space-y-1.5">
                    {PAR_DATA.map((p) => (
                      <div key={p.label} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                          <span className="text-[12px] text-[var(--allyra-neutral-600)]">{p.label}</span>
                        </div>
                        <span className="text-[12px] text-[var(--allyra-neutral-700)]" style={{ fontWeight: 600 }}>{p.count} ({p.pct}%)</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Loan Pipeline */}
                <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5">
                  <p className="text-[13px] text-[var(--allyra-neutral-700)] mb-3" style={{ fontWeight: 600 }}>Loan Pipeline</p>
                  <div className="space-y-3">
                    {PIPELINE.map((step, i) => (
                      <div key={step.label}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[12px] text-[var(--allyra-neutral-600)]">{step.label}</span>
                          <span className="text-[12px] text-[var(--allyra-neutral-700)]" style={{ fontWeight: 600 }}>
                            {step.count} ({step.pct}%)
                          </span>
                        </div>
                        <div className="h-3 bg-[var(--allyra-neutral-100)] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${step.pct}%` }}
                            transition={{ duration: 0.6, delay: 0.1 + i * 0.05 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: "#0f766e", opacity: 1 - i * 0.15 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Section: Knowledge Score Distribution ── */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
              <SectionHeader title="Allyra Intelligence Score Distribution" />
              <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <div>
                    <p className="text-[12px] text-[var(--allyra-neutral-500)] mb-3">
                      Distribution of Allyra Intelligence Scores across 200 active borrowers. Higher scores reflect deeper borrower understanding and stronger confidence in credit decisions.
                    </p>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={SCORE_DISTRIBUTION} margin={{ left: 0, right: 10 }}>
                          <XAxis dataKey="band" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                          <Tooltip contentStyle={{ fontSize: "12px", borderRadius: "8px", border: "1px solid #e5e7eb" }} />
                          <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={36}>
                            {SCORE_DISTRIBUTION.map((entry, index) => (
                              <rect key={index} fill={entry.fill} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <p className="text-[12px] text-[var(--allyra-neutral-700)] mb-2" style={{ fontWeight: 600 }}>Lending Implications</p>
                    {[
                      { band: "81-100", label: "Deep Insight", count: 44, color: "#2d6a4f", note: "High confidence — streamlined decisioning" },
                      { band: "61-80", label: "Strong Insight", count: 78, color: "#0f766e", note: "Good visibility — standard assessment" },
                      { band: "41-60", label: "Developing Insight", count: 48, color: "#d97706", note: "Gaps identified — enhanced due diligence" },
                      { band: "21-40", label: "Limited Insight", count: 22, color: "#ea580c", note: "Low visibility — manual review required" },
                      { band: "0-20", label: "Minimal Insight", count: 8, color: "#dc2626", note: "Insufficient data — traditional assessment only" },
                    ].map((b) => (
                      <div key={b.band} className="flex items-center gap-3 p-2 rounded-lg bg-[var(--allyra-neutral-50)]">
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: b.color }} />
                        <div className="flex-1 min-w-0">
                          <span className="text-[12px] text-[var(--allyra-neutral-700)]" style={{ fontWeight: 600 }}>{b.band}</span>
                          <span className="text-[12px] text-[var(--allyra-neutral-500)]"> — {b.label}</span>
                        </div>
                        <span className="text-[11px] text-[var(--allyra-neutral-500)] shrink-0">{b.count} borrowers</span>
                      </div>
                    ))}
                    <button
                      onClick={() => navigate("/fsp-dashboard/allyra-intelligence")}
                      className="mt-2 text-[12px] flex items-center gap-1 hover:gap-1.5 transition-all"
                      style={{ fontWeight: 600, color: "#0f766e" }}
                    >
                      Explore Intelligence →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Section: Priority Borrowers ── */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}>
              <SectionHeader title="Priority Borrowers" />
              <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-[var(--allyra-neutral-100)]">
                        {["Borrower", "Country", "Product", "Outstanding", "DSCR", "PAR", "Intelligence Score", "Risk"].map((h) => (
                          <th key={h} className="px-4 py-3 text-[11px] tracking-[0.04em] uppercase text-[var(--allyra-neutral-500)]" style={{ fontWeight: 600 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {PRIORITY_BORROWERS.map((b) => {
                        const rc = riskColor(b.risk);
                        const sc = scoreColor(b.allyraScore);
                        return (
                          <tr
                            key={b.name}
                            className="border-b border-[var(--allyra-neutral-50)] hover:bg-[var(--allyra-neutral-50)] cursor-pointer transition-colors"
                            onClick={() => setSelectedBorrower(b)}
                          >
                            <td className="px-4 py-3">
                              <p className="text-[13px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 500 }}>{b.name}</p>
                              <p className="text-[11px] text-[var(--allyra-neutral-500)]">{b.sector}</p>
                            </td>
                            <td className="px-4 py-3 text-[13px] text-[var(--allyra-neutral-600)]">{b.country}</td>
                            <td className="px-4 py-3 text-[13px] text-[var(--allyra-neutral-600)]">{b.product}</td>
                            <td className="px-4 py-3 text-[13px] text-[var(--allyra-neutral-700)]" style={{ fontWeight: 600 }}>{b.outstanding}</td>
                            <td className="px-4 py-3 text-[13px]" style={{ fontWeight: 600, color: b.dscr < 1 ? "#dc2626" : b.dscr < 1.2 ? "#d97706" : "var(--allyra-neutral-700)" }}>{b.dscr}x</td>
                            <td className="px-4 py-3 text-[13px] text-[var(--allyra-neutral-600)]">{b.par}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <svg viewBox="0 0 36 36" className="w-7 h-7 -rotate-90 shrink-0">
                                  <circle cx="18" cy="18" r="14" fill="none" stroke="var(--allyra-neutral-100)" strokeWidth="3" />
                                  <circle cx="18" cy="18" r="14" fill="none" stroke={sc} strokeWidth="3"
                                    strokeLinecap="round" strokeDasharray={`${b.allyraScore * 0.88} 100`} />
                                </svg>
                                <span className="text-[12px]" style={{ fontWeight: 700, color: sc }}>{b.allyraScore}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className="text-[10px] tracking-[0.04em] uppercase px-2 py-0.5 rounded-full"
                                style={{ fontWeight: 600, color: rc.text, backgroundColor: rc.bg, border: `1px solid ${rc.border}` }}
                              >
                                {b.risk}
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
          </div>

          {/* ─── Right Signals Panel ─── */}
          {showSignals && (
            <aside className="hidden xl:block w-[260px] shrink-0 border-l border-[var(--allyra-neutral-200)] bg-white p-5">
              <div className="sticky top-5">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4" style={{ color: "#0f766e" }} strokeWidth={2} />
                  <p className="text-[13px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 600 }}>Allyra Signals</p>
                </div>
                <div className="space-y-3">
                  {ALLYRA_SIGNALS.map((signal, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
                      className="p-3 rounded-lg bg-[var(--allyra-neutral-50)] border border-[var(--allyra-neutral-100)]"
                    >
                      <p className="text-[12px] text-[var(--allyra-neutral-600)] leading-relaxed">{signal}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Portfolio Summary */}
                <div className="mt-6 p-3 rounded-lg border border-[#99f6e4] bg-[#f0fdfa]">
                  <p className="text-[11px] tracking-[0.04em] uppercase text-[#0f766e] mb-2" style={{ fontWeight: 600 }}>Portfolio Snapshot</p>
                  <div className="space-y-1.5">
                    {[
                      { label: "Total Facilities", value: "2,400" },
                      { label: "Active Borrowers", value: "200" },
                      { label: "Countries", value: "6" },
                      { label: "Loan Products", value: "7" },
                    ].map((s) => (
                      <div key={s.label} className="flex items-center justify-between">
                        <span className="text-[11px] text-[#0f766e]">{s.label}</span>
                        <span className="text-[11px]" style={{ fontWeight: 700, color: "#0f766e" }}>{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>

      {/* ─── Borrower Drawer ─── */}
      <BorrowerDetailDrawer borrower={selectedBorrower} onClose={() => setSelectedBorrower(null)} />
    </div>
  );
}
