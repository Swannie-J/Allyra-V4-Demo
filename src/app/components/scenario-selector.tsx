import { Store, Leaf, Package, Truck, Coffee, Scissors, Landmark, Briefcase, Award, Rocket, Wrench, type LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import type { ScenarioId } from "./chat-context";
import logo from "../../assets/365cd6f2dd45be695d6550c45d6280e22785450e.png";

export interface Scenario {
  id: ScenarioId;
  title: string;
  owner: string;
  sector: string;
  stage: string;
  location: string;
  description: string;
  icon: typeof Store;
  accentColor: string;
  bgColor: string;
  borderColor: string;
  available: boolean;
}

export const SCENARIOS: Scenario[] = [
  {
    id: "masakhane",
    title: "Masakhane Mini Market",
    owner: "Nthabiseng Mokoena",
    sector: "Township Retail / Spaza Shop",
    stage: "Informal-to-Formal Growth",
    location: "Orlando West, Soweto",
    description:
      "A thriving spaza shop serving a loyal local community, looking to improve stock control, cash discipline, and expand prepared food offerings.",
    icon: Store,
    accentColor: "var(--allyra-green)",
    bgColor: "#f0faf4",
    borderColor: "#c6e9d4",
    available: true,
  },
  {
    id: "henderson",
    title: "Henderson Steel Fabrication",
    owner: "Mark Henderson",
    sector: "Manufacturing & Fabrication",
    stage: "Growth Stage",
    location: "Wadeville, Gauteng",
    description:
      "A metal fabrication business supplying structural steel, gates, balustrades, and custom work to contractors and industrial clients, looking to improve margins, tighten workshop control, and reduce owner dependence.",
    icon: Wrench,
    accentColor: "#475569",
    bgColor: "#f8fafc",
    borderColor: "#cbd5e1",
    available: true,
  },
  {
    id: "dlamini",
    title: "Dlamini Fleet Services",
    owner: "Sibusiso Dlamini",
    sector: "Logistics & Transport",
    stage: "Expansion Stage",
    location: "Pinetown, Durban / KwaZulu-Natal",
    description:
      "A six-truck regional fleet business handling contract deliveries for wholesalers, distributors, and manufacturers across KZN, looking to stabilise working capital, improve fleet utilisation, and grow into larger contract work.",
    icon: Truck,
    accentColor: "#c2410c",
    bgColor: "#fff7ed",
    borderColor: "#fed7aa",
    available: true,
  },
  {
    id: "vukani",
    title: "Vukani Logistics",
    owner: "",
    sector: "Last-Mile Delivery",
    stage: "",
    location: "",
    description: "",
    icon: Package,
    accentColor: "#9333ea",
    bgColor: "#faf5ff",
    borderColor: "#e9d5ff",
    available: false,
  },
  {
    id: "indalo",
    title: "Indalo Roastery & Café",
    owner: "",
    sector: "Specialty Food & Beverage",
    stage: "",
    location: "",
    description: "",
    icon: Coffee,
    accentColor: "#dc2626",
    bgColor: "#fef2f2",
    borderColor: "#fecaca",
    available: false,
  },
  {
    id: "sizwe",
    title: "Sizwe Stitch & Style",
    owner: "",
    sector: "Fashion & Textile Manufacturing",
    stage: "",
    location: "",
    description: "",
    icon: Scissors,
    accentColor: "#d97706",
    bgColor: "#fffbeb",
    borderColor: "#fde68a",
    available: false,
  },
];

interface ScenarioSelectorProps {
  onSelectScenario: (scenarioId: ScenarioId) => void;
}

const PARTNER_PORTFOLIOS = [
  {
    label: "Bank / FSP Portfolio",
    description: "SME lending book performance and growth analytics",
    icon: Landmark,
    accentColor: "#0f766e",
    bgColor: "#f0fdfa",
    borderColor: "#99f6e4",
  },
  {
    label: "DFI Portfolio",
    description: "Development finance impact measurement and reporting",
    icon: Briefcase,
    accentColor: "#1d4ed8",
    bgColor: "#eff6ff",
    borderColor: "#bfdbfe",
  },
  {
    label: "Corporate ESD Portfolio",
    description: "Enterprise supplier development programme tracking",
    icon: Award,
    accentColor: "#7c3aed",
    bgColor: "#f5f3ff",
    borderColor: "#ddd6fe",
  },
  {
    label: "Accelerator / TA Portfolio",
    description: "Technical assistance cohort progress and outcomes",
    icon: Rocket,
    accentColor: "#c2410c",
    bgColor: "#fff7ed",
    borderColor: "#fed7aa",
  },
];

export function ScenarioSelector({ onSelectScenario }: ScenarioSelectorProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-full w-full flex items-start justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="max-w-6xl w-full">
        {/* Header with Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-8 sm:mb-12"
        >
          {/* Logo */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <img 
              src={logo} 
              alt="Allyra" 
              className="h-16 sm:h-20 lg:h-24 w-auto"
            />
          </div>
          
          {/* Title and Tagline */}
          <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] tracking-tight text-[var(--allyra-neutral-900)] mb-1 sm:mb-2">
            Allyra
          </h1>
          <p className="text-[16px] sm:text-[18px] text-[var(--allyra-green)] mb-4 sm:mb-6" style={{ fontWeight: 500 }}>
            Always On · Always Growing
          </p>
          
          <p className="text-[14px] sm:text-[16px] text-[var(--allyra-neutral-600)] max-w-2xl mx-auto leading-relaxed px-4">
            Experience how Allyra partners with SME owners to unlock growth.
            Choose a business scenario to explore the platform.
          </p>
        </motion.div>

        {/* Scenario Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {SCENARIOS.map((scenario, index) => {
            const Icon = scenario.icon;
            const isAvailable = scenario.available;

            return (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.1 + index * 0.08,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <div
                  className={`w-full text-left rounded-xl border transition-all ${
                    isAvailable
                      ? "bg-white shadow-sm"
                      : "bg-[var(--allyra-neutral-100)] opacity-60"
                  }`}
                  style={{
                    borderColor: isAvailable
                      ? scenario.borderColor
                      : "var(--allyra-neutral-300)",
                  }}
                >
                  {/* Card Header */}
                  <div
                    className="px-4 sm:px-5 py-3 sm:py-4 border-b flex items-center gap-3"
                    style={{
                      backgroundColor: isAvailable ? scenario.bgColor : "var(--allyra-neutral-100)",
                      borderColor: isAvailable ? scenario.borderColor : "var(--allyra-neutral-300)",
                    }}
                  >
                    <div
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: "white",
                        border: `1px solid ${isAvailable ? scenario.borderColor : "var(--allyra-neutral-300)"}`,
                      }}
                    >
                      <Icon
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        style={{ color: isAvailable ? scenario.accentColor : "var(--allyra-neutral-400)" }}
                        strokeWidth={2}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-[14px] sm:text-[15px] truncate"
                        style={{ fontWeight: 600, color: isAvailable ? scenario.accentColor : "var(--allyra-neutral-500)" }}
                      >
                        {scenario.title}
                      </h3>
                      {isAvailable && scenario.owner && (
                        <p className="text-[11px] sm:text-[12px] text-[var(--allyra-neutral-600)] truncate">
                          {scenario.owner}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="px-4 sm:px-5 py-3 sm:py-4 space-y-2.5 sm:space-y-3">
                    {isAvailable ? (
                      <>
                        {/* Metadata */}
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                          <div>
                            <span
                              className="text-[9px] sm:text-[10px] tracking-[0.06em] uppercase text-[var(--allyra-neutral-500)] block mb-0.5"
                              style={{ fontWeight: 600 }}
                            >
                              Sector
                            </span>
                            <span className="text-[12px] sm:text-[13px] text-[var(--allyra-neutral-800)] leading-tight block">
                              {scenario.sector}
                            </span>
                          </div>
                          <div>
                            <span
                              className="text-[9px] sm:text-[10px] tracking-[0.06em] uppercase text-[var(--allyra-neutral-500)] block mb-0.5"
                              style={{ fontWeight: 600 }}
                            >
                              Stage
                            </span>
                            <span className="text-[12px] sm:text-[13px] text-[var(--allyra-neutral-800)] leading-tight block">
                              {scenario.stage}
                            </span>
                          </div>
                        </div>

                        {/* Location */}
                        <div>
                          <span
                            className="text-[9px] sm:text-[10px] tracking-[0.06em] uppercase text-[var(--allyra-neutral-500)] block mb-0.5"
                            style={{ fontWeight: 600 }}
                          >
                            Location
                          </span>
                          <span className="text-[12px] sm:text-[13px] text-[var(--allyra-neutral-800)]">
                            {scenario.location}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-[12px] sm:text-[13px] text-[var(--allyra-neutral-600)] leading-relaxed pt-1 sm:pt-2">
                          {scenario.description}
                        </p>

                        {/* CTA */}
                        <button
                          onClick={() => onSelectScenario(scenario.id)}
                          className="pt-1.5 sm:pt-2 text-[12px] sm:text-[13px] flex items-center gap-1.5 hover:gap-2 transition-all"
                          style={{ color: scenario.accentColor, fontWeight: 600 }}
                        >
                          Start Demo →
                        </button>
                      </>
                    ) : (
                      <div className="py-2 sm:py-3 text-center">
                        <p className="text-[12px] sm:text-[13px] text-[var(--allyra-neutral-500)] mb-1">
                          {scenario.sector}
                        </p>
                        <span
                          className="inline-block text-[11px] sm:text-[12px] tracking-[0.05em] uppercase px-3 py-1 rounded-full bg-[var(--allyra-neutral-200)] text-[var(--allyra-neutral-500)]"
                          style={{ fontWeight: 600 }}
                        >
                          Coming Soon
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 sm:mt-12 text-center"
        >
          <p className="text-[12px] sm:text-[13px] text-[var(--allyra-neutral-500)] px-4">
            Each scenario runs a fully automated demo showcasing the complete
            Allyra experience.
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="mt-8 sm:mt-10 mb-8 sm:mb-10 flex items-center gap-4"
        >
          <div className="flex-1 h-px bg-[var(--allyra-neutral-200)]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--allyra-green)] opacity-40" />
          <div className="flex-1 h-px bg-[var(--allyra-neutral-200)]" />
        </motion.div>

        {/* Partner Institution Dashboard Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75, ease: [0.4, 0, 0.2, 1] }}
          className="mb-12"
        >
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-[20px] sm:text-[24px] tracking-tight text-[var(--allyra-neutral-900)] mb-1.5">
              Partner Institution Dashboard
            </h2>
            <p className="text-[13px] sm:text-[14px] text-[var(--allyra-neutral-500)] max-w-xl mx-auto">
              Institutional views for portfolio-level oversight and SME performance tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {PARTNER_PORTFOLIOS.map((portfolio, index) => {
              const Icon = portfolio.icon;
              const isDFI = portfolio.label === "DFI Portfolio";
              const isBank = portfolio.label === "Bank / FSP Portfolio";
              const isESD = portfolio.label === "Corporate ESD Portfolio";
              const isClickable = isDFI || isBank || isESD;
              return (
                <motion.div
                  key={portfolio.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.85 + index * 0.08,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  <div
                    className={`rounded-xl border transition-all ${
                      isClickable
                        ? "bg-white opacity-100 cursor-pointer hover:shadow-md"
                        : "bg-white opacity-70"
                    }`}
                    style={{
                      borderColor: portfolio.borderColor,
                    }}
                    onClick={
                      isBank ? () => navigate("/fsp-dashboard")
                        : isDFI ? () => navigate("/dfi-dashboard")
                        : isESD ? () => navigate("/esd-dashboard")
                        : undefined
                    }
                  >
                    <div
                      className="px-4 sm:px-5 py-3.5 sm:py-4 flex items-center gap-3.5"
                      style={{ backgroundColor: portfolio.bgColor, borderRadius: "0.75rem" }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: "white",
                          border: `1px solid ${portfolio.borderColor}`,
                        }}
                      >
                        <Icon
                          className="w-[18px] h-[18px]"
                          style={{ color: portfolio.accentColor }}
                          strokeWidth={1.8}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3
                          className="text-[14px] sm:text-[15px]"
                          style={{ fontWeight: 600, color: portfolio.accentColor }}
                        >
                          {portfolio.label}
                        </h3>
                        <p className="text-[11px] sm:text-[12px] text-[var(--allyra-neutral-500)]">
                          {portfolio.description}
                        </p>
                      </div>
                      {isClickable ? (
                        <span
                          className="shrink-0 text-[12px] sm:text-[13px] flex items-center gap-1 hover:gap-1.5 transition-all"
                          style={{ fontWeight: 600, color: portfolio.accentColor }}
                        >
                          View Dashboard →
                        </span>
                      ) : (
                        <span
                          className="shrink-0 text-[10px] sm:text-[11px] tracking-[0.05em] uppercase px-2.5 py-1 rounded-full bg-[var(--allyra-neutral-200)] text-[var(--allyra-neutral-500)]"
                          style={{ fontWeight: 600 }}
                        >
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}