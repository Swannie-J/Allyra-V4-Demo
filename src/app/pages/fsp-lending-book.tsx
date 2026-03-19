import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Search, SlidersHorizontal, Download, LayoutGrid, List, Landmark, MapPin } from "lucide-react";
import { motion } from "motion/react";

interface Borrower {
  id: string;
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

const BORROWERS: Borrower[] = [
  { id: "b1", name: "Tshwane Agri Co-op", country: "South Africa", sector: "Agri-processing", product: "Term Loan", outstanding: "R4.2M", dscr: 1.8, par: "Current", allyraScore: 82, risk: "low" },
  { id: "b2", name: "Nairobi Fresh Foods", country: "Kenya", sector: "Agri-processing", product: "Trade Finance", outstanding: "R2.8M", dscr: 1.5, par: "Current", allyraScore: 76, risk: "low" },
  { id: "b3", name: "Lagos Textiles Ltd", country: "Nigeria", sector: "Manufacturing", product: "Invoice Discount", outstanding: "R1.6M", dscr: 1.1, par: "PAR 1-30", allyraScore: 54, risk: "medium" },
  { id: "b4", name: "Accra Solar Systems", country: "Ghana", sector: "Energy", product: "PO Finance", outstanding: "R890K", dscr: 0.9, par: "PAR 31-60", allyraScore: 38, risk: "high" },
  { id: "b5", name: "Kigali Logistics Hub", country: "Rwanda", sector: "Logistics", product: "Revolving Credit", outstanding: "R5.1M", dscr: 2.2, par: "Current", allyraScore: 91, risk: "low" },
  { id: "b6", name: "Dar Coffee Exports", country: "Tanzania", sector: "Agri-processing", product: "Supply Chain Fin", outstanding: "R3.4M", dscr: 1.3, par: "Current", allyraScore: 65, risk: "medium" },
  { id: "b7", name: "Soweto Quick Serve", country: "South Africa", sector: "Retail", product: "Micro-enterprise", outstanding: "R420K", dscr: 1.0, par: "PAR 1-30", allyraScore: 47, risk: "medium" },
  { id: "b8", name: "Mombasa Marine Svcs", country: "Kenya", sector: "Services", product: "Term Loan", outstanding: "R1.2M", dscr: 0.8, par: "PAR 61-90", allyraScore: 32, risk: "high" },
];

function riskColor(risk: string) {
  if (risk === "high") return { bg: "#fef2f2", text: "#dc2626", border: "#fecaca" };
  if (risk === "medium") return { bg: "#fffbeb", text: "#d97706", border: "#fde68a" };
  return { bg: "#f0faf4", text: "#2d6a4f", border: "#c6e9d4" };
}

function scoreColor(score: number) {
  if (score >= 81) return "#2d6a4f";
  if (score >= 61) return "#0f766e";
  if (score >= 41) return "#d97706";
  return "#dc2626";
}

export function FspLendingBook() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = BORROWERS.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.country.toLowerCase().includes(search.toLowerCase()) ||
      b.sector.toLowerCase().includes(search.toLowerCase()) ||
      b.product.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <header className="bg-white border-b border-[var(--allyra-neutral-200)] px-5 py-3 flex items-center gap-4">
        <button onClick={() => navigate("/fsp-dashboard")} className="lg:hidden w-8 h-8 rounded-lg hover:bg-[var(--allyra-neutral-100)] flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-[var(--allyra-neutral-600)]" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-[18px] text-[var(--allyra-neutral-900)] truncate" style={{ fontWeight: 600 }}>SME Lending Book</h1>
          <p className="text-[12px] text-[var(--allyra-neutral-500)]">{filtered.length} borrowers in portfolio</p>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <div className="flex items-center border border-[var(--allyra-neutral-200)] rounded-lg overflow-hidden">
            <button onClick={() => setView("grid")} className={`p-1.5 ${view === "grid" ? "bg-[var(--allyra-neutral-100)]" : ""}`}><LayoutGrid className="w-4 h-4 text-[var(--allyra-neutral-600)]" /></button>
            <button onClick={() => setView("list")} className={`p-1.5 ${view === "list" ? "bg-[var(--allyra-neutral-100)]" : ""}`}><List className="w-4 h-4 text-[var(--allyra-neutral-600)]" /></button>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--allyra-neutral-400)]" />
            <input
              type="text"
              placeholder="Search borrowers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-[12px] border border-[var(--allyra-neutral-200)] rounded-lg w-48 focus:outline-none focus:border-[#0f766e]"
            />
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] border border-[var(--allyra-neutral-200)] rounded-lg hover:bg-[var(--allyra-neutral-50)]" style={{ fontWeight: 500 }}>
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] border border-[var(--allyra-neutral-200)] rounded-lg hover:bg-[var(--allyra-neutral-50)]" style={{ fontWeight: 500 }}>
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f0fdfa] border border-[#99f6e4]">
          <Landmark className="w-3.5 h-3.5" style={{ color: "#0f766e" }} strokeWidth={2} />
          <span className="text-[12px]" style={{ fontWeight: 600, color: "#0f766e" }}>Pan-African Bank</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-5">
        {view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((b, i) => {
              const rc = riskColor(b.risk);
              const sc = scoreColor(b.allyraScore);
              return (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-4 cursor-pointer hover:shadow-md hover:border-[#0f766e] transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[14px] text-[var(--allyra-neutral-800)] truncate" style={{ fontWeight: 600 }}>{b.name}</h3>
                      <p className="text-[11px] text-[var(--allyra-neutral-500)] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" /> {b.country}
                      </p>
                    </div>
                    <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: rc.text }} />
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div>
                      <p className="text-[10px] uppercase text-[var(--allyra-neutral-400)]" style={{ fontWeight: 600 }}>Product</p>
                      <p className="text-[12px] text-[var(--allyra-neutral-700)]">{b.product}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-[var(--allyra-neutral-400)]" style={{ fontWeight: 600 }}>Outstanding</p>
                      <p className="text-[12px] text-[var(--allyra-neutral-700)]" style={{ fontWeight: 600 }}>{b.outstanding}</p>
                    </div>
                  </div>
                  {/* Allyra Score mini bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[10px] uppercase text-[var(--allyra-neutral-400)]" style={{ fontWeight: 600 }}>Allyra Score</p>
                      <span className="text-[11px]" style={{ fontWeight: 700, color: sc }}>{b.allyraScore}</span>
                    </div>
                    <div className="h-1.5 bg-[var(--allyra-neutral-100)] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${b.allyraScore}%`, backgroundColor: sc }} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[var(--allyra-neutral-100)]">
                    {["Borrower", "Country", "Sector", "Product", "Outstanding", "DSCR", "PAR", "Allyra Score", "Risk"].map((h) => (
                      <th key={h} className="px-4 py-3 text-[11px] tracking-[0.04em] uppercase text-[var(--allyra-neutral-500)]" style={{ fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((b) => {
                    const rc = riskColor(b.risk);
                    const sc = scoreColor(b.allyraScore);
                    return (
                      <tr key={b.id} className="border-b border-[var(--allyra-neutral-50)] hover:bg-[var(--allyra-neutral-50)] cursor-pointer transition-colors">
                        <td className="px-4 py-3 text-[13px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 500 }}>{b.name}</td>
                        <td className="px-4 py-3 text-[13px] text-[var(--allyra-neutral-600)]">{b.country}</td>
                        <td className="px-4 py-3 text-[13px] text-[var(--allyra-neutral-600)]">{b.sector}</td>
                        <td className="px-4 py-3 text-[13px] text-[var(--allyra-neutral-600)]">{b.product}</td>
                        <td className="px-4 py-3 text-[13px] text-[var(--allyra-neutral-700)]" style={{ fontWeight: 600 }}>{b.outstanding}</td>
                        <td className="px-4 py-3 text-[13px] text-[var(--allyra-neutral-600)]">{b.dscr}x</td>
                        <td className="px-4 py-3 text-[13px] text-[var(--allyra-neutral-600)]">{b.par}</td>
                        <td className="px-4 py-3">
                          <span className="text-[12px]" style={{ fontWeight: 700, color: sc }}>{b.allyraScore}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-[10px] tracking-[0.04em] uppercase px-2 py-0.5 rounded-full" style={{ fontWeight: 600, color: rc.text, backgroundColor: rc.bg, border: `1px solid ${rc.border}` }}>{b.risk}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
