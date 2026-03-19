import { useNavigate } from "react-router";
import { ArrowLeft, Award, ShieldCheck, TrendingUp, Clock } from "lucide-react";
import { motion } from "motion/react";

const SPEND_DATA = [
  { label: "Supplier Development", spend: 27, target: 35, pct: 77, color: "#7c3aed" },
  { label: "Enterprise Development", spend: 11.4, target: 17, pct: 67, color: "#a78bfa" },
  { label: "Total ESD Spend", spend: 38.4, target: 52, pct: 74, color: "#4c1d95" },
];

const BBEE_POINTS = [
  { label: "SD Points", current: 7.7, target: 10, projected: 10.0, pct: 77, color: "#7c3aed" },
  { label: "ED Points", current: 3.4, target: 5, projected: 4.7, pct: 68, color: "#a78bfa" },
  { label: "Bonus Points (Dev Score)", current: 3.1, target: 4, projected: 3.1, pct: 78, color: "#c4b5fd" },
  { label: "Total ESD Points", current: 14.2, target: 19, projected: 14.7, pct: 75, color: "#4c1d95" },
];

const TIMELINE_ITEMS = [
  { label: "Verification Period Start", date: "1 March 2025", done: true },
  { label: "Mid-year Compliance Review", date: "1 September 2025", done: true },
  { label: "Q3 Spend Report Submitted", date: "15 January 2026", done: true },
  { label: "B-BBEE Verification Audit", date: "14 June 2026", done: false, highlight: true },
  { label: "Verification Period End", date: "28 February 2027", done: false },
];

export function EsdCompliance() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <header className="bg-white border-b border-[var(--allyra-neutral-200)] px-5 py-3 flex items-center gap-4">
        <button onClick={() => navigate("/esd-dashboard")} className="lg:hidden w-8 h-8 rounded-lg hover:bg-[var(--allyra-neutral-100)] flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-[var(--allyra-neutral-600)]" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-[18px] text-[var(--allyra-neutral-900)] truncate" style={{ fontWeight: 600 }}>Compliance & Spend</h1>
          <p className="text-[12px] text-[var(--allyra-neutral-500)]">B-BBEE ESD spend tracking and points progress</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f5f3ff] border border-[#ddd6fe]">
          <Award className="w-3.5 h-3.5" style={{ color: "#7c3aed" }} strokeWidth={2} />
          <span className="text-[12px]" style={{ fontWeight: 600, color: "#7c3aed" }}>Sipho Resources</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-5">
        <div className="max-w-5xl mx-auto space-y-5">

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "ESD Spend", value: "R38.4M", sub: "of R52M target (74%)", icon: TrendingUp, color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe" },
              { label: "SD Points", value: "7.7 / 10", sub: "Supplier Development", icon: ShieldCheck, color: "#2d6a4f", bg: "#f0faf4", border: "#c6e9d4" },
              { label: "ED Points", value: "3.4 / 5", sub: "Enterprise Development", icon: Award, color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe" },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.label} className="rounded-xl border bg-white px-5 py-4" style={{ borderColor: card.border }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: card.bg }}>
                      <Icon className="w-4 h-4" style={{ color: card.color }} strokeWidth={2} />
                    </div>
                    <p className="text-[13px] text-[var(--allyra-neutral-600)]" style={{ fontWeight: 600 }}>{card.label}</p>
                  </div>
                  <p className="text-[24px] text-[var(--allyra-neutral-900)] leading-none" style={{ fontWeight: 700 }}>{card.value}</p>
                  <p className="text-[11px] text-[var(--allyra-neutral-500)] mt-1">{card.sub}</p>
                </div>
              );
            })}
          </div>

          {/* Spend Breakdown */}
          <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5">
            <p className="text-[14px] text-[var(--allyra-neutral-800)] mb-4" style={{ fontWeight: 600 }}>Spend vs Target Breakdown</p>
            <div className="space-y-5">
              {SPEND_DATA.map((s, i) => (
                <div key={s.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[13px] text-[var(--allyra-neutral-700)]" style={{ fontWeight: 500 }}>{s.label}</span>
                    <span className="text-[13px] text-[var(--allyra-neutral-700)]" style={{ fontWeight: 600 }}>
                      R{s.spend}M <span className="text-[var(--allyra-neutral-400)] font-normal">of R{s.target}M</span> — {s.pct}%
                    </span>
                  </div>
                  <div className="h-4 bg-[var(--allyra-neutral-100)] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.pct}%` }}
                      transition={{ duration: 0.7, delay: 0.1 + i * 0.08 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: s.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* B-BBEE Points Progress */}
          <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5">
            <p className="text-[14px] text-[var(--allyra-neutral-800)] mb-4" style={{ fontWeight: 600 }}>B-BBEE ESD Points Progress</p>
            <div className="space-y-5">
              {BBEE_POINTS.map((p, i) => (
                <div key={p.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[13px] text-[var(--allyra-neutral-700)]" style={{ fontWeight: 500 }}>{p.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[13px] text-[var(--allyra-neutral-700)]" style={{ fontWeight: 600 }}>
                        {p.current} / {p.target}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#f5f3ff] text-[#7c3aed]" style={{ fontWeight: 600 }}>
                        Proj: {p.projected}
                      </span>
                    </div>
                  </div>
                  <div className="h-4 bg-[var(--allyra-neutral-100)] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${p.pct}%` }}
                      transition={{ duration: 0.7, delay: 0.1 + i * 0.08 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: p.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verification Timeline */}
          <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4" style={{ color: "#7c3aed" }} strokeWidth={2} />
              <p className="text-[14px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 600 }}>Verification Timeline</p>
              <span className="ml-auto text-[12px] px-3 py-1 rounded-full" style={{ fontWeight: 600, backgroundColor: "#fef2f2", color: "#dc2626" }}>
                87 days to audit
              </span>
            </div>
            <div className="space-y-3">
              {TIMELINE_ITEMS.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{
                      backgroundColor: item.done ? "#2d6a4f" : item.highlight ? "#dc2626" : "var(--allyra-neutral-300)",
                    }}
                  />
                  <div className="flex-1 flex items-center justify-between">
                    <span
                      className="text-[13px]"
                      style={{
                        fontWeight: item.highlight ? 700 : 400,
                        color: item.highlight ? "#dc2626" : item.done ? "var(--allyra-neutral-700)" : "var(--allyra-neutral-500)",
                      }}
                    >
                      {item.label}
                    </span>
                    <span className="text-[12px] text-[var(--allyra-neutral-500)]">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
