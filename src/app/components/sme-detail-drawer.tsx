import { motion, AnimatePresence } from "motion/react";
import {
  X, MapPin, Briefcase, Calendar, DollarSign, TrendingUp, Users,
  AlertTriangle, CheckCircle2, Clock, Target, FileText, ArrowRight,
  Building2, Phone, Mail, Globe, ShieldCheck, Wrench, BarChart3,
} from "lucide-react";

interface SME {
  name: string;
  country: string;
  sector: string;
  stage: string;
  readiness: number;
  bottleneck: string;
  support: string;
  pathway: string;
  risk: string;
}

interface SMEDetailDrawerProps {
  sme: SME | null;
  onClose: () => void;
}

export function SMEDetailDrawer({ sme, onClose }: SMEDetailDrawerProps) {
  if (!sme) return null;

  const readinessColor = sme.readiness >= 70 ? "#2d6a4f" : sme.readiness >= 50 ? "#d97706" : "#dc2626";
  const riskColors = {
    low: { bg: "#f0faf4", text: "#2d6a4f", border: "#c6e9d4" },
    medium: { bg: "#fffbeb", text: "#d97706", border: "#fde68a" },
    high: { bg: "#fef2f2", text: "#dc2626", border: "#fecaca" },
  };
  const rc = riskColors[sme.risk as keyof typeof riskColors] || riskColors.low;

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
              <h2 className="text-[16px] text-[var(--allyra-neutral-900)]" style={{ fontWeight: 600 }}>
                {sme.name}
              </h2>
              <p className="text-[12px] text-[var(--allyra-neutral-500)] flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3 h-3" />
                {sme.country} · {sme.sector}
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
                <MetricCard icon={ShieldCheck} label="Investment Readiness" value={`${sme.readiness}%`} color={readinessColor} />
                <MetricCard icon={Target} label="Development Stage" value={sme.stage} color="#1d4ed8" />
                <MetricCard icon={DollarSign} label="Funding Pathway" value={sme.pathway} color="#2d6a4f" />
                <MetricCard icon={Wrench} label="Support Track" value={sme.support} color="#d97706" />
              </div>
            </div>

            {/* Risk Assessment */}
            <div>
              <p className="text-[11px] tracking-[0.05em] uppercase text-[var(--allyra-neutral-400)] mb-3" style={{ fontWeight: 600 }}>
                Risk Assessment
              </p>
              <div className="rounded-xl border p-4" style={{ borderColor: rc.border, backgroundColor: rc.bg }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" style={{ color: rc.text }} strokeWidth={2} />
                    <span className="text-[13px]" style={{ fontWeight: 600, color: rc.text }}>
                      {sme.risk.charAt(0).toUpperCase() + sme.risk.slice(1)} Risk
                    </span>
                  </div>
                  <span className="text-[10px] tracking-[0.04em] uppercase px-2 py-0.5 rounded-full" style={{ fontWeight: 600, color: rc.text, backgroundColor: "white", border: `1px solid ${rc.border}` }}>
                    {sme.risk}
                  </span>
                </div>
                <p className="text-[12px]" style={{ color: rc.text }}>
                  Primary bottleneck: <span style={{ fontWeight: 600 }}>{sme.bottleneck}</span>
                </p>
              </div>
            </div>

            {/* Business Overview */}
            <div>
              <p className="text-[11px] tracking-[0.05em] uppercase text-[var(--allyra-neutral-400)] mb-3" style={{ fontWeight: 600 }}>
                Business Overview
              </p>
              <div className="space-y-3">
                <InfoRow icon={Building2} label="Legal Entity" value="Private Limited Company" />
                <InfoRow icon={Calendar} label="Year Established" value="2019" />
                <InfoRow icon={Users} label="Employees" value="42 full-time, 18 seasonal" />
                <InfoRow icon={DollarSign} label="Annual Revenue" value="$2.4M (2025)" />
                <InfoRow icon={TrendingUp} label="Revenue Growth" value="+22% YoY" />
              </div>
            </div>

            {/* Contact */}
            <div>
              <p className="text-[11px] tracking-[0.05em] uppercase text-[var(--allyra-neutral-400)] mb-3" style={{ fontWeight: 600 }}>
                Contact Information
              </p>
              <div className="space-y-3">
                <InfoRow icon={Phone} label="Phone" value="+27 11 234 5678" />
                <InfoRow icon={Mail} label="Email" value="contact@example.com" />
                <InfoRow icon={Globe} label="Website" value="www.example.com" />
              </div>
            </div>

            {/* Capability Snapshot */}
            <div>
              <p className="text-[11px] tracking-[0.05em] uppercase text-[var(--allyra-neutral-400)] mb-3" style={{ fontWeight: 600 }}>
                Capability Snapshot
              </p>
              <div className="space-y-2">
                <CapabilityBar label="Strategy & Planning" score={72} color="#2d6a4f" />
                <CapabilityBar label="Financial Management" score={48} color="#dc2626" />
                <CapabilityBar label="Sales & Market Access" score={65} color="#d97706" />
                <CapabilityBar label="Operations" score={78} color="#1d4ed8" />
                <CapabilityBar label="HR & Workforce" score={58} color="#7c3aed" />
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <p className="text-[11px] tracking-[0.05em] uppercase text-[var(--allyra-neutral-400)] mb-3" style={{ fontWeight: 600 }}>
                Recent Activity
              </p>
              <div className="space-y-2">
                <ActivityItem icon={CheckCircle2} label="Financial audit completed" date="2 days ago" color="#2d6a4f" />
                <ActivityItem icon={FileText} label="Business plan updated" date="1 week ago" color="#1d4ed8" />
                <ActivityItem icon={Clock} label="TA session: Cash flow mgmt" date="2 weeks ago" color="#d97706" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#2d6a4f] text-white text-[13px] hover:bg-[#245a42] transition-colors" style={{ fontWeight: 600 }}>
                View Full Profile
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button className="px-4 py-2.5 rounded-lg border border-[var(--allyra-neutral-200)] text-[13px] text-[var(--allyra-neutral-700)] hover:bg-[var(--allyra-neutral-50)] transition-colors" style={{ fontWeight: 600 }}>
                <BarChart3 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function MetricCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
  return (
    <div className="rounded-lg border border-[var(--allyra-neutral-200)] bg-white p-3">
      <div className="flex items-center gap-2 mb-1.5">
        <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
          <Icon className="w-3 h-3" style={{ color }} strokeWidth={2} />
        </div>
        <p className="text-[10px] text-[var(--allyra-neutral-500)]">{label}</p>
      </div>
      <p className="text-[14px] text-[var(--allyra-neutral-900)]" style={{ fontWeight: 600 }}>
        {value}
      </p>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 text-[12px]">
      <Icon className="w-4 h-4 text-[var(--allyra-neutral-400)] shrink-0" strokeWidth={1.6} />
      <span className="text-[var(--allyra-neutral-500)] w-32 shrink-0">{label}</span>
      <span className="text-[var(--allyra-neutral-800)]" style={{ fontWeight: 500 }}>{value}</span>
    </div>
  );
}

function CapabilityBar({ label, score, color }: { label: string; score: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-[11px] text-[var(--allyra-neutral-700)]">{label}</span>
        <span className="text-[11px] text-[var(--allyra-neutral-600)]" style={{ fontWeight: 600 }}>{score}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-[var(--allyra-neutral-100)] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function ActivityItem({ icon: Icon, label, date, color }: { icon: any; label: string; date: string; color: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-[var(--allyra-neutral-50)] px-3 py-2">
      <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}15` }}>
        <Icon className="w-3 h-3" style={{ color }} strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[12px] text-[var(--allyra-neutral-800)]">{label}</p>
        <p className="text-[10px] text-[var(--allyra-neutral-400)]">{date}</p>
      </div>
    </div>
  );
}
