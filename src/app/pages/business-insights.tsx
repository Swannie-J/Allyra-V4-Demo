import { useState } from "react";
import {
  TrendingUp,
  AlertTriangle,
  Rocket,
  Eye,
  Lock,
  DollarSign,
  ChevronRight,
  X,
  BarChart3,
} from "lucide-react";
import { useChatContext } from "../components/chat-context";

interface InsightSection {
  id: string;
  title: string;
  variant: string;
  icon: typeof TrendingUp;
  accentColor: string;
  bgColor: string;
  borderColor: string;
  iconBg: string;
  summaryItems: string[];
  detail: {
    explanation: string;
    reasoning: string[];
    implications: string[];
    actions: string[];
  };
  metrics?: { label: string; value: string; detail?: string }[];
}

const INSIGHT_SECTIONS: InsightSection[] = [
  {
    id: "working",
    title: "What's Working",
    variant: "working",
    icon: TrendingUp,
    accentColor: "#2d6a4f",
    bgColor: "#f0faf4",
    borderColor: "#c6e9d4",
    iconBg: "#dcf2e5",
    summaryItems: [
      "Strong daily local demand for essential convenience products",
      "Good neighbourhood trust and repeat customer traffic",
      "Prepared-food offering creates higher-margin sales potential",
    ],
    detail: {
      explanation:
        "The business serves a clear and consistent daily need in the local area. Customer trust is strong, foot traffic is regular, and the prepared-food side demonstrates genuine margin potential when capacity allows.",
      reasoning: [
        "The shop is embedded in the community and benefits from local trust and proximity",
        "Daily convenience demand is relatively stable and less vulnerable to seasonality",
        "Prepared food creates differentiation and generates stronger margins than packaged shelf items",
        "WhatsApp ordering signals early demand for more convenience-driven service",
      ],
      implications: [
        "The business has a strong foundation of repeat local demand to build from",
        "Customer trust creates goodwill that can be leveraged for expanded offerings",
        "Food sales offer the best path to margin improvement if managed properly",
      ],
      actions: [
        "Track which food items drive the strongest demand and margins",
        "Protect and strengthen relationships with core repeat customers",
        "Explore simple ways to make WhatsApp ordering more consistent",
      ],
    },
  },
  {
    id: "attention",
    title: "What Needs Attention",
    variant: "attention",
    icon: AlertTriangle,
    accentColor: "#d97706",
    bgColor: "#fffbeb",
    borderColor: "#fde68a",
    iconBg: "#fef3c7",
    summaryItems: [
      "Frequent stock-outs on fast-moving items losing sales",
      "Cash recycled reactively instead of being planned",
      "Informal credit and leakage reducing real profit",
    ],
    detail: {
      explanation:
        "The business is experiencing daily operational leakage that is weakening profitability and creating unnecessary pressure. Stock control is reactive, cash discipline is weak, and too much value is escaping the system.",
      reasoning: [
        "Fast-moving items frequently run out, forcing customers to go elsewhere",
        "Cash is spent on stock purchases without enough forward planning or control",
        "Informal credit, family withdrawals, and untracked shrinkage are eroding profit",
        "Food capacity is constrained by refrigeration, storage, and over-reliance on the founder",
      ],
      implications: [
        "The business is busier than it is profitable",
        "Stock-outs are damaging customer reliability and losing immediate sales",
        "Weak cash discipline is making it harder to invest in growth or handle pressure periods",
      ],
      actions: [
        "Identify the top 20 fast-moving items and track availability daily",
        "Introduce a simple daily cash-up and weekly summary process",
        "Set and enforce a clearer policy on customer credit and family withdrawals",
        "Assess what fridge or storage upgrades would unlock more food sales",
      ],
    },
  },
  {
    id: "opportunities",
    title: "Growth Opportunities",
    variant: "opportunities",
    icon: Rocket,
    accentColor: "#2563eb",
    bgColor: "#eff6ff",
    borderColor: "#bfdbfe",
    iconBg: "#dbeafe",
    summaryItems: [
      "Expand prepared foods in a controlled way",
      "Increase basket size through better stock availability",
      "Formalise basic records to unlock future finance options",
    ],
    detail: {
      explanation:
        "The strongest growth opportunities are practical and focused on improving control and consistency first. Once operational discipline is stronger, the business will be better positioned for deliberate expansion.",
      reasoning: [
        "Prepared foods show the best margin potential if done with more discipline",
        "Keeping key items in stock consistently would improve customer satisfaction and basket size",
        "WhatsApp orders and local delivery could grow if service becomes more reliable",
        "Basic formal record-keeping would make the business more finance-ready and supplier-ready",
      ],
      implications: [
        "Growth should prioritise tightening margins and control before scaling locations",
        "Improving the existing shop's profitability is the fastest path to real value creation",
        "Better records unlock more options for equipment finance, supplier credit, or working capital",
      ],
      actions: [
        "Standardise top food items by portion size, cost, and pricing",
        "Set weekly stock planning routines for fast-moving convenience items",
        "Build a simple daily cash-up and record system",
        "Explore one or two basic formalisation steps (e.g., proper bookkeeping or CIPC registration refresh)",
      ],
    },
  },
  {
    id: "watch",
    title: "Things to Watch",
    variant: "watch",
    icon: Eye,
    accentColor: "#7c3aed",
    bgColor: "#f5f3ff",
    borderColor: "#ddd6fe",
    iconBg: "#ede9fe",
    summaryItems: [
      "Price-sensitive customers switching quickly if items unavailable",
      "Informal competitors reacting fast on pricing",
      "Rising food input and electricity costs",
    ],
    detail: {
      explanation:
        "These are not immediate crises, but they are external pressures that will matter as the business grows. The competitive environment is informal and price-sensitive, and input costs are rising.",
      reasoning: [
        "Township retail is highly competitive and customers have many nearby options",
        "If core items are frequently out of stock, customers will shift quickly",
        "Food input costs (oil, flour, maize meal) and electricity are climbing steadily",
        "Heavy founder dependence creates a risk if the business wants to scale or operate more independently",
      ],
      implications: [
        "Customer loyalty is strong but fragile if service becomes unreliable",
        "Rising input costs will squeeze margins unless pricing or portions are adjusted carefully",
        "Over-reliance on the founder limits how much the business can grow or delegate",
      ],
      actions: [
        "Monitor core product availability closely to protect customer trust",
        "Track food input costs regularly and adjust pricing or portion sizes when needed",
        "Begin training support staff on basic routines to reduce founder dependence",
        "Watch competitor pricing on key staples and respond strategically",
      ],
    },
  },
  {
    id: "financial",
    title: "Financial Insights",
    variant: "financial",
    icon: DollarSign,
    accentColor: "#0891b2",
    bgColor: "#ecfeff",
    borderColor: "#a5f3fc",
    iconBg: "#cffafe",
    summaryItems: [
      "Business is active but profit quality is weak",
      "Cash pressure is high before major stock buys",
      "Prepared food offers strongest margin improvement path",
    ],
    metrics: [
      { label: "Average cash pressure", value: "High", detail: "especially before restocking" },
      { label: "Margin leakage estimate", value: "Moderate to high", detail: "credit, shrinkage, withdrawals" },
      { label: "Fast-moving stock-out risk", value: "Frequent", detail: "bread, drinks, mealie meal" },
      { label: "Food margin potential", value: "Strong", detail: "vs. packaged shelf items" },
      { label: "Record-keeping quality", value: "Basic", detail: "limits finance readiness" },
    ],
    detail: {
      explanation:
        "The financial picture shows an active business with steady turnover, but weak profit quality due to poor cash control, leakage, and reactive stock management. The business is busier than it is profitable.",
      reasoning: [
        "Cash is being recycled into stock purchases without enough planning or discipline",
        "Margin is being eroded by informal credit, family withdrawals, and untracked shrinkage",
        "Stock-outs on fast-moving items are creating lost sales and customer frustration",
        "Prepared food generates better margins but is constrained by equipment and founder time",
        "Record-keeping is basic and not yet formal enough to support financing applications",
      ],
      implications: [
        "The business needs better cash discipline before it can invest in growth properly",
        "Profit is being lost to leakage rather than market conditions",
        "Without better records, accessing equipment finance or working capital will be difficult",
        "Food expansion is the best margin opportunity if done with proper control",
      ],
      actions: [
        "Separate business cash from personal and family use clearly",
        "Introduce a daily cash-up and weekly summary process",
        "Identify and cost the food items with the best margin potential",
        "Start building basic financial records that could support future finance applications",
      ],
    },
  },
  {
    id: "bottlenecks",
    title: "Current Growth Bottlenecks",
    variant: "bottlenecks",
    icon: Lock,
    accentColor: "#dc2626",
    bgColor: "#fef2f2",
    borderColor: "#fecaca",
    iconBg: "#fee2e2",
    summaryItems: [
      "Poor stock control on fast-moving items",
      "Cash leakage and weak record discipline",
      "Heavy founder dependence in daily operations",
    ],
    detail: {
      explanation:
        "The primary bottlenecks are operational, not demand-related. The business has customers and sales potential, but poor control systems and over-reliance on the founder are limiting how well it can perform and grow.",
      reasoning: [
        "Stock planning is reactive, creating frequent stock-outs and lost sales",
        "Cash discipline is weak, making it harder to plan or invest with confidence",
        "Food sales are limited by refrigeration capacity and founder availability",
        "The founder handles too much personally, creating dependency and limiting scalability",
      ],
      implications: [
        "Fixing internal systems would unlock growth faster than marketing or expansion",
        "The business could be significantly more profitable with better control",
        "Scaling or delegating is difficult until operational routines are stronger",
      ],
      actions: [
        "Prioritise stock and cash control as the first bottleneck to address",
        "Develop a simple weekly stock planning routine",
        "Create basic daily checklists for opening, cash-up, and closing procedures",
        "Train support staff on repeatable routines to reduce founder dependence",
      ],
    },
  },
];

function DetailPanel({
  section,
  onClose,
}: {
  section: InsightSection;
  onClose: () => void;
}) {
  const Icon = section.icon;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-6 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 px-8 py-5 flex items-center justify-between rounded-t-2xl"
          style={{
            backgroundColor: section.bgColor,
            borderBottom: `1px solid ${section.borderColor}`,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: section.iconBg }}
            >
              <Icon
                className="w-5 h-5"
                style={{ color: section.accentColor }}
                strokeWidth={2}
              />
            </div>
            <h2
              className="text-[16px] tracking-wide"
              style={{ color: section.accentColor, fontWeight: 600 }}
            >
              {section.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-black/5 transition-colors"
          >
            <X className="w-4 h-4 text-[var(--allyra-neutral-500)]" />
          </button>
        </div>

        <div className="px-8 py-6 space-y-7">
          {/* Metrics for financial */}
          {section.metrics && section.metrics.length > 0 && (
            <div>
              <h3
                className="text-[11px] tracking-[0.08em] uppercase text-[var(--allyra-neutral-500)] mb-3"
                style={{ fontWeight: 600 }}
              >
                Key Indicators
              </h3>
              <div
                className="rounded-lg overflow-hidden"
                style={{ border: `1px solid ${section.borderColor}` }}
              >
                {section.metrics.map((metric, i) => (
                  <div
                    key={i}
                    className="px-4 py-3 flex items-baseline justify-between gap-4"
                    style={{
                      backgroundColor:
                        i % 2 === 0 ? section.bgColor : "white",
                      borderBottom:
                        i < section.metrics!.length - 1
                          ? `1px solid ${section.borderColor}`
                          : "none",
                    }}
                  >
                    <span
                      className="text-[13px] text-[var(--allyra-neutral-700)]"
                      style={{ fontWeight: 500 }}
                    >
                      {metric.label}
                    </span>
                    <div className="text-right flex-shrink-0">
                      <span
                        className="text-[14px]"
                        style={{
                          color: section.accentColor,
                          fontWeight: 600,
                        }}
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

          {/* Overview */}
          <div>
            <h3
              className="text-[11px] tracking-[0.08em] uppercase text-[var(--allyra-neutral-500)] mb-2"
              style={{ fontWeight: 600 }}
            >
              Overview
            </h3>
            <p className="text-[14px] leading-relaxed text-[var(--allyra-neutral-800)]">
              {section.detail.explanation}
            </p>
          </div>

          {/* Supporting Analysis */}
          <div>
            <h3
              className="text-[11px] tracking-[0.08em] uppercase text-[var(--allyra-neutral-500)] mb-2"
              style={{ fontWeight: 600 }}
            >
              Supporting Analysis
            </h3>
            <div className="space-y-2">
              {section.detail.reasoning.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[7px]"
                    style={{
                      backgroundColor: section.accentColor,
                      opacity: 0.5,
                    }}
                  />
                  <span className="text-[13px] leading-relaxed text-[var(--allyra-neutral-700)]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Business Implications */}
          <div>
            <h3
              className="text-[11px] tracking-[0.08em] uppercase text-[var(--allyra-neutral-500)] mb-2"
              style={{ fontWeight: 600 }}
            >
              Implications for Your Business
            </h3>
            <div className="space-y-2">
              {section.detail.implications.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[7px]"
                    style={{
                      backgroundColor: section.accentColor,
                      opacity: 0.5,
                    }}
                  />
                  <span className="text-[13px] leading-relaxed text-[var(--allyra-neutral-700)]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Possible Actions */}
          <div>
            <h3
              className="text-[11px] tracking-[0.08em] uppercase text-[var(--allyra-neutral-500)] mb-2"
              style={{ fontWeight: 600 }}
            >
              Possible Actions
            </h3>
            <div className="space-y-2">
              {section.detail.actions.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div
                    className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      backgroundColor: section.bgColor,
                      border: `1px solid ${section.borderColor}`,
                    }}
                  >
                    <span
                      className="text-[10px]"
                      style={{
                        color: section.accentColor,
                        fontWeight: 600,
                      }}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <span className="text-[13px] leading-relaxed text-[var(--allyra-neutral-700)]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BusinessInsights() {
  const { businessProfile } = useChatContext();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const hasInsights = !!businessProfile;

  if (!hasInsights) {
    return (
      <div className="h-full bg-white px-12 py-10 overflow-y-auto">
        <div className="max-w-5xl">
          <h1 className="text-3xl tracking-tight text-[var(--allyra-neutral-900)] mb-2">
            Business Insights
          </h1>
          <p className="text-[var(--allyra-neutral-600)] text-base mb-8">
            Track key metrics and gain insights into your business performance.
          </p>
          <div className="h-64 border border-dashed border-[var(--allyra-neutral-300)] rounded-xl flex flex-col items-center justify-center gap-3">
            <BarChart3
              className="w-8 h-8 text-[var(--allyra-neutral-300)]"
              strokeWidth={1.5}
            />
            <p className="text-[var(--allyra-neutral-500)] text-center max-w-sm">
              Business Insights will appear here as Allyra learns about your
              business.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const expandedSection = expandedId
    ? INSIGHT_SECTIONS.find((s) => s.id === expandedId) ?? null
    : null;

  return (
    <div className="h-full bg-[var(--allyra-neutral-50)] overflow-y-auto">
      <div className="px-12 py-10">
        <div className="max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-[28px] tracking-tight text-[var(--allyra-neutral-900)] mb-1">
              Business Insights
            </h1>
            <p className="text-[15px] text-[var(--allyra-neutral-600)]">
              Key findings from Allyra's analysis of{" "}
              <span style={{ fontWeight: 500 }}>
                {businessProfile.name}
              </span>
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {INSIGHT_SECTIONS.map((section) => {
              const Icon = section.icon;
              return (
                <div
                  key={section.id}
                  className="bg-white rounded-xl border border-[var(--allyra-neutral-200)] overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Card Header */}
                  <div
                    className="px-6 py-4 flex items-center gap-3"
                    style={{
                      backgroundColor: section.bgColor,
                      borderBottom: `1px solid ${section.borderColor}`,
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: section.iconBg }}
                    >
                      <Icon
                        className="w-4 h-4"
                        style={{ color: section.accentColor }}
                        strokeWidth={2}
                      />
                    </div>
                    <span
                      className="text-[12px] tracking-[0.06em] uppercase"
                      style={{
                        color: section.accentColor,
                        fontWeight: 600,
                      }}
                    >
                      {section.title}
                    </span>
                  </div>

                  {/* Metrics (Financial only) */}
                  {section.metrics && (
                    <div className="px-6 pt-4">
                      <div
                        className="rounded-lg overflow-hidden"
                        style={{
                          border: `1px solid ${section.borderColor}`,
                        }}
                      >
                        {section.metrics.map((metric, i) => (
                          <div
                            key={i}
                            className="px-3.5 py-2 flex items-baseline justify-between gap-3"
                            style={{
                              backgroundColor:
                                i % 2 === 0
                                  ? "rgba(255,255,255,0.6)"
                                  : section.bgColor,
                              borderBottom:
                                i < section.metrics!.length - 1
                                  ? `1px solid ${section.borderColor}`
                                  : "none",
                            }}
                          >
                            <span
                              className="text-[11px] text-[var(--allyra-neutral-600)]"
                              style={{ fontWeight: 500 }}
                            >
                              {metric.label}
                            </span>
                            <span
                              className="text-[12px] flex-shrink-0"
                              style={{
                                color: section.accentColor,
                                fontWeight: 600,
                              }}
                            >
                              {metric.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Summary Items */}
                  <div className="px-6 py-4 space-y-2.5">
                    {section.summaryItems.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[7px]"
                          style={{
                            backgroundColor: section.accentColor,
                            opacity: 0.5,
                          }}
                        />
                        <span className="text-[13px] leading-relaxed text-[var(--allyra-neutral-700)]">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Read More */}
                  <div className="px-6 pb-4">
                    <button
                      onClick={() => setExpandedId(section.id)}
                      className="flex items-center gap-1.5 text-[13px] hover:opacity-80 transition-opacity cursor-pointer"
                      style={{
                        color: section.accentColor,
                        fontWeight: 500,
                      }}
                    >
                      Read more
                      <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Expanded Detail Panel */}
      {expandedSection && (
        <DetailPanel
          section={expandedSection}
          onClose={() => setExpandedId(null)}
        />
      )}
    </div>
  );
}