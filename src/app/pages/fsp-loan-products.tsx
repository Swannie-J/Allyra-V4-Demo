import { useNavigate } from "react-router";
import { ArrowLeft, Banknote, TrendingUp, AlertTriangle, Landmark } from "lucide-react";
import { motion } from "motion/react";

const KPI_CARDS = [
  { label: "Active Products", value: "7", description: "Loan products in the SME lending portfolio", icon: Banknote, color: "#0f766e", bg: "#f0fdfa", border: "#99f6e4" },
  { label: "Best Performer", value: "Trade Finance", description: "Lowest NPL ratio at 1.2% with 97.8% collections", icon: TrendingUp, color: "#2d6a4f", bg: "#f0faf4", border: "#c6e9d4" },
  { label: "Highest NPL", value: "Micro-enterprise", description: "NPL ratio of 6.8% — concentrated in early-stage borrowers", icon: AlertTriangle, color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
];

const PRODUCTS = [
  { name: "Term Loans", count: 680, outstanding: "R680M", npl: "3.2%", collections: "96.8%", color: "#0f766e" },
  { name: "Revolving Credit", count: 420, outstanding: "R420M", npl: "2.8%", collections: "97.2%", color: "#2d6a4f" },
  { name: "Trade Finance", count: 380, outstanding: "R380M", npl: "1.2%", collections: "97.8%", color: "#1d4ed8" },
  { name: "Invoice Discounting", count: 320, outstanding: "R320M", npl: "2.4%", collections: "97.6%", color: "#7c3aed" },
  { name: "PO Finance", count: 240, outstanding: "R240M", npl: "3.6%", collections: "96.4%", color: "#d97706" },
  { name: "Supply Chain Finance", count: 210, outstanding: "R210M", npl: "1.8%", collections: "98.2%", color: "#0891b2" },
  { name: "Micro-enterprise", count: 150, outstanding: "R150M", npl: "6.8%", collections: "93.2%", color: "#dc2626" },
];

export function FspLoanProducts() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <header className="bg-white border-b border-[var(--allyra-neutral-200)] px-5 py-3 flex items-center gap-4">
        <button onClick={() => navigate("/fsp-dashboard")} className="lg:hidden w-8 h-8 rounded-lg hover:bg-[var(--allyra-neutral-100)] flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-[var(--allyra-neutral-600)]" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-[18px] text-[var(--allyra-neutral-900)] truncate" style={{ fontWeight: 600 }}>Loan Products</h1>
          <p className="text-[12px] text-[var(--allyra-neutral-500)]">Product-level performance and risk breakdown</p>
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

          {/* Product Breakdown Table */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-[var(--allyra-neutral-100)]">
              <h2 className="text-[14px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 600 }}>Product Performance</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[var(--allyra-neutral-100)]">
                    <th className="px-5 py-3 text-[11px] tracking-[0.04em] uppercase text-[var(--allyra-neutral-500)]" style={{ fontWeight: 600 }}>Product</th>
                    <th className="px-5 py-3 text-[11px] tracking-[0.04em] uppercase text-[var(--allyra-neutral-500)]" style={{ fontWeight: 600 }}>Facilities</th>
                    <th className="px-5 py-3 text-[11px] tracking-[0.04em] uppercase text-[var(--allyra-neutral-500)]" style={{ fontWeight: 600 }}>Outstanding</th>
                    <th className="px-5 py-3 text-[11px] tracking-[0.04em] uppercase text-[var(--allyra-neutral-500)]" style={{ fontWeight: 600 }}>NPL Ratio</th>
                    <th className="px-5 py-3 text-[11px] tracking-[0.04em] uppercase text-[var(--allyra-neutral-500)]" style={{ fontWeight: 600 }}>Collections</th>
                  </tr>
                </thead>
                <tbody>
                  {PRODUCTS.map((p) => (
                    <tr key={p.name} className="border-b border-[var(--allyra-neutral-50)] hover:bg-[var(--allyra-neutral-50)] transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                          <span className="text-[13px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 500 }}>{p.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-[13px] text-[var(--allyra-neutral-600)]">{p.count}</td>
                      <td className="px-5 py-3 text-[13px] text-[var(--allyra-neutral-600)]">{p.outstanding}</td>
                      <td className="px-5 py-3 text-[13px]" style={{ fontWeight: 600, color: parseFloat(p.npl) > 5 ? "#dc2626" : parseFloat(p.npl) > 3 ? "#d97706" : "#2d6a4f" }}>{p.npl}</td>
                      <td className="px-5 py-3 text-[13px] text-[var(--allyra-neutral-600)]">{p.collections}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
