import {
  Landmark,
  ExternalLink,
  Clock,
  CheckCircle2,
  ArrowRight,
  Building2,
  Banknote,
  BadgePercent,
  CircleDollarSign,
  FileCheck,
} from "lucide-react";
import { useChatContext } from "../components/chat-context";

interface FundingOption {
  id: string;
  title: string;
  provider: string;
  description: string;
  amount: string;
  type: string;
  relevance: string;
  eligibility: string[];
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  accentColor: string;
  accentBg: string;
}

const FUNDING_OPTIONS: FundingOption[] = [
  {
    id: "f1",
    title: "Microenterprise Equipment Finance",
    provider: "Township Business Finance Initiative",
    description:
      "Small-scale equipment finance for fridges, freezers, and food prep equipment aimed at informal and semi-formal township retailers. Flexible repayment terms and community-based assessment.",
    amount: "R5,000 – R35,000",
    type: "Equipment Finance",
    relevance: "Growth Initiative 03 — Expand prepared food capacity",
    eligibility: [
      "Operating business (6+ months)",
      "Basic business records or bank statements",
      "Equipment quotation required",
    ],
    icon: Building2,
    accentColor: "var(--allyra-green)",
    accentBg: "#f0faf4",
  },
  {
    id: "f2",
    title: "Stokvel-Style Working Capital Circle",
    provider: "Community Savings Collective",
    description:
      "Group-based savings and lending model for township retailers. Monthly contributions create a rotating fund for stock purchases and equipment. Lower rates than traditional finance.",
    amount: "R2,000 – R15,000",
    type: "Peer Finance",
    relevance: "Growth Initiative 02 — Improve cash discipline",
    eligibility: [
      "Operating spaza or retail business",
      "Active community presence",
      "Willingness to participate in group meetings",
    ],
    icon: CircleDollarSign,
    accentColor: "#2563eb",
    accentBg: "#eff6ff",
  },
  {
    id: "f3",
    title: "SEDA Small Business Grant",
    provider: "Small Enterprise Development Agency",
    description:
      "Non-repayable grant for qualifying township SMMEs to support formalization, training, or small equipment needs. Requires CIPC registration and basic business plan.",
    amount: "R5,000 – R20,000",
    type: "Grant",
    relevance: "Business formalization and training support",
    eligibility: [
      "CIPC registered business",
      "Owner-operated SMME",
      "Basic business plan or growth proposal",
    ],
    icon: FileCheck,
    accentColor: "#d97706",
    accentBg: "#fffbeb",
  },
  {
    id: "f4",
    title: "Microfinance Stock Advance",
    provider: "Local Microfinance Institutions",
    description:
      "Short-term cash advance (7-30 days) for stock purchasing. Designed for informal retailers with proven turnover. Higher rates but fast approval based on trading history.",
    amount: "R1,000 – R10,000",
    type: "Short-term Advance",
    relevance: "Growth Initiative 01 — Stock control improvements",
    eligibility: [
      "Operating business (3+ months)",
      "Bank account with transaction history",
      "Community reference or existing customer relationship",
    ],
    icon: Banknote,
    accentColor: "#7c3aed",
    accentBg: "#f5f3ff",
  },
  {
    id: "f5",
    title: "Township Retail Development Program",
    provider: "NYDA (National Youth Development Agency)",
    description:
      "Blended support package for young township entrepreneurs: business training, mentorship, and potential small grant or loan (R5k-R25k) for qualifying participants.",
    amount: "R5,000 – R25,000",
    type: "Blended Support",
    relevance: "Formalization, training, and growth readiness",
    eligibility: [
      "Owner aged 18-35",
      "Operating business in township area",
      "Willingness to complete training modules",
    ],
    icon: BadgePercent,
    accentColor: "#dc2626",
    accentBg: "#fef2f2",
  },
  {
    id: "f6",
    title: "Supplier Credit Arrangement",
    provider: "Participating Wholesalers",
    description:
      "7-14 day payment terms with participating cash-and-carry wholesalers for retailers with consistent purchase history and basic record-keeping. Reduces immediate cash pressure.",
    amount: "Variable (stock value)",
    type: "Trade Credit",
    relevance: "Growth Initiative 02 — Cash flow management",
    eligibility: [
      "Regular purchasing history (3+ months)",
      "Bank account and basic records",
      "Consistent payment behavior",
    ],
    icon: CircleDollarSign,
    accentColor: "#0891b2",
    accentBg: "#ecfeff",
  },
];

function FundingCard({ option }: { option: FundingOption }) {
  const Icon = option.icon;

  return (
    <div className="bg-white rounded-xl border border-[var(--allyra-neutral-200)] hover:border-[var(--allyra-neutral-300)] transition-all duration-200 overflow-hidden">
      {/* Header */}
      <div
        className="px-5 py-4 flex items-start gap-3"
        style={{
          backgroundColor: option.accentBg,
          borderBottom: `1px solid ${option.accentColor}20`,
        }}
      >
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            backgroundColor: "white",
            border: `1px solid ${option.accentColor}30`,
          }}
        >
          <Icon
            className="w-4.5 h-4.5"
            strokeWidth={1.5}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span
              className="text-[10px] tracking-[0.06em] uppercase"
              style={{ color: option.accentColor, fontWeight: 600 }}
            >
              {option.type}
            </span>
          </div>
          <h3
            className="text-[15px] text-[var(--allyra-neutral-900)]"
            style={{ fontWeight: 600 }}
          >
            {option.title}
          </h3>
          <span className="text-[12px] text-[var(--allyra-neutral-500)]" style={{ fontWeight: 500 }}>
            {option.provider}
          </span>
        </div>
        <div className="text-right flex-shrink-0">
          <span
            className="text-[14px] text-[var(--allyra-neutral-900)]"
            style={{ fontWeight: 600 }}
          >
            {option.amount}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        <p className="text-[13px] text-[var(--allyra-neutral-600)] leading-relaxed mb-3">
          {option.description}
        </p>

        {/* Relevance tag */}
        <div className="flex items-center gap-1.5 mb-3">
          <ArrowRight className="w-3 h-3 text-[var(--allyra-green)]" strokeWidth={2} />
          <span className="text-[11px] text-[var(--allyra-green)]" style={{ fontWeight: 500 }}>
            {option.relevance}
          </span>
        </div>

        {/* Eligibility */}
        <div className="mb-0">
          <span
            className="text-[10px] tracking-[0.06em] uppercase text-[var(--allyra-neutral-500)] block mb-1.5"
            style={{ fontWeight: 600 }}
          >
            Eligibility
          </span>
          <div className="space-y-1">
            {option.eligibility.map((item, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <CheckCircle2
                  className="w-3.5 h-3.5 text-[var(--allyra-neutral-400)] flex-shrink-0 mt-0.5"
                  strokeWidth={2}
                />
                <span className="text-[12px] text-[var(--allyra-neutral-600)]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 bg-[var(--allyra-neutral-50)] border-t border-[var(--allyra-neutral-100)] flex items-center gap-4">
        <button className="flex items-center gap-1.5 text-[12px] text-[var(--allyra-green)] hover:underline cursor-pointer" style={{ fontWeight: 500 }}>
          <ExternalLink className="w-3.5 h-3.5" strokeWidth={2} />
          View details
        </button>
        <button className="flex items-center gap-1.5 text-[12px] text-[var(--allyra-neutral-500)] hover:text-[var(--allyra-neutral-700)] cursor-pointer" style={{ fontWeight: 500 }}>
          <FileCheck className="w-3.5 h-3.5" strokeWidth={2} />
          Check eligibility
        </button>
      </div>
    </div>
  );
}

export function Funding() {
  const { navBadges, growthPlanStep } = useChatContext();
  const hasContent = growthPlanStep >= 6;

  return (
    <div className="h-full bg-white px-12 py-10 overflow-y-auto">
      <div className="max-w-5xl">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl tracking-tight text-[var(--allyra-neutral-900)]">
            Funding Opportunities
          </h1>
          {navBadges["funding"] && (
            <span
              className="text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-full bg-[var(--allyra-green-light)] text-[var(--allyra-green)] border border-[var(--allyra-green-muted)]"
              style={{ fontWeight: 600 }}
            >
              New
            </span>
          )}
        </div>
        <p className="text-[var(--allyra-neutral-600)] text-base mb-8">
          Financing options and support programmes matched to your growth plan.
        </p>

        {hasContent ? (
          <>
            {/* Summary strip */}
            <div className="flex items-center gap-6 mb-6 px-5 py-3 bg-[var(--allyra-neutral-50)] rounded-xl border border-[var(--allyra-neutral-200)]">
              <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-[var(--allyra-green)]" strokeWidth={2} />
                <span className="text-[13px] text-[var(--allyra-neutral-700)]" style={{ fontWeight: 500 }}>
                  {FUNDING_OPTIONS.length} opportunities identified
                </span>
              </div>
              <span className="text-[12px] text-[var(--allyra-neutral-400)]">
                Matched to your Growth Plan initiatives
              </span>
            </div>

            {/* Funding grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {FUNDING_OPTIONS.map((option) => (
                <FundingCard key={option.id} option={option} />
              ))}
            </div>

            {/* Disclaimer */}
            <div className="mt-6 px-4 py-3 bg-[var(--allyra-neutral-50)] rounded-lg border border-[var(--allyra-neutral-100)]">
              <p className="text-[11px] text-[var(--allyra-neutral-400)] leading-relaxed">
                <span style={{ fontWeight: 600 }}>Note:</span> Funding options shown are indicative and based on publicly available information. Eligibility, terms, and availability may vary. Allyra does not provide financial advice — please consult with relevant providers directly.
              </p>
            </div>
          </>
        ) : (
          <div className="h-64 border border-dashed border-[var(--allyra-neutral-300)] rounded-xl flex flex-col items-center justify-center gap-3">
            <Landmark className="w-8 h-8 text-[var(--allyra-neutral-300)]" strokeWidth={1.5} />
            <p className="text-[var(--allyra-neutral-500)] text-center max-w-sm">
              Funding opportunities will surface here as Allyra understands your business needs and growth stage.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}