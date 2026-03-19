import { useState } from "react";
import {
  TrendingUp,
  Users,
  ShoppingBag,
  Truck,
  Globe,
  ChevronRight,
  X,
} from "lucide-react";
import { useChatContext } from "../components/chat-context";

interface IntelCard {
  id: string;
  title: string;
  icon: typeof TrendingUp;
  accentColor: string;
  bgColor: string;
  borderColor: string;
  iconBg: string;
  insights: string[];
  detail: {
    overview: string;
    context: string[];
    implications: string[];
  };
}

const INTEL_CARDS: IntelCard[] = [
  {
    id: "sector",
    title: "Township Retail Trends",
    icon: TrendingUp,
    accentColor: "#2d6a4f",
    bgColor: "#f0faf4",
    borderColor: "#c6e9d4",
    iconBg: "#dcf2e5",
    insights: [
      "Growing formalization of township retail businesses",
      "Increased demand for prepared foods and convenience",
      "Digital ordering and delivery gaining traction",
    ],
    detail: {
      overview:
        "Township retail is evolving rapidly as consumer expectations shift toward convenience, prepared foods, and digital ordering. Spaza shops that adapt to these trends while maintaining community trust are positioning themselves for sustained growth.",
      context: [
        "Township economies contribute an estimated R60-80 billion annually to South Africa's retail economy",
        "Prepared food sales in informal retail are growing faster than packaged goods",
        "WhatsApp-based ordering and local delivery are becoming standard customer expectations",
        "Customers increasingly value reliability, cleanliness, and consistent stock availability",
      ],
      implications: [
        "Spaza shops that improve operational consistency can capture more repeat spending",
        "Prepared food offers the highest margin opportunity within the township retail model",
        "Digital ordering capability creates competitive advantage and customer stickiness",
      ],
    },
  },
  {
    id: "competitor",
    title: "Competitive Signals",
    icon: ShoppingBag,
    accentColor: "#dc2626",
    bgColor: "#fef2f2",
    borderColor: "#fecaca",
    iconBg: "#fee2e2",
    insights: [
      "Informal competitors reacting fast on pricing",
      "Franchised convenience stores expanding into townships",
      "Price-sensitive customers switching quickly",
    ],
    detail: {
      overview:
        "The competitive environment in township retail is intense and highly price-sensitive. Customers have many nearby options, and brand loyalty is fragile if service quality or stock availability becomes inconsistent.",
      context: [
        "Competition includes other spaza shops, informal traders, and franchised convenience stores",
        "Franchised chains are increasing their township presence with standardized offerings",
        "Stock-outs create immediate switching behavior among customers",
        "Pricing pressure is constant, especially on staple items like bread, milk, and airtime",
      ],
      implications: [
        "Stock reliability and service consistency matter as much as pricing",
        "Prepared foods and WhatsApp ordering create differentiation from basic competitors",
        "Building customer relationships and community trust creates defensibility",
      ],
    },
  },
  {
    id: "customer",
    title: "Customer Behavior",
    icon: Users,
    accentColor: "#7c3aed",
    bgColor: "#f5f3ff",
    borderColor: "#ddd6fe",
    iconBg: "#ede9fe",
    insights: [
      "Daily convenience purchases remain core demand driver",
      "Growing preference for prepared food over cooking at home",
      "Digital ordering via WhatsApp increasingly expected",
    ],
    detail: {
      overview:
        "Township customers value convenience, reliability, and trust. They make frequent small purchases and respond well to prepared food offerings that save time and provide value.",
      context: [
        "Average township household makes 5-8 convenience retail purchases per week",
        "Prepared food demand is driven by time pressure, affordability, and social eating patterns",
        "WhatsApp ordering is expected especially among working customers and students",
        "Credit flexibility matters but also creates financial leakage for informal shops",
      ],
      implications: [
        "Basket size and repeat frequency are the primary growth levers",
        "Prepared food creates margin advantage and customer loyalty if done consistently",
        "Digital ordering improves convenience but requires reliable stock and delivery discipline",
      ],
    },
  },
  {
    id: "supply",
    title: "Supply Chain Insights",
    icon: Truck,
    accentColor: "#d97706",
    bgColor: "#fffbeb",
    borderColor: "#fde68a",
    iconBg: "#fef3c7",
    insights: [
      "Wholesale cash-and-carry remains primary supply channel",
      "Rising input costs pressuring margins on staples",
      "Supplier credit difficult to access without formal records",
    ],
    detail: {
      overview:
        "Most township retailers rely on cash-and-carry wholesale suppliers, limiting their ability to access credit, negotiate pricing, or manage inventory strategically. Formalizing supply relationships can unlock better terms.",
      context: [
        "Cash-and-carry wholesalers dominate township retail supply chains",
        "Supplier credit requires formal business records and consistent payment history",
        "Food input costs (oil, flour, maize meal) have risen 10-15% year-on-year",
        "Bulk buying can improve margins but requires working capital and storage space",
      ],
      implications: [
        "Better cash planning enables bulk purchases and margin improvements",
        "Formal records unlock access to supplier credit and better payment terms",
        "Rising input costs require careful pricing adjustments or portion control",
      ],
    },
  },
  {
    id: "regulatory",
    title: "Regulatory & Support Landscape",
    icon: Globe,
    accentColor: "#0891b2",
    bgColor: "#ecfeff",
    borderColor: "#a5f3fc",
    iconBg: "#cffafe",
    insights: [
      "Government and NGO support programs targeting township SMMEs",
      "Gradual formalization improving access to finance and supplier credit",
      "Health and safety standards becoming more important",
    ],
    detail: {
      overview:
        "Various government, NGO, and private sector programs are providing support to township retailers through training, finance access, and business development. Formalization is increasingly necessary to access these opportunities.",
      context: [
        "SEDA, NYDA, and municipal enterprise development programs offer training and support",
        "Small-scale finance options exist through microfinance institutions and stokvels",
        "Formal business registration (CIPC) and basic record-keeping are increasingly required for funding",
        "Food safety and hygiene standards are gaining enforcement, especially for prepared foods",
      ],
      implications: [
        "Formalization unlocks access to finance, supplier credit, and support programs",
        "Basic compliance (registration, hygiene, record-keeping) creates competitive advantage",
        "Support programs exist but require some level of business structure to access",
      ],
    },
  },
];

function IntelDetailPanel({
  card,
  onClose,
}: {
  card: IntelCard;
  onClose: () => void;
}) {
  const Icon = card.icon;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-6 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 px-8 py-5 flex items-center justify-between rounded-t-2xl"
          style={{
            backgroundColor: card.bgColor,
            borderBottom: `1px solid ${card.borderColor}`,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: card.iconBg }}
            >
              <Icon
                className="w-5 h-5"
                style={{ color: card.accentColor }}
                strokeWidth={2}
              />
            </div>
            <h2
              className="text-[16px] tracking-wide"
              style={{ color: card.accentColor, fontWeight: 600 }}
            >
              {card.title}
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
          {/* Overview */}
          <div>
            <h3
              className="text-[11px] tracking-[0.08em] uppercase text-[var(--allyra-neutral-500)] mb-2"
              style={{ fontWeight: 600 }}
            >
              Overview
            </h3>
            <p className="text-[14px] leading-relaxed text-[var(--allyra-neutral-800)]">
              {card.detail.overview}
            </p>
          </div>

          {/* Supporting Context */}
          <div>
            <h3
              className="text-[11px] tracking-[0.08em] uppercase text-[var(--allyra-neutral-500)] mb-2"
              style={{ fontWeight: 600 }}
            >
              Supporting Context
            </h3>
            <div className="space-y-2">
              {card.detail.context.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[7px]"
                    style={{
                      backgroundColor: card.accentColor,
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

          {/* What This Means */}
          <div>
            <h3
              className="text-[11px] tracking-[0.08em] uppercase text-[var(--allyra-neutral-500)] mb-2"
              style={{ fontWeight: 600 }}
            >
              What This Means for Your Business
            </h3>
            <div className="space-y-2">
              {card.detail.implications.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[7px]"
                    style={{
                      backgroundColor: card.accentColor,
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
        </div>
      </div>
    </div>
  );
}

export function MarketIntelligence() {
  const { businessProfile } = useChatContext();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const hasIntel = !!businessProfile;

  if (!hasIntel) {
    return (
      <div className="h-full bg-white px-12 py-10 overflow-y-auto">
        <div className="max-w-5xl">
          <h1 className="text-3xl tracking-tight text-[var(--allyra-neutral-900)] mb-2">
            Market Intelligence
          </h1>
          <p className="text-[var(--allyra-neutral-600)] text-base mb-8">
            Stay informed about market trends and competitive landscape.
          </p>
          <div className="h-64 border border-dashed border-[var(--allyra-neutral-300)] rounded-xl flex flex-col items-center justify-center gap-3">
            <Globe
              className="w-8 h-8 text-[var(--allyra-neutral-300)]"
              strokeWidth={1.5}
            />
            <p className="text-[var(--allyra-neutral-500)] text-center max-w-sm">
              Market intelligence will build up here as Allyra learns about your
              industry and competitors.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const expandedCard = expandedId
    ? INTEL_CARDS.find((c) => c.id === expandedId) ?? null
    : null;

  return (
    <div className="h-full bg-[var(--allyra-neutral-50)] overflow-y-auto">
      <div className="px-12 py-10">
        <div className="max-w-5xl">
          {/* Header */}
          <div className="mb-2">
            <h1 className="text-[28px] tracking-tight text-[var(--allyra-neutral-900)] mb-1">
              Market Intelligence
            </h1>
            <p className="text-[15px] text-[var(--allyra-neutral-600)]">
              Live market briefing for{" "}
              <span style={{ fontWeight: 500 }}>
                {businessProfile.sector}
              </span>{" "}
              in {businessProfile.name}'s operating region
            </p>
          </div>

          {/* Last updated */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--allyra-green)]" />
            <span className="text-[12px] text-[var(--allyra-neutral-500)]">
              Last updated: March 7, 2026
            </span>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {INTEL_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  className={`bg-white rounded-xl border border-[var(--allyra-neutral-200)] overflow-hidden hover:shadow-md transition-shadow ${
                    card.id === "export" ? "md:col-span-2" : ""
                  }`}
                >
                  {/* Card Header */}
                  <div
                    className="px-6 py-4 flex items-center gap-3"
                    style={{
                      backgroundColor: card.bgColor,
                      borderBottom: `1px solid ${card.borderColor}`,
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: card.iconBg }}
                    >
                      <Icon
                        className="w-4 h-4"
                        style={{ color: card.accentColor }}
                        strokeWidth={2}
                      />
                    </div>
                    <span
                      className="text-[12px] tracking-[0.06em] uppercase"
                      style={{ color: card.accentColor, fontWeight: 600 }}
                    >
                      {card.title}
                    </span>
                  </div>

                  {/* Insights */}
                  <div className="px-6 py-4 space-y-2.5">
                    {card.insights.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[7px]"
                          style={{
                            backgroundColor: card.accentColor,
                            opacity: 0.5,
                          }}
                        />
                        <span className="text-[13px] leading-relaxed text-[var(--allyra-neutral-700)]">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Explore Further */}
                  <div className="px-6 pb-4">
                    <button
                      onClick={() => setExpandedId(card.id)}
                      className="flex items-center gap-1.5 text-[13px] hover:opacity-80 transition-opacity cursor-pointer"
                      style={{ color: card.accentColor, fontWeight: 500 }}
                    >
                      Explore further
                      <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      {expandedCard && (
        <IntelDetailPanel
          card={expandedCard}
          onClose={() => setExpandedId(null)}
        />
      )}
    </div>
  );
}