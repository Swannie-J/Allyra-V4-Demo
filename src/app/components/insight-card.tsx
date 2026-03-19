import { TrendingUp, AlertTriangle, Rocket, Eye, Lock, DollarSign } from "lucide-react";

export interface InsightMetric {
  label: string;
  value: string;
  detail?: string;
}

export interface InsightCardData {
  title: string;
  items: string[];
  variant: "working" | "attention" | "opportunities" | "watch" | "bottlenecks" | "financial";
  metrics?: InsightMetric[];
}

const VARIANT_CONFIG = {
  working: {
    icon: TrendingUp,
    accentColor: "var(--allyra-green)",
    bgColor: "#f0faf4",
    borderColor: "#c6e9d4",
    iconBg: "#dcf2e5",
  },
  attention: {
    icon: AlertTriangle,
    accentColor: "#d97706",
    bgColor: "#fffbeb",
    borderColor: "#fde68a",
    iconBg: "#fef3c7",
  },
  opportunities: {
    icon: Rocket,
    accentColor: "#2563eb",
    bgColor: "#eff6ff",
    borderColor: "#bfdbfe",
    iconBg: "#dbeafe",
  },
  watch: {
    icon: Eye,
    accentColor: "#7c3aed",
    bgColor: "#f5f3ff",
    borderColor: "#ddd6fe",
    iconBg: "#ede9fe",
  },
  financial: {
    icon: DollarSign,
    accentColor: "#0891b2",
    bgColor: "#ecfeff",
    borderColor: "#a5f3fc",
    iconBg: "#cffafe",
  },
  bottlenecks: {
    icon: Lock,
    accentColor: "#dc2626",
    bgColor: "#fef2f2",
    borderColor: "#fecaca",
    iconBg: "#fee2e2",
  },
};

export function InsightCard({ title, items, variant, metrics }: InsightCardData) {
  const config = VARIANT_CONFIG[variant];
  const Icon = config.icon;

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        backgroundColor: config.bgColor,
        border: `1px solid ${config.borderColor}`,
      }}
    >
      {/* Header */}
      <div className="px-5 py-3.5 flex items-center gap-3">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: config.iconBg }}
        >
          <Icon
            className="w-4 h-4"
            style={{ color: config.accentColor }}
            strokeWidth={2}
          />
        </div>
        <span
          className="text-[11px] tracking-[0.08em] uppercase"
          style={{ color: config.accentColor, fontWeight: 600 }}
        >
          {title}
        </span>
      </div>

      {/* Metrics (analytical view for financial variant) */}
      {metrics && metrics.length > 0 && (
        <div className="px-5 pb-1.5">
          <div
            className="rounded-lg overflow-hidden"
            style={{ border: `1px solid ${config.borderColor}` }}
          >
            {metrics.map((metric, i) => (
              <div
                key={i}
                className="px-4 py-2.5 flex items-baseline justify-between gap-4"
                style={{
                  backgroundColor: i % 2 === 0 ? "rgba(255,255,255,0.6)" : "transparent",
                  borderBottom: i < metrics.length - 1 ? `1px solid ${config.borderColor}` : "none",
                }}
              >
                <span className="text-[12px] text-[var(--allyra-neutral-600)]" style={{ fontWeight: 500 }}>
                  {metric.label}
                </span>
                <div className="text-right flex-shrink-0">
                  <span
                    className="text-[13px]"
                    style={{ color: config.accentColor, fontWeight: 600 }}
                  >
                    {metric.value}
                  </span>
                  {metric.detail && (
                    <span className="text-[11px] text-[var(--allyra-neutral-500)] ml-1.5">
                      {metric.detail}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Items */}
      {items.length > 0 && (
        <div className="px-5 pb-4 pt-2 space-y-2.5">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[7px]"
                style={{ backgroundColor: config.accentColor, opacity: 0.6 }}
              />
              <span className="text-[14px] leading-relaxed text-[var(--allyra-neutral-800)]">
                {item}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}