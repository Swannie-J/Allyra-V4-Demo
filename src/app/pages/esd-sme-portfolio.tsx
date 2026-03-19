import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Search, SlidersHorizontal, Download, LayoutGrid, List, Award, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { EsdSmeDrawer, type EsdSme } from "../components/esd-sme-drawer";

const SME_LIST: EsdSme[] = [
  { name: "Limpopo Steel Fabricators", province: "Limpopo", sector: "Manufacturing", programmeType: "Supplier Dev", spendAllocated: "R4.2M", devScore: 91, status: "on-track", jobsCreated: 34, mentor: "Thabo Nkosi" },
  { name: "Soweto Safety Solutions", province: "Gauteng", sector: "Security & Services", programmeType: "Enterprise Dev", spendAllocated: "R1.2M", devScore: 71, status: "on-track", jobsCreated: 12, mentor: "Naledi Dlamini" },
  { name: "Durban Packaging Co", province: "KwaZulu-Natal", sector: "Manufacturing", programmeType: "Supplier Dev", spendAllocated: "R3.4M", devScore: 78, status: "on-track", jobsCreated: 28, mentor: "Sipho Mkhize" },
  { name: "Joburg Green Cleaning", province: "Gauteng", sector: "Facilities", programmeType: "Enterprise Dev", spendAllocated: "R480K", devScore: 52, status: "at-risk", jobsCreated: 6, mentor: "Refilwe Mokoena" },
  { name: "Cape Agri Processors", province: "Western Cape", sector: "Agri-processing", programmeType: "Supplier Dev", spendAllocated: "R2.1M", devScore: 89, status: "on-track", jobsCreated: 22, mentor: "Dirk van Wyk" },
  { name: "Pretoria IT Solutions", province: "Gauteng", sector: "ICT", programmeType: "Enterprise Dev", spendAllocated: "R680K", devScore: 65, status: "on-track", jobsCreated: 8, mentor: "Zanele Khumalo" },
  { name: "Kimberley Logistics", province: "Northern Cape", sector: "Logistics", programmeType: "Supplier Dev", spendAllocated: "R1.6M", devScore: 43, status: "at-risk", jobsCreated: 14, mentor: "Pieter Botha" },
  { name: "Mpumalanga Mining Svcs", province: "Mpumalanga", sector: "Mining Services", programmeType: "Supplier Dev", spendAllocated: "R4.8M", devScore: 91, status: "on-track", jobsCreated: 41, mentor: "Grace Sithole" },
  { name: "Bloemfontein Catering", province: "Free State", sector: "Hospitality", programmeType: "Enterprise Dev", spendAllocated: "R320K", devScore: 38, status: "stalled", jobsCreated: 5, mentor: "Lerato Molefe" },
  { name: "Rustenburg Construction", province: "North West", sector: "Construction", programmeType: "Supplier Dev", spendAllocated: "R1.9M", devScore: 77, status: "on-track", jobsCreated: 18, mentor: "Andrew Jacobs" },
  { name: "Midrand Packaging Solutions", province: "Gauteng", sector: "Manufacturing", programmeType: "Supplier Dev", spendAllocated: "R2.3M", devScore: 68, status: "on-track", jobsCreated: 19, mentor: "Thabo Nkosi" },
  { name: "Port Elizabeth Metals", province: "Eastern Cape", sector: "Manufacturing", programmeType: "Supplier Dev", spendAllocated: "R3.1M", devScore: 74, status: "on-track", jobsCreated: 25, mentor: "Sipho Mkhize" },
  { name: "Polokwane Food Services", province: "Limpopo", sector: "Hospitality", programmeType: "Enterprise Dev", spendAllocated: "R410K", devScore: 58, status: "at-risk", jobsCreated: 7, mentor: "Zanele Khumalo" },
  { name: "Nelspruit Agri Supplies", province: "Mpumalanga", sector: "Agri-processing", programmeType: "Supplier Dev", spendAllocated: "R1.4M", devScore: 82, status: "on-track", jobsCreated: 16, mentor: "Grace Sithole" },
  { name: "Upington Solar Tech", province: "Northern Cape", sector: "Energy", programmeType: "Enterprise Dev", spendAllocated: "R520K", devScore: 47, status: "at-risk", jobsCreated: 6, mentor: "Dirk van Wyk" },
  { name: "Tzaneen Timber Works", province: "Limpopo", sector: "Manufacturing", programmeType: "Supplier Dev", spendAllocated: "R2.6M", devScore: 79, status: "on-track", jobsCreated: 21, mentor: "Andrew Jacobs" },
];

function devScoreColor(score: number) {
  if (score >= 81) return "#2d6a4f";
  if (score >= 61) return "#7c3aed";
  if (score >= 41) return "#d97706";
  return "#dc2626";
}

function statusColor(status: string) {
  if (status === "on-track") return { bg: "#f0faf4", text: "#2d6a4f", border: "#c6e9d4", label: "On Track" };
  if (status === "at-risk") return { bg: "#fffbeb", text: "#d97706", border: "#fde68a", label: "At Risk" };
  return { bg: "#fef2f2", text: "#dc2626", border: "#fecaca", label: "Stalled" };
}

export function EsdSmePortfolio() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedSme, setSelectedSme] = useState<EsdSme | null>(null);

  const filtered = SME_LIST.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.province.toLowerCase().includes(search.toLowerCase()) ||
      s.sector.toLowerCase().includes(search.toLowerCase()) ||
      s.programmeType.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <header className="bg-white border-b border-[var(--allyra-neutral-200)] px-5 py-3 flex items-center gap-4">
        <button onClick={() => navigate("/esd-dashboard")} className="lg:hidden w-8 h-8 rounded-lg hover:bg-[var(--allyra-neutral-100)] flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-[var(--allyra-neutral-600)]" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-[18px] text-[var(--allyra-neutral-900)] truncate" style={{ fontWeight: 600 }}>SME Portfolio</h1>
          <p className="text-[12px] text-[var(--allyra-neutral-500)]">{filtered.length} programme SMEs</p>
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
              placeholder="Search SMEs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-[12px] border border-[var(--allyra-neutral-200)] rounded-lg w-48 focus:outline-none focus:border-[#7c3aed]"
            />
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] border border-[var(--allyra-neutral-200)] rounded-lg hover:bg-[var(--allyra-neutral-50)]" style={{ fontWeight: 500 }}>
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] border border-[var(--allyra-neutral-200)] rounded-lg hover:bg-[var(--allyra-neutral-50)]" style={{ fontWeight: 500 }}>
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f5f3ff] border border-[#ddd6fe]">
          <Award className="w-3.5 h-3.5" style={{ color: "#7c3aed" }} strokeWidth={2} />
          <span className="text-[12px]" style={{ fontWeight: 600, color: "#7c3aed" }}>Sipho Resources</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-5">
        {view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((sme, i) => {
              const sc = devScoreColor(sme.devScore);
              const st = statusColor(sme.status);
              return (
                <motion.div
                  key={sme.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-4 cursor-pointer hover:shadow-md hover:border-[#7c3aed] transition-all"
                  onClick={() => setSelectedSme(sme)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[14px] text-[var(--allyra-neutral-800)] truncate" style={{ fontWeight: 600 }}>{sme.name}</h3>
                      <p className="text-[11px] text-[var(--allyra-neutral-500)] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" /> {sme.province}
                      </p>
                    </div>
                    <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: st.text }} />
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div>
                      <p className="text-[10px] uppercase text-[var(--allyra-neutral-400)]" style={{ fontWeight: 600 }}>Programme</p>
                      <p className="text-[12px] text-[var(--allyra-neutral-700)]">{sme.programmeType}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-[var(--allyra-neutral-400)]" style={{ fontWeight: 600 }}>Spend</p>
                      <p className="text-[12px] text-[var(--allyra-neutral-700)]" style={{ fontWeight: 600 }}>{sme.spendAllocated}</p>
                    </div>
                  </div>
                  {/* Dev Score mini bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[10px] uppercase text-[var(--allyra-neutral-400)]" style={{ fontWeight: 600 }}>Development Score</p>
                      <span className="text-[11px]" style={{ fontWeight: 700, color: sc }}>{sme.devScore}</span>
                    </div>
                    <div className="h-1.5 bg-[var(--allyra-neutral-100)] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${sme.devScore}%`, backgroundColor: sc }} />
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
                    {["SME", "Province", "Sector", "Programme", "Spend", "Dev Score", "Jobs", "Status"].map((h) => (
                      <th key={h} className="px-4 py-3 text-[11px] tracking-[0.04em] uppercase text-[var(--allyra-neutral-500)]" style={{ fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((sme) => {
                    const sc = devScoreColor(sme.devScore);
                    const st = statusColor(sme.status);
                    return (
                      <tr
                        key={sme.name}
                        className="border-b border-[var(--allyra-neutral-50)] hover:bg-[var(--allyra-neutral-50)] cursor-pointer transition-colors"
                        onClick={() => setSelectedSme(sme)}
                      >
                        <td className="px-4 py-3 text-[13px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 500 }}>{sme.name}</td>
                        <td className="px-4 py-3 text-[13px] text-[var(--allyra-neutral-600)]">{sme.province}</td>
                        <td className="px-4 py-3 text-[13px] text-[var(--allyra-neutral-600)]">{sme.sector}</td>
                        <td className="px-4 py-3 text-[13px] text-[var(--allyra-neutral-600)]">{sme.programmeType}</td>
                        <td className="px-4 py-3 text-[13px] text-[var(--allyra-neutral-700)]" style={{ fontWeight: 600 }}>{sme.spendAllocated}</td>
                        <td className="px-4 py-3">
                          <span className="text-[12px]" style={{ fontWeight: 700, color: sc }}>{sme.devScore}</span>
                        </td>
                        <td className="px-4 py-3 text-[13px] text-[var(--allyra-neutral-600)]">{sme.jobsCreated}</td>
                        <td className="px-4 py-3">
                          <span className="text-[10px] tracking-[0.04em] uppercase px-2 py-0.5 rounded-full" style={{ fontWeight: 600, color: st.text, backgroundColor: st.bg, border: `1px solid ${st.border}` }}>{st.label}</span>
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

      <EsdSmeDrawer sme={selectedSme} onClose={() => setSelectedSme(null)} />
    </div>
  );
}
