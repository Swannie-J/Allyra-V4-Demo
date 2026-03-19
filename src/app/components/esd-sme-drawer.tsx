import { X, MapPin, TrendingUp, CheckCircle2, MessageSquare, FileCheck, Clock, Activity } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface EsdSme {
  name: string;
  province: string;
  sector: string;
  programmeType: string;
  stage: string;
  spendAllocated: string;
  devScore: number;
  status: string;
  jobsCreated: number;
  mentor: string;
}

interface EsdSmeDrawerProps {
  sme: EsdSme | null;
  onClose: () => void;
}

function devScoreColor(score: number) {
  if (score >= 81) return "#2d6a4f";
  if (score >= 61) return "#0f766e";
  if (score >= 41) return "#d97706";
  if (score >= 21) return "#ea580c";
  return "#dc2626";
}

function devScoreLabel(score: number) {
  if (score >= 81) return "Contractor Ready";
  if (score >= 61) return "Strong Progress";
  if (score >= 41) return "Developing";
  if (score >= 21) return "Early Stage";
  return "Onboarding";
}

function statusColors(status: string) {
  if (status === "on-track") return { bg: "#f0faf4", text: "#2d6a4f", border: "#c6e9d4", label: "On Track" };
  if (status === "at-risk") return { bg: "#fffbeb", text: "#d97706", border: "#fde68a", label: "At Risk" };
  return { bg: "#fef2f2", text: "#dc2626", border: "#fecaca", label: "Stalled" };
}

function subDimensions(score: number) {
  const base = score / 100;
  const clamp = (v: number) => Math.min(100, Math.max(0, Math.round(v)));
  return [
    { label: "Business Profile Completeness", value: clamp(base * 110 - 3) },
    { label: "Engagement Recency", value: clamp(base * 95 + 2) },
    { label: "Growth Plan Progress", value: clamp(base * 90 - 5) },
    { label: "Financial Compliance", value: clamp(base * 100) },
    { label: "Procurement Readiness", value: clamp(base * 85 + 5) },
    { label: "Mentor Engagement", value: clamp(base * 92 - 2) },
  ];
}

export function EsdSmeDrawer({ sme, onClose }: EsdSmeDrawerProps) {
  if (!sme) return null;

  const sc = devScoreColor(sme.devScore);
  const dims = subDimensions(sme.devScore);
  const statusStyle = statusColors(sme.status);

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
              <h2 className="text-[16px] text-[var(--allyra-neutral-900)]" style={{ fontWeight: 600 }}>{sme.name}</h2>
              <p className="text-[12px] text-[var(--allyra-neutral-500)] flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3 h-3" />
                {sme.province} · {sme.sector}
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
                  { label: "Spend Allocated", value: sme.spendAllocated },
                  { label: "Programme Type", value: sme.programmeType },
                  { label: "Stage", value: sme.stage },
                  { label: "Jobs Created", value: String(sme.jobsCreated) },
                ].map((m) => (
                  <div key={m.label} className="rounded-lg bg-[var(--allyra-neutral-50)] p-3">
                    <p className="text-[10px] tracking-[0.04em] uppercase text-[var(--allyra-neutral-400)]" style={{ fontWeight: 600 }}>{m.label}</p>
                    <p className="text-[14px] text-[var(--allyra-neutral-800)] mt-0.5" style={{ fontWeight: 600 }}>{m.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Allyra Development Score */}
            <div>
              <p className="text-[11px] tracking-[0.05em] uppercase text-[var(--allyra-neutral-400)] mb-3" style={{ fontWeight: 600 }}>
                Allyra Development Score
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
                      animate={{ strokeDasharray: `${sme.devScore * 0.88} 100` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[18px]" style={{ fontWeight: 700, color: sc }}>{sme.devScore}</span>
                  </div>
                </div>
                <div>
                  <p className="text-[14px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 600 }}>{devScoreLabel(sme.devScore)}</p>
                  <p className="text-[12px] text-[var(--allyra-neutral-500)] mt-0.5">
                    {sme.devScore >= 81
                      ? "Contractor ready — prioritise for procurement pipeline"
                      : sme.devScore >= 61
                      ? "Strong development trajectory — active mentoring sufficient"
                      : sme.devScore >= 41
                      ? "Support gaps identified — structured intervention recommended"
                      : "Foundation building phase — intensive TA required"}
                  </p>
                </div>
              </div>

              {/* Sub-dimensions */}
              <div className="space-y-2.5">
                {dims.map((d) => {
                  const dimColor = devScoreColor(d.value);
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

            {/* Development Status */}
            <div>
              <p className="text-[11px] tracking-[0.05em] uppercase text-[var(--allyra-neutral-400)] mb-3" style={{ fontWeight: 600 }}>
                Development Status
              </p>
              <div className="rounded-lg p-3" style={{ backgroundColor: statusStyle.bg, border: `1px solid ${statusStyle.border}` }}>
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4" style={{ color: statusStyle.text }} strokeWidth={2} />
                  <span className="text-[13px] uppercase tracking-[0.04em]" style={{ fontWeight: 700, color: statusStyle.text }}>
                    {statusStyle.label}
                  </span>
                </div>
                <p className="text-[12px]" style={{ color: statusStyle.text }}>
                  {sme.status === "on-track"
                    ? "Development milestones progressing as expected. Engagement levels healthy."
                    : sme.status === "at-risk"
                    ? "Some development indicators declining. Proactive intervention recommended."
                    : "Development progress stalled. Urgent mentor contact and TA review required."}
                </p>
              </div>
            </div>

            {/* Programme Details */}
            <div>
              <p className="text-[11px] tracking-[0.05em] uppercase text-[var(--allyra-neutral-400)] mb-3" style={{ fontWeight: 600 }}>
                Programme Details
              </p>
              <div className="space-y-2">
                {[
                  { label: "Cohort Intake", value: "January 2025" },
                  { label: "Expected Graduation", value: "December 2025" },
                  { label: "Mentor Assigned", value: sme.mentor },
                  { label: "Programme Type", value: sme.programmeType },
                  { label: "Next Milestone", value: "Q2 Business Review — April 2026" },
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
                  { text: "Growth plan milestone completed", time: "3 days ago", icon: CheckCircle2 },
                  { text: "Mentor session logged", time: "1 week ago", icon: MessageSquare },
                  { text: "Q1 financials uploaded to Allyra", time: "2 weeks ago", icon: FileCheck },
                ].map((a, i) => {
                  const AIcon = a.icon;
                  return (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-[#f5f3ff] flex items-center justify-center shrink-0 mt-0.5">
                        <AIcon className="w-3 h-3" style={{ color: "#7c3aed" }} strokeWidth={2} />
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
              <button className="flex-1 py-2 rounded-lg text-[13px] text-white transition-colors" style={{ fontWeight: 600, backgroundColor: "#7c3aed" }}>
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
