import { useNavigate } from "react-router";
import { ArrowLeft, Award, ShoppingCart, TrendingUp, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

const PROCUREMENT_FUNNEL = [
  { label: "Programme SMEs", count: 48, pct: 100, color: "#7c3aed" },
  { label: "Contractor Ready", count: 18, pct: 38, color: "#a78bfa" },
  { label: "Submitted Tender Bids", count: 14, pct: 29, color: "#c4b5fd" },
  { label: "Awarded Contracts", count: 12, pct: 25, color: "#2d6a4f" },
];

const CONTRACTED_SMES = [
  { name: "Limpopo Steel Fabricators", category: "Steel Fabrication", contractValue: "R4.2M", awardDate: "Jan 2025", status: "Active" },
  { name: "Durban Packaging Co", category: "Industrial Packaging", contractValue: "R3.4M", awardDate: "Feb 2025", status: "Active" },
  { name: "Cape Agri Processors", category: "Food Processing", contractValue: "R2.1M", awardDate: "Mar 2025", status: "Active" },
  { name: "Mpumalanga Mining Svcs", category: "Mining Support Services", contractValue: "R4.8M", awardDate: "Jan 2025", status: "Active" },
  { name: "Rustenburg Construction", category: "Civil & Construction", contractValue: "R1.9M", awardDate: "Apr 2025", status: "Active" },
  { name: "Nelspruit Agri Supplies", category: "Agricultural Supplies", contractValue: "R1.4M", awardDate: "May 2025", status: "Active" },
  { name: "Tzaneen Timber Works", category: "Timber Products", contractValue: "R2.6M", awardDate: "Jun 2025", status: "Active" },
  { name: "Midrand Packaging Solutions", category: "Packaging", contractValue: "R2.3M", awardDate: "Jul 2025", status: "Active" },
  { name: "Port Elizabeth Metals", category: "Metal Components", contractValue: "R3.1M", awardDate: "Mar 2025", status: "Active" },
  { name: "Soweto Safety Solutions", category: "Security Services", contractValue: "R1.2M", awardDate: "Aug 2025", status: "Bidding" },
  { name: "Pretoria IT Solutions", category: "IT & Managed Services", contractValue: "R680K", awardDate: "—", status: "Bidding" },
  { name: "Rustenburg Construction", category: "Civil & Construction", contractValue: "R1.2M", awardDate: "—", status: "Bidding" },
];

export function EsdProcurement() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <header className="bg-white border-b border-[var(--allyra-neutral-200)] px-5 py-3 flex items-center gap-4">
        <button onClick={() => navigate("/esd-dashboard")} className="lg:hidden w-8 h-8 rounded-lg hover:bg-[var(--allyra-neutral-100)] flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-[var(--allyra-neutral-600)]" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-[18px] text-[var(--allyra-neutral-900)] truncate" style={{ fontWeight: 600 }}>Procurement Integration</h1>
          <p className="text-[12px] text-[var(--allyra-neutral-500)]">Supplier procurement pipeline and contract tracking</p>
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
              { label: "Contracted SMEs", value: "12", sub: "active supplier contracts", icon: CheckCircle2, color: "#2d6a4f", bg: "#f0faf4", border: "#c6e9d4" },
              { label: "Pipeline Value", value: "R28M", sub: "total contract value", icon: ShoppingCart, color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe" },
              { label: "Conversion Rate", value: "25%", sub: "programme SMEs contracted", icon: TrendingUp, color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe" },
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

          {/* Procurement Funnel */}
          <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5">
            <p className="text-[14px] text-[var(--allyra-neutral-800)] mb-4" style={{ fontWeight: 600 }}>Procurement Funnel</p>
            <div className="space-y-3">
              {PROCUREMENT_FUNNEL.map((step, i) => (
                <div key={step.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[13px] text-[var(--allyra-neutral-600)]">{step.label}</span>
                    <span className="text-[13px] text-[var(--allyra-neutral-700)]" style={{ fontWeight: 600 }}>
                      {step.count} ({step.pct}%)
                    </span>
                  </div>
                  <div className="h-4 bg-[var(--allyra-neutral-100)] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${step.pct}%` }}
                      transition={{ duration: 0.7, delay: 0.1 + i * 0.08 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: step.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contracted SMEs Table */}
          <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white overflow-hidden">
            <div className="px-5 py-4 border-b border-[var(--allyra-neutral-100)]">
              <p className="text-[14px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 600 }}>Supplier Contracts & Pipeline</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[var(--allyra-neutral-100)]">
                    {["SME", "Category", "Contract Value", "Award Date", "Status"].map((h) => (
                      <th key={h} className="px-4 py-3 text-[11px] tracking-[0.04em] uppercase text-[var(--allyra-neutral-500)]" style={{ fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CONTRACTED_SMES.map((sme, i) => {
                    const isActive = sme.status === "Active";
                    const isBidding = sme.status === "Bidding";
                    const statusStyle = isActive
                      ? { bg: "#f0faf4", text: "#2d6a4f", border: "#c6e9d4" }
                      : isBidding
                      ? { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" }
                      : { bg: "#f5f5f4", text: "#78716c", border: "#e7e5e4" };
                    return (
                      <tr key={i} className="border-b border-[var(--allyra-neutral-50)] hover:bg-[var(--allyra-neutral-50)] transition-colors">
                        <td className="px-4 py-3 text-[13px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 500 }}>{sme.name}</td>
                        <td className="px-4 py-3 text-[13px] text-[var(--allyra-neutral-600)]">{sme.category}</td>
                        <td className="px-4 py-3 text-[13px] text-[var(--allyra-neutral-700)]" style={{ fontWeight: 600 }}>{sme.contractValue}</td>
                        <td className="px-4 py-3 text-[13px] text-[var(--allyra-neutral-600)]">{sme.awardDate}</td>
                        <td className="px-4 py-3">
                          <span className="text-[10px] tracking-[0.04em] uppercase px-2 py-0.5 rounded-full" style={{ fontWeight: 600, color: statusStyle.text, backgroundColor: statusStyle.bg, border: `1px solid ${statusStyle.border}` }}>
                            {sme.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
