import { useState } from "react";
import { motion } from "motion/react";
import {
  TrendingUp, Users, Award, ShoppingCart, Brain, Briefcase,
  ArrowUpRight, Sparkles, Calendar, Search, SlidersHorizontal, Download,
  ChevronRight, Clock,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { EsdSmeDrawer, type EsdSme } from "../components/esd-sme-drawer";

/* ─── Data ─────────────────────────────────────────── */

const SUMMARY_CARDS = [
  { label: "Total ESD Spend", value: "R38.4M", sub: "of R52M target", icon: TrendingUp, color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe", trend: "+R4.2M ↑ this month", trendUp: true },
  { label: "Programme SMEs", value: "48", sub: "active in programme", icon: Users, color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe", trend: "+3 ↑ this quarter", trendUp: true },
  { label: "B-BBEE Points", value: "14.2", sub: "of 15 ESD points", icon: Award, color: "#2d6a4f", bg: "#f0faf4", border: "#c6e9d4", trend: "On track ↑", trendUp: true },
  { label: "Procurement Awarded", value: "R28M", sub: "to programme SMEs", icon: ShoppingCart, color: "#d97706", bg: "#fffbeb", border: "#fde68a", trend: "+R3.1M ↑", trendUp: true },
  { label: "Allyra Coverage", value: "81%", sub: "SMEs on platform", icon: Brain, color: "#0891b2", bg: "#ecfeff", border: "#a5f3fc", trend: "+8% ↑", trendUp: true },
  { label: "Jobs Supported", value: "342", sub: "direct jobs created", icon: Briefcase, color: "#0f766e", bg: "#f0fdfa", border: "#99f6e4", trend: "+24 ↑ this quarter", trendUp: true },
];

const ALLYRA_INTELLIGENCE = [
  { label: "Active Engagement", value: "81%", sub: "SMEs on Allyra", icon: Users, color: "#c4b5fd" },
  { label: "Avg Development Score", value: "72", sub: "out of 100", icon: Brain, color: "#a5f3fc" },
  { label: "Development Alerts", value: "8", sub: "SMEs needing intervention", icon: TrendingUp, color: "#fbbf24" },
  { label: "Milestone Completions", value: "34", sub: "this quarter", icon: Award, color: "#86efac" },
  { label: "Data Freshness", value: "88%", sub: "updated < 30 days", icon: Clock, color: "#67e8f9" },
];

const PIPELINE = [
  { label: "Applications Received", count: 62, pct: 100 },
  { label: "Onboarded & Assessed", count: 51, pct: 82 },
  { label: "In Active Development", count: 48, pct: 77 },
  { label: "Contractor Ready", count: 18, pct: 29 },
  { label: "Graduated (Active Suppliers)", count: 12, pct: 19 },
];

const PROGRAMME_TYPE_DATA = [
  { name: "Supplier Development", value: 31 },
  { name: "Enterprise Development", value: 17 },
];

const SECTOR_DATA = [
  { name: "Manufacturing", value: 14 },
  { name: "Construction", value: 10 },
  { name: "Logistics & Transport", value: 9 },
  { name: "Services", value: 7 },
  { name: "Agri-processing", value: 5 },
  { name: "ICT", value: 3 },
];

const SPEND_TARGETS = [
  { label: "Supplier Development", spend: 27, target: 35, pct: 77, color: "#7c3aed" },
  { label: "Enterprise Development", spend: 11.4, target: 17, pct: 67, color: "#a78bfa" },
  { label: "Total ESD", spend: 38.4, target: 52, pct: 74, color: "#4c1d95" },
];

const BBEE_POINTS = [
  { label: "SD Points", current: 7.7, target: 10, projected: 10, pct: 77, color: "#7c3aed" },
  { label: "ED Points", current: 3.4, target: 5, projected: 4.7, pct: 68, color: "#a78bfa" },
  { label: "Bonus Points", current: 3.1, target: 4, projected: 3.1, pct: 78, color: "#c4b5fd" },
];

const SCORE_DISTRIBUTION = [
  { band: "0-20", label: "Onboarding", count: 3, fill: "#dc2626" },
  { band: "21-40", label: "Early Stage", count: 8, fill: "#ea580c" },
  { band: "41-60", label: "Developing", count: 14, fill: "#d97706" },
  { band: "61-80", label: "Strong Progress", count: 16, fill: "#7c3aed" },
  { band: "81-100", label: "Contractor Ready", count: 7, fill: "#2d6a4f" },
];

const PROGRAMME_SMES: EsdSme[] = [
  { name: "Limpopo Steel Fabricators", province: "Limpopo", sector: "Manufacturing", programmeType: "Supplier Dev", spendAllocated: "R4.2M", devScore: 91, status: "on-track", jobsCreated: 34, mentor: "Thabo Nkosi" },
  { name: "Soweto Safety Solutions", province: "Gauteng", sector: "Security & Services", programmeType: "Enterprise Dev", spendAllocated: "R1.2M", devScore: 71, status: "on-track", jobsCreated: 12, mentor: "Naledi Dlamini" },
  { name: "Durban Packaging Co", province: "KwaZulu-Natal", sector: "Manufacturing", programmeType: "Supplier Dev", spendAllocated: "R3.4M", devScore: 78, status: "on-track", jobsCreated: 28, mentor: "Sipho Mkhize" },
  { name: "Joburg Green Cleaning", province: "Gauteng", sector: "Facilities", programmeType: "Enterprise Dev", spendAllocated: "R480K", devScore: 52, status: "at-risk", jobsCreated: 6, mentor: "Refilwe Mokoena" },
  { name: "Cape Agri Processors", province: "Western Cape", sector: "Agri-processing", programmeType: "Supplier Dev", spendAllocated: "R2.1M", devScore: 89, status: "on-track", jobsCreated: 22, mentor: "Dirk van Wyk" },
  { name: "Pretoria IT Solutions", province: "Gauteng", sector: "ICT", programmeType: "Enterprise Dev", spendAllocated: "R680K", devScore: 65, status: "on-track", jobsCreated: 8, mentor: "Zanele Khumalo" },
  { name: "Kimberley Logistics", province: "Northern Cape", sector: "Logistics", programmeType: "Supplier Dev", spendAllocated: "R1.6M", devScore: 43, status: "at-risk", jobsCreated: 14, mentor: "Pieter Botha" },
  { name: "Mpumalanga Mining Svcs", province: "Mpumalanga", sector: "Mining Services", programmeType: "Supplier Dev", spendAllocated: "R4.8M", devScore: 91, status: "on-track", jobsCreated: 41, mentor: "Grace Sithole" },
  { name: "Bloemfontein Catering", province: "Free State", sector: "Hospitality", programmeType: "Enterprise Dev", spendAllocated: "R320K", devScore: 38, status: "stalled", jobsCreated: 5, mentor: "Lerato Molefe" },
  { name: "Rustenburg Construction", province: "North West", sector: "Construction", programmeType: "Supplier Dev", spendAllocated: "R1.9M", devScore: 77, status: "on-track", jobsCreated: 18, mentor: "Andrew Jacobs" },
];

const ALLYRA_SIGNALS = [
  "Bloemfontein Catering has shown no Allyra activity in 52 days — growth plan at 0% progress and Q1 financials not uploaded. Verification period ends in 87 days.",
  "Kimberley Logistics engagement score dropped from 68 to 43 over 6 weeks — TA provider last logged activity in February. Procurement readiness sub-score at 21%.",
  "B-BBEE verification 87 days away — Enterprise Development spend currently 67% of target (R11.4M vs R17M). 5 SMEs eligible for accelerated spend this quarter.",
  "3 contractor-ready SMEs (Limpopo Steel, Cape Agri, Mpumalanga Mining) have not bid on any Sipho Resources tenders in Q1 — procurement team referral recommended.",
  "Average Development Score for Supplier Dev SMEs (74) is 18 points higher than Enterprise Dev SMEs (56) — consider additional TA resourcing for ED cohort.",
];

/* ─── Helpers ──────────────────────────────────────── */

function devScoreColor(score: number) {
  if (score >= 81) return "#2d6a4f";
  if (score >= 61) return "#7c3aed";
  if (score >= 41) return "#d97706";
  return "#dc2626";
}

function statusColor(status: string) {
  if (status === "on-track") return { bg: "#f0faf4", text: "#2d6a4f", border: "#c6e9d4", label: "On Track" };
  if (status === "at-risk") return { bg: "#fffbeb", text: "#d97706", border: "#fde68a", label: "At Risk" };
  return { bg: "#fef2f2", text: "#dc2626", border: "#fecaca", label: "Stalled" };
}

function procurementColor(p: string) {
  if (p === "Contracted") return { bg: "#f0faf4", text: "#2d6a4f", border: "#c6e9d4" };
  if (p === "Bidding") return { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" };
  return { bg: "#f5f5f4", text: "#78716c", border: "#e7e5e4" };
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

export function EsdDashboard() {
  const [selectedSme, setSelectedSme] = useState<EsdSme | null>(null);

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* ─── Top Bar ─── */}
      <header className="bg-white border-b border-[var(--allyra-neutral-200)] px-5 py-3 flex items-center gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-[18px] text-[var(--allyra-neutral-900)] truncate" style={{ fontWeight: 600 }}>
            ESD Dashboard
          </h1>
          <p className="text-[12px] text-[var(--allyra-neutral-500)]">B-BBEE verification period overview</p>
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
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f5f3ff] border border-[#ddd6fe]">
          <Award className="w-3.5 h-3.5" style={{ color: "#7c3aed" }} strokeWidth={2} />
          <span className="text-[12px]" style={{ fontWeight: 600, color: "#7c3aed" }}>Sipho Resources</span>
        </div>
      </header>

      {/* ─── Content ─── */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex">
          {/* Main Content */}
          <div className="flex-1 min-w-0 p-5 space-y-5">

            {/* ── KPI Cards ── */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <SectionHeader title="Programme Overview" />
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
                {SUMMARY_CARDS.map((card) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={card.label}
                      className="rounded-xl border bg-white px-4 py-3.5 hover:shadow-md transition-all group overflow-hidden"
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
                            color: "#2d6a4f",
                            backgroundColor: "#f0faf4",
                          }}
                        >
                          <ArrowUpRight className="w-3 h-3" />
                          {card.trend}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* ── Allyra Intelligence Panel ── */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}>
              <SectionHeader title="Allyra Development Intelligence" />
              <div
                className="rounded-xl p-5 cursor-pointer hover:shadow-lg transition-all"
                style={{ backgroundColor: "#4c1d95" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-5 h-5 text-[#c4b5fd]" strokeWidth={2} />
                  <span className="text-[13px] text-[#ede9fe]" style={{ fontWeight: 600 }}>Development Intelligence</span>
                  <ChevronRight className="w-4 h-4 text-[#c4b5fd] ml-auto" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
                  {ALLYRA_INTELLIGENCE.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="rounded-lg p-3" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                        <Icon className="w-4 h-4 mb-2" style={{ color: item.color }} strokeWidth={2} />
                        <p className="text-[20px] text-white leading-none" style={{ fontWeight: 700 }}>{item.value}</p>
                        <p className="text-[10px] text-[#ddd6fe] mt-1" style={{ fontWeight: 500 }}>{item.label}</p>
                        <p className="text-[10px] text-[#c4b5fd] opacity-70 mt-0.5">{item.sub}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* ── Programme Pipeline ── */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
              <SectionHeader title="Programme Pipeline" />
              <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5">
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
                          style={{ backgroundColor: "#7c3aed", opacity: 1 - i * 0.12 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── Programme Mix ── */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.12 }}>
              <SectionHeader title="Programme Mix" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* By Programme Type */}
                <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5">
                  <p className="text-[13px] text-[var(--allyra-neutral-700)] mb-3" style={{ fontWeight: 600 }}>By Programme Type</p>
                  <div className="h-28">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={PROGRAMME_TYPE_DATA} layout="vertical" margin={{ left: 10 }}>
                        <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={150} />
                        <Tooltip contentStyle={{ fontSize: "12px", borderRadius: "8px", border: "1px solid #e5e7eb" }} />
                        <Bar dataKey="value" fill="#7c3aed" radius={[0, 4, 4, 0]} barSize={18} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                {/* By Sector */}
                <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5">
                  <p className="text-[13px] text-[var(--allyra-neutral-700)] mb-3" style={{ fontWeight: 600 }}>By Sector</p>
                  <div className="h-44">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={SECTOR_DATA} layout="vertical" margin={{ left: 10 }}>
                        <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={130} />
                        <Tooltip contentStyle={{ fontSize: "12px", borderRadius: "8px", border: "1px solid #e5e7eb" }} />
                        <Bar dataKey="value" fill="#a78bfa" radius={[0, 4, 4, 0]} barSize={14} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── B-BBEE Compliance ── */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}>
              <SectionHeader title="B-BBEE Compliance Progress" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Spend vs Target */}
                <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5">
                  <p className="text-[13px] text-[var(--allyra-neutral-700)] mb-3" style={{ fontWeight: 600 }}>Spend vs Target</p>
                  <div className="space-y-4">
                    {SPEND_TARGETS.map((s, i) => (
                      <div key={s.label}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[12px] text-[var(--allyra-neutral-600)]">{s.label}</span>
                          <span className="text-[12px] text-[var(--allyra-neutral-700)]" style={{ fontWeight: 600 }}>
                            R{s.spend}M / R{s.target}M ({s.pct}%)
                          </span>
                        </div>
                        <div className="h-3 bg-[var(--allyra-neutral-100)] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${s.pct}%` }}
                            transition={{ duration: 0.6, delay: 0.2 + i * 0.06 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: s.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* ESD Points Progress */}
                <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5">
                  <p className="text-[13px] text-[var(--allyra-neutral-700)] mb-3" style={{ fontWeight: 600 }}>ESD Points Progress</p>
                  <div className="space-y-4">
                    {BBEE_POINTS.map((p, i) => (
                      <div key={p.label}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[12px] text-[var(--allyra-neutral-600)]">{p.label}</span>
                          <span className="text-[12px] text-[var(--allyra-neutral-700)]" style={{ fontWeight: 600 }}>
                            {p.current}/{p.target} (proj: {p.projected})
                          </span>
                        </div>
                        <div className="h-3 bg-[var(--allyra-neutral-100)] rounded-full overflow-hidden relative">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${p.pct}%` }}
                            transition={{ duration: 0.6, delay: 0.2 + i * 0.06 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: p.color }}
                          />
                        </div>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-[var(--allyra-neutral-100)]">
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] text-[var(--allyra-neutral-700)]" style={{ fontWeight: 600 }}>Total ESD Points</span>
                        <span className="text-[13px]" style={{ fontWeight: 700, color: "#7c3aed" }}>14.2 / 19 (proj: 14.7)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Development Score Distribution ── */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
              <SectionHeader title="Allyra Development Score Distribution" />
              <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <div>
                    <p className="text-[12px] text-[var(--allyra-neutral-500)] mb-3">
                      Distribution of Development Scores across 48 active programme SMEs. Higher scores reflect deeper development progress and stronger procurement readiness.
                    </p>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={SCORE_DISTRIBUTION} margin={{ left: 0, right: 10 }}>
                          <XAxis dataKey="band" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                          <Tooltip contentStyle={{ fontSize: "12px", borderRadius: "8px", border: "1px solid #e5e7eb" }} />
                          <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={36}>
                            {SCORE_DISTRIBUTION.map((entry, index) => (
                              <Cell key={index} fill={entry.fill} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <p className="text-[12px] text-[var(--allyra-neutral-700)] mb-2" style={{ fontWeight: 600 }}>Development Implications</p>
                    {[
                      { band: "81-100", label: "Contractor Ready", count: 7, color: "#2d6a4f", note: "Ready for procurement. Prioritise for supplier pipeline." },
                      { band: "61-80", label: "Strong Progress", count: 16, color: "#7c3aed", note: "On development trajectory. Active mentoring sufficient." },
                      { band: "41-60", label: "Developing", count: 14, color: "#d97706", note: "Support gaps identified. Structured intervention recommended." },
                      { band: "21-40", label: "Early Stage", count: 8, color: "#ea580c", note: "Foundation building phase. Intensive TA required." },
                      { band: "0-20", label: "Onboarding", count: 3, color: "#dc2626", note: "Recently enrolled. Baseline assessment in progress." },
                    ].map((b) => (
                      <div key={b.band} className="flex items-center gap-3 p-2 rounded-lg bg-[var(--allyra-neutral-50)]">
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: b.color }} />
                        <div className="flex-1 min-w-0">
                          <span className="text-[12px] text-[var(--allyra-neutral-700)]" style={{ fontWeight: 600 }}>{b.band}</span>
                          <span className="text-[12px] text-[var(--allyra-neutral-500)]"> — {b.label}</span>
                          <p className="text-[11px] text-[var(--allyra-neutral-400)] mt-0.5">{b.note}</p>
                        </div>
                        <span className="text-[11px] text-[var(--allyra-neutral-500)] shrink-0">{b.count} SMEs</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Programme SMEs Table ── */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}>
              <SectionHeader title="Programme SMEs" />
              <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-[var(--allyra-neutral-100)]">
                        {["SME", "Province", "Sector", "Programme", "Spend", "Dev Score", "Status", "Procurement"].map((h) => (
                          <th key={h} className="px-4 py-3 text-[11px] tracking-[0.04em] uppercase text-[var(--allyra-neutral-500)]" style={{ fontWeight: 600 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {PROGRAMME_SMES.map((sme) => {
                        const sc = devScoreColor(sme.devScore);
                        const st = statusColor(sme.status);
                        const procStatus = sme.devScore >= 81 ? "Contracted" : sme.devScore >= 61 ? "Bidding" : "Not yet";
                        const pc = procurementColor(procStatus);
                        return (
                          <tr
                            key={sme.name}
                            className="border-b border-[var(--allyra-neutral-50)] hover:bg-[var(--allyra-neutral-50)] cursor-pointer transition-colors"
                            onClick={() => setSelectedSme(sme)}
                          >
                            <td className="px-4 py-3">
                              <p className="text-[13px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 500 }}>{sme.name}</p>
                              <p className="text-[11px] text-[var(--allyra-neutral-500)]">{sme.sector}</p>
                            </td>
                            <td className="px-4 py-3 text-[13px] text-[var(--allyra-neutral-600)]">{sme.province}</td>
                            <td className="px-4 py-3 text-[13px] text-[var(--allyra-neutral-600)]">{sme.sector}</td>
                            <td className="px-4 py-3 text-[13px] text-[var(--allyra-neutral-600)]">{sme.programmeType}</td>
                            <td className="px-4 py-3 text-[13px] text-[var(--allyra-neutral-700)]" style={{ fontWeight: 600 }}>{sme.spendAllocated}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <svg viewBox="0 0 36 36" className="w-7 h-7 -rotate-90 shrink-0">
                                  <circle cx="18" cy="18" r="14" fill="none" stroke="var(--allyra-neutral-100)" strokeWidth="3" />
                                  <circle cx="18" cy="18" r="14" fill="none" stroke={sc} strokeWidth="3"
                                    strokeLinecap="round" strokeDasharray={`${sme.devScore * 0.88} 100`} />
                                </svg>
                                <span className="text-[12px]" style={{ fontWeight: 700, color: sc }}>{sme.devScore}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className="text-[10px] tracking-[0.04em] uppercase px-2 py-0.5 rounded-full"
                                style={{ fontWeight: 600, color: st.text, backgroundColor: st.bg, border: `1px solid ${st.border}` }}
                              >
                                {st.label}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className="text-[10px] tracking-[0.04em] uppercase px-2 py-0.5 rounded-full"
                                style={{ fontWeight: 600, color: pc.text, backgroundColor: pc.bg, border: `1px solid ${pc.border}` }}
                              >
                                {procStatus}
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
          <aside className="hidden xl:block w-[260px] shrink-0 border-l border-[var(--allyra-neutral-200)] bg-white p-5">
            <div className="sticky top-5">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4" style={{ color: "#7c3aed" }} strokeWidth={2} />
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

              {/* Portfolio Snapshot */}
              <div className="mt-6 p-3 rounded-lg border border-[#ddd6fe] bg-[#f5f3ff]">
                <p className="text-[11px] tracking-[0.04em] uppercase text-[#7c3aed] mb-2" style={{ fontWeight: 600 }}>Portfolio Snapshot</p>
                <div className="space-y-1.5">
                  {[
                    { label: "Total Programme SMEs", value: "48" },
                    { label: "Active on Allyra", value: "39" },
                    { label: "B-BBEE Period", value: "87 days remaining" },
                    { label: "Avg Dev Score", value: "72" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center justify-between">
                      <span className="text-[11px] text-[#7c3aed]">{s.label}</span>
                      <span className="text-[11px]" style={{ fontWeight: 700, color: "#7c3aed" }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ─── SME Drawer ─── */}
      <EsdSmeDrawer sme={selectedSme} onClose={() => setSelectedSme(null)} />
    </div>
  );
}
