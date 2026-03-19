import { useNavigate } from "react-router";
import { ArrowLeft, AlertTriangle, Shield, TrendingDown, Landmark } from "lucide-react";
import { motion } from "motion/react";

const KPI_CARDS = [
  { label: "NPL Ratio", value: "3.8%", description: "Non-performing loans as % of total book", icon: AlertTriangle, color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
  { label: "Provisioning Coverage", value: "112%", description: "Provisions as % of NPL exposure", icon: Shield, color: "#0f766e", bg: "#f0fdfa", border: "#99f6e4" },
  { label: "Avg DSCR", value: "1.42x", description: "Weighted average debt service coverage ratio", icon: TrendingDown, color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe" },
];

const PAR_BANDS = [
  { label: "Current", count: 2256, pct: 94.0, color: "#2d6a4f" },
  { label: "PAR 1-30", count: 72, pct: 3.0, color: "#d97706" },
  { label: "PAR 31-60", count: 36, pct: 1.5, color: "#ea580c" },
  { label: "PAR 61-90", count: 24, pct: 1.0, color: "#dc2626" },
  { label: "PAR 90+", count: 12, pct: 0.5, color: "#991b1b" },
];

export function FspCreditRisk() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <header className="bg-white border-b border-[var(--allyra-neutral-200)] px-5 py-3 flex items-center gap-4">
        <button onClick={() => navigate("/fsp-dashboard")} className="lg:hidden w-8 h-8 rounded-lg hover:bg-[var(--allyra-neutral-100)] flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-[var(--allyra-neutral-600)]" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-[18px] text-[var(--allyra-neutral-900)] truncate" style={{ fontWeight: 600 }}>Credit & Risk</h1>
          <p className="text-[12px] text-[var(--allyra-neutral-500)]">Portfolio quality metrics and risk assessment</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f0fdfa] border border-[#99f6e4]">
          <Landmark className="w-3.5 h-3.5" style={{ color: "#0f766e" }} strokeWidth={2} />
          <span className="text-[12px]" style={{ fontWeight: 600, color: "#0f766e" }}>Pan-African Bank</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-5">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {KPI_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-xl border bg-white p-5 hover:shadow-md transition-all"
                  style={{ borderColor: card.border }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: card.bg }}>
                    <Icon className="w-5 h-5" style={{ color: card.color }} strokeWidth={1.8} />
                  </div>
                  <p className="text-[24px] text-[var(--allyra-neutral-900)]" style={{ fontWeight: 700 }}>{card.value}</p>
                  <p className="text-[11px] tracking-[0.04em] uppercase text-[var(--allyra-neutral-500)] mt-1" style={{ fontWeight: 600 }}>{card.label}</p>
                  <p className="text-[12px] text-[var(--allyra-neutral-500)] mt-1">{card.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* PAR Aging Detail */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5"
          >
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5" style={{ color: "#0f766e" }} strokeWidth={1.8} />
              <h2 className="text-[14px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 600 }}>PAR Aging Distribution</h2>
            </div>
            <p className="text-[12px] text-[var(--allyra-neutral-500)] mb-4">
              Portfolio at Risk breakdown by days past due, covering 2,400 active facilities.
            </p>
            <div className="space-y-3">
              {PAR_BANDS.map((band) => (
                <div key={band.label} className="flex items-center gap-3">
                  <span className="text-[12px] text-[var(--allyra-neutral-600)] w-20 shrink-0" style={{ fontWeight: 500 }}>{band.label}</span>
                  <div className="flex-1 h-6 bg-[var(--allyra-neutral-100)] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.max(band.pct, 1.5)}%` }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: band.color }}
                    />
                  </div>
                  <span className="text-[12px] text-[var(--allyra-neutral-700)] w-16 text-right" style={{ fontWeight: 600 }}>{band.count} ({band.pct}%)</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
