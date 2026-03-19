import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  ArrowLeft, Search, SlidersHorizontal, Download, LayoutGrid, List,
  MapPin, Briefcase, TrendingUp, Landmark,
} from "lucide-react";

const ALL_SMES = [
  { id: 1, name: "Tshwane Agri Co-op", country: "South Africa", sector: "Agri-processing", stage: "Growth", readiness: 78, revenue: "$2.4M", employees: 42, risk: "low" },
  { id: 2, name: "Nairobi Fresh Foods", country: "Kenya", sector: "Agri-processing", stage: "Expansion", readiness: 82, revenue: "$3.1M", employees: 68, risk: "low" },
  { id: 3, name: "Lagos Textiles Ltd", country: "Nigeria", sector: "Manufacturing", stage: "Growth", readiness: 55, revenue: "$1.8M", employees: 52, risk: "medium" },
  { id: 4, name: "Accra Solar Systems", country: "Ghana", sector: "Energy", stage: "Early", readiness: 42, revenue: "$620K", employees: 18, risk: "high" },
  { id: 5, name: "Kigali Logistics Hub", country: "Rwanda", sector: "Logistics", stage: "Finance-Ready", readiness: 88, revenue: "$4.2M", employees: 94, risk: "low" },
  { id: 6, name: "Dar Coffee Exports", country: "Tanzania", sector: "Agri-processing", stage: "Expansion", readiness: 71, revenue: "$2.8M", employees: 56, risk: "medium" },
  { id: 7, name: "Soweto Quick Serve", country: "South Africa", sector: "Retail", stage: "Growth", readiness: 63, revenue: "$1.2M", employees: 34, risk: "medium" },
  { id: 8, name: "Mombasa Marine Svcs", country: "Kenya", sector: "Services", stage: "Early", readiness: 38, revenue: "$480K", employees: 22, risk: "high" },
];

export function SmePortfolio() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredSMEs = ALL_SMES.filter((sme) =>
    sme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sme.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sme.sector.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Top Bar */}
      <header className="bg-white border-b border-[var(--allyra-neutral-200)] px-5 py-3 flex items-center gap-4">
        <button
          onClick={() => navigate("/dfi-dashboard")}
          className="lg:hidden mr-1 text-[var(--allyra-neutral-500)]"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="flex-1 min-w-0">
          <h1 className="text-[18px] text-[var(--allyra-neutral-900)] truncate" style={{ fontWeight: 600 }}>
            SME Portfolio
          </h1>
          <p className="text-[12px] text-[var(--allyra-neutral-500)]">
            {filteredSMEs.length} SMEs in portfolio
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--allyra-neutral-400)]" />
            <input
              type="text"
              placeholder="Search SMEs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-lg border border-[var(--allyra-neutral-200)] text-[12px] w-44 focus:outline-none focus:border-[#2d6a4f] transition-colors bg-white"
            />
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--allyra-neutral-200)] text-[12px] text-[var(--allyra-neutral-600)] hover:bg-[var(--allyra-neutral-50)] transition-colors">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filters
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--allyra-neutral-200)] text-[12px] text-[var(--allyra-neutral-600)] hover:bg-[var(--allyra-neutral-50)] transition-colors">
            <Download className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-1 ml-2 border border-[var(--allyra-neutral-200)] rounded-lg p-0.5">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded transition-colors ${viewMode === "grid" ? "bg-[#2d6a4f] text-white" : "text-[var(--allyra-neutral-500)] hover:bg-[var(--allyra-neutral-100)]"}`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded transition-colors ${viewMode === "list" ? "bg-[#2d6a4f] text-white" : "text-[var(--allyra-neutral-500)] hover:bg-[var(--allyra-neutral-100)]"}`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 pl-3 border-l border-[var(--allyra-neutral-200)]">
          <div className="w-7 h-7 rounded-full bg-[#eff6ff] flex items-center justify-center">
            <Landmark className="w-3.5 h-3.5 text-[#1d4ed8]" strokeWidth={2} />
          </div>
          <div>
            <p className="text-[12px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 600 }}>Pan-African DFI</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredSMEs.map((sme, i) => (
              <motion.div
                key={sme.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-4 hover:shadow-lg hover:border-[#2d6a4f] transition-all cursor-pointer group"
                onClick={() => navigate("/dfi-dashboard")}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[14px] text-[var(--allyra-neutral-900)] group-hover:text-[#2d6a4f] transition-colors" style={{ fontWeight: 600 }}>
                    {sme.name}
                  </h3>
                  <div className={`w-2 h-2 rounded-full ${sme.risk === "low" ? "bg-[#2d6a4f]" : sme.risk === "medium" ? "bg-[#d97706]" : "bg-[#dc2626]"}`} />
                </div>
                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-[11px] text-[var(--allyra-neutral-500)]">
                    <MapPin className="w-3 h-3" />
                    {sme.country} · {sme.sector}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-[var(--allyra-neutral-500)]">
                    <Briefcase className="w-3 h-3" />
                    {sme.employees} employees
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-[var(--allyra-neutral-500)]">
                    <TrendingUp className="w-3 h-3" />
                    {sme.revenue} annual revenue
                  </div>
                </div>
                <div className="pt-3 border-t border-[var(--allyra-neutral-100)]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-[var(--allyra-neutral-500)]">Readiness</span>
                    <span className="text-[11px] text-[var(--allyra-neutral-700)]" style={{ fontWeight: 600 }}>{sme.readiness}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[var(--allyra-neutral-100)] overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${sme.readiness}%`,
                        backgroundColor: sme.readiness >= 70 ? "#2d6a4f" : sme.readiness >= 50 ? "#d97706" : "#dc2626",
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-[var(--allyra-neutral-200)] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[var(--allyra-neutral-50)] border-b border-[var(--allyra-neutral-200)]">
                  {["SME Name", "Country", "Sector", "Stage", "Readiness", "Revenue", "Employees", "Risk"].map((col) => (
                    <th key={col} className="text-left text-[10px] tracking-[0.05em] uppercase text-[var(--allyra-neutral-400)] px-4 py-2.5" style={{ fontWeight: 600 }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredSMEs.map((sme) => (
                  <tr
                    key={sme.id}
                    className="border-b border-[var(--allyra-neutral-50)] hover:bg-[var(--allyra-neutral-50)] cursor-pointer transition-colors"
                    onClick={() => navigate("/dfi-dashboard")}
                  >
                    <td className="px-4 py-3 text-[12px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 600 }}>{sme.name}</td>
                    <td className="px-4 py-3 text-[12px] text-[var(--allyra-neutral-600)]">{sme.country}</td>
                    <td className="px-4 py-3 text-[12px] text-[var(--allyra-neutral-600)]">{sme.sector}</td>
                    <td className="px-4 py-3">
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--allyra-neutral-100)] text-[var(--allyra-neutral-700)]">
                        {sme.stage}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[12px] text-[var(--allyra-neutral-700)]" style={{ fontWeight: 600 }}>{sme.readiness}%</td>
                    <td className="px-4 py-3 text-[12px] text-[var(--allyra-neutral-600)]">{sme.revenue}</td>
                    <td className="px-4 py-3 text-[12px] text-[var(--allyra-neutral-600)]">{sme.employees}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] tracking-[0.04em] uppercase px-2 py-0.5 rounded-full ${sme.risk === "low" ? "bg-[#f0faf4] text-[#2d6a4f] border border-[#c6e9d4]" : sme.risk === "medium" ? "bg-[#fffbeb] text-[#d97706] border border-[#fde68a]" : "bg-[#fef2f2] text-[#dc2626] border border-[#fecaca]"}`} style={{ fontWeight: 600 }}>
                        {sme.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
