import { useNavigate } from "react-router";
import { ArrowLeft, Award, Briefcase, TrendingUp, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "motion/react";

const COHORT_REVENUE = [
  { name: "2022 Cohort", growth: 28 },
  { name: "2023 Cohort", growth: 34 },
  { name: "2024 Cohort", growth: 38 },
  { name: "2025 Cohort", growth: 41 },
];

const JOBS_BY_SECTOR = [
  { name: "Manufacturing", jobs: 87 },
  { name: "Mining Services", jobs: 74 },
  { name: "Construction", jobs: 58 },
  { name: "Logistics & Transport", jobs: 43 },
  { name: "Agri-processing", jobs: 36 },
  { name: "Security & Services", jobs: 24 },
  { name: "ICT", jobs: 12 },
  { name: "Hospitality", jobs: 8 },
];

const IMPACT_METRICS = [
  { label: "Total Revenue Generated", value: "R284M", sub: "across all programme SMEs", color: "#7c3aed" },
  { label: "Women-Owned SMEs", value: "42%", sub: "of programme participants", color: "#2d6a4f" },
  { label: "Youth-Owned SMEs", value: "28%", sub: "owners under 35", color: "#1d4ed8" },
  { label: "Rural SMEs", value: "31%", sub: "outside metro areas", color: "#d97706" },
  { label: "Graduated Suppliers", value: "12", sub: "now self-sustaining", color: "#0891b2" },
  { label: "Avg Revenue Growth", value: "34%", sub: "year-on-year", color: "#dc2626" },
];

export function EsdImpact() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <header className="bg-white border-b border-[var(--allyra-neutral-200)] px-5 py-3 flex items-center gap-4">
        <button onClick={() => navigate("/esd-dashboard")} className="lg:hidden w-8 h-8 rounded-lg hover:bg-[var(--allyra-neutral-100)] flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-[var(--allyra-neutral-600)]" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-[18px] text-[var(--allyra-neutral-900)] truncate" style={{ fontWeight: 600 }}>Impact & Outcomes</h1>
          <p className="text-[12px] text-[var(--allyra-neutral-500)]">Programme impact measurement and social outcomes</p>
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
              { label: "Jobs Supported", value: "342", sub: "direct jobs created", icon: Briefcase, color: "#0f766e", bg: "#f0fdfa", border: "#99f6e4" },
              { label: "Revenue Growth Avg", value: "34%", sub: "year-on-year growth", icon: TrendingUp, color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe" },
              { label: "Graduation Rate", value: "25%", sub: "SMEs self-sustaining", icon: Users, color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe" },
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

          {/* Impact Metrics Grid */}
          <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5">
            <p className="text-[14px] text-[var(--allyra-neutral-800)] mb-4" style={{ fontWeight: 600 }}>Programme Impact Metrics</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {IMPACT_METRICS.map((m) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-lg bg-[var(--allyra-neutral-50)] p-4"
                >
                  <p className="text-[24px] leading-none mb-1" style={{ fontWeight: 700, color: m.color }}>{m.value}</p>
                  <p className="text-[13px] text-[var(--allyra-neutral-700)]" style={{ fontWeight: 500 }}>{m.label}</p>
                  <p className="text-[11px] text-[var(--allyra-neutral-500)] mt-0.5">{m.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Revenue Growth by Cohort */}
            <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5">
              <p className="text-[13px] text-[var(--allyra-neutral-700)] mb-3" style={{ fontWeight: 600 }}>Revenue Growth by Cohort (%)</p>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={COHORT_REVENUE} margin={{ left: 0, right: 10 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} unit="%" />
                    <Tooltip contentStyle={{ fontSize: "12px", borderRadius: "8px", border: "1px solid #e5e7eb" }} formatter={(v) => [`${v}%`, "Growth"]} />
                    <Bar dataKey="growth" fill="#7c3aed" radius={[4, 4, 0, 0]} barSize={36} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Jobs by Sector */}
            <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5">
              <p className="text-[13px] text-[var(--allyra-neutral-700)] mb-3" style={{ fontWeight: 600 }}>Jobs Created by Sector</p>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={JOBS_BY_SECTOR} layout="vertical" margin={{ left: 10 }}>
                    <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={130} />
                    <Tooltip contentStyle={{ fontSize: "12px", borderRadius: "8px", border: "1px solid #e5e7eb" }} />
                    <Bar dataKey="jobs" fill="#a78bfa" radius={[0, 4, 4, 0]} barSize={14} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
