import { X, MapPin, Banknote, TrendingUp, Shield, Brain, Clock, FileCheck, MessageSquare, CheckCircle2, Activity } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface Borrower {
  name: string;
  country: string;
  sector: string;
  product: string;
  outstanding: string;
  dscr: number;
  par: string;
  allyraScore: number;
  risk: string;
}

interface BorrowerDetailDrawerProps {
  borrower: Borrower | null;
  onClose: () => void;
}

const riskColors = {
  low: { bg: "#f0faf4", text: "#2d6a4f", border: "#c6e9d4" },
  medium: { bg: "#fffbeb", text: "#d97706", border: "#fde68a" },
  high: { bg: "#fef2f2", text: "#dc2626", border: "#fecaca" },
};

function scoreColor(score: number) {
  if (score >= 81) return "#2d6a4f";
  if (score >= 61) return "#0f766e";
  if (score >= 41) return "#d97706";
  return "#dc2626";
}

function scoreLabel(score: number) {
  if (score >= 81) return "Deep Knowledge";
  if (score >= 61) return "Strong Knowledge";
  if (score >= 41) return "Moderate Knowledge";
  if (score >= 21) return "Limited Knowledge";
  return "Minimal Knowledge";
}

// Generate sub-dimension scores based on the composite score
function subDimensions(score: number) {
  const base = score / 100;
  return [
    { label: "Data Completeness", value: Math.min(100, Math.round(base * 110 + (Math.random() * 10 - 5))), icon: FileCheck },
    { label: "Engagement Recency", value: Math.min(100, Math.round(base * 95 + (Math.random() * 15 - 7))), icon: Clock },
    { label: "Document Freshness", value: Math.min(100, Math.round(base * 100 + (Math.random() * 12 - 6))), icon: Banknote },
    { label: "Growth Plan Activity", value: Math.min(100, Math.round(base * 85 + (Math.random() * 20 - 10))), icon: TrendingUp },
    { label: "Conversation Depth", value: Math.min(100, Math.round(base * 90 + (Math.random() * 14 - 7))), icon: MessageSquare },
    { label: "Verification Level", value: Math.min(100, Math.round(base * 88 + (Math.random() * 16 - 8))), icon: CheckCircle2 },
  ];
}

export function BorrowerDetailDrawer({ borrower, onClose }: BorrowerDetailDrawerProps) {
  if (!borrower) return null;

  const rc = riskColors[borrower.risk as keyof typeof riskColors] || riskColors.low;
  const sc = scoreColor(borrower.allyraScore);
  const dims = subDimensions(borrower.allyraScore);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 z-50 flex items-start justify-end"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="h-full w-full max-w-[480px] bg-white shadow-2xl overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-[var(--allyra-neutral-200)] px-6 py-4 flex items-center justify-between z-10">
            <div>
              <h2 className="text-[16px] text-[var(--allyra-neutral-900)]" style={{ fontWeight: 600 }}>{borrower.name}</h2>
              <p className="text-[12px] text-[var(--allyra-neutral-500)] flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3 h-3" />
                {borrower.country} · {borrower.sector}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-[var(--allyra-neutral-100)] flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-[var(--allyra-neutral-500)]" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Key Metrics */}
            <div>
              <p className="text-[11px] tracking-[0.05em] uppercase text-[var(--allyra-neutral-400)] mb-3" style={{ fontWeight: 600 }}>
                Key Metrics
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Outstanding", value: borrower.outstanding },
                  { label: "DSCR", value: `${borrower.dscr}x` },
                  { label: "PAR Status", value: borrower.par },
                  { label: "Loan Product", value: borrower.product },
                ].map((m) => (
                  <div key={m.label} className="rounded-lg bg-[var(--allyra-neutral-50)] p-3">
                    <p className="text-[10px] tracking-[0.04em] uppercase text-[var(--allyra-neutral-400)]" style={{ fontWeight: 600 }}>{m.label}</p>
                    <p className="text-[14px] text-[var(--allyra-neutral-800)] mt-0.5" style={{ fontWeight: 600 }}>{m.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Allyra Knowledge Score */}
            <div>
              <p className="text-[11px] tracking-[0.05em] uppercase text-[var(--allyra-neutral-400)] mb-3" style={{ fontWeight: 600 }}>
                Allyra Knowledge Score
              </p>
              <div className="flex items-center gap-5 mb-4">
                {/* Radial Gauge */}
                <div className="relative w-20 h-20 shrink-0">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="var(--allyra-neutral-100)" strokeWidth="3" />
                    <motion.circle
                      cx="18" cy="18" r="14" fill="none" stroke={sc} strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: "0 100" }}
                      animate={{ strokeDasharray: `${borrower.allyraScore * 0.88} 100` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[18px]" style={{ fontWeight: 700, color: sc }}>{borrower.allyraScore}</span>
                  </div>
                </div>
                <div>
                  <p className="text-[14px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 600 }}>{scoreLabel(borrower.allyraScore)}</p>
                  <p className="text-[12px] text-[var(--allyra-neutral-500)] mt-0.5">
                    {borrower.allyraScore >= 61
                      ? "Sufficient data depth for confident risk assessment"
                      : "Limited engagement data — additional due diligence recommended"}
                  </p>
                </div>
              </div>

              {/* Sub-dimensions */}
              <div className="space-y-2.5">
                {dims.map((d) => {
                  const dimColor = scoreColor(d.value);
                  return (
                    <div key={d.label}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[12px] text-[var(--allyra-neutral-600)]">{d.label}</span>
                        <span className="text-[11px]" style={{ fontWeight: 600, color: dimColor }}>{d.value}%</span>
                      </div>
                      <div className="h-1.5 bg-[var(--allyra-neutral-100)] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${d.value}%` }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: dimColor }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Risk Assessment */}
            <div>
              <p className="text-[11px] tracking-[0.05em] uppercase text-[var(--allyra-neutral-400)] mb-3" style={{ fontWeight: 600 }}>
                Risk Assessment
              </p>
              <div className="rounded-lg p-3" style={{ backgroundColor: rc.bg, border: `1px solid ${rc.border}` }}>
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-4 h-4" style={{ color: rc.text }} strokeWidth={2} />
                  <span className="text-[13px] uppercase tracking-[0.04em]" style={{ fontWeight: 700, color: rc.text }}>
                    {borrower.risk} risk
                  </span>
                </div>
                <p className="text-[12px]" style={{ color: rc.text }}>
                  {borrower.risk === "high"
                    ? "Elevated risk indicators detected. Close monitoring and proactive intervention recommended."
                    : borrower.risk === "medium"
                    ? "Some risk factors present. Standard monitoring with periodic review."
                    : "Risk indicators within acceptable parameters. Routine monitoring sufficient."}
                </p>
              </div>
            </div>

            {/* Loan Details */}
            <div>
              <p className="text-[11px] tracking-[0.05em] uppercase text-[var(--allyra-neutral-400)] mb-3" style={{ fontWeight: 600 }}>
                Loan Details
              </p>
              <div className="space-y-2">
                {[
                  { label: "Facility Amount", value: borrower.outstanding },
                  { label: "Tenor", value: "36 months" },
                  { label: "Maturity", value: "Dec 2028" },
                  { label: "Interest Rate", value: "Prime + 3.5%" },
                  { label: "Collateral", value: "Business assets + personal surety" },
                ].map((d) => (
                  <div key={d.label} className="flex items-center justify-between py-1.5 border-b border-[var(--allyra-neutral-50)]">
                    <span className="text-[12px] text-[var(--allyra-neutral-500)]">{d.label}</span>
                    <span className="text-[12px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 500 }}>{d.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <p className="text-[11px] tracking-[0.05em] uppercase text-[var(--allyra-neutral-400)] mb-3" style={{ fontWeight: 600 }}>
                Recent Activity
              </p>
              <div className="space-y-2.5">
                {[
                  { text: "Monthly financial update uploaded", time: "2 days ago", icon: FileCheck },
                  { text: "Growth plan milestone completed", time: "1 week ago", icon: CheckCircle2 },
                  { text: "Allyra check-in conversation", time: "2 weeks ago", icon: MessageSquare },
                ].map((a, i) => {
                  const AIcon = a.icon;
                  return (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-[#f0fdfa] flex items-center justify-center shrink-0 mt-0.5">
                        <AIcon className="w-3 h-3" style={{ color: "#0f766e" }} strokeWidth={2} />
                      </div>
                      <div>
                        <p className="text-[12px] text-[var(--allyra-neutral-700)]">{a.text}</p>
                        <p className="text-[11px] text-[var(--allyra-neutral-400)]">{a.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button className="flex-1 py-2 rounded-lg text-[13px] text-white transition-colors" style={{ fontWeight: 600, backgroundColor: "#0f766e" }}>
                View Full Profile
              </button>
              <button className="w-10 h-10 rounded-lg border border-[var(--allyra-neutral-200)] flex items-center justify-center hover:bg-[var(--allyra-neutral-50)] transition-colors">
                <Activity className="w-4 h-4 text-[var(--allyra-neutral-600)]" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
