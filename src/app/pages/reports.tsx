import { ArrowLeft, FileText, Download, Calendar, Landmark } from "lucide-react";
import { useNavigate } from "react-router";

export function Reports() {
  const navigate = useNavigate();
  return (
    <div className="flex-1 flex flex-col min-w-0">
      <header className="bg-white border-b border-[var(--allyra-neutral-200)] px-5 py-3 flex items-center gap-4">
        <button onClick={() => navigate("/dfi-dashboard")} className="lg:hidden mr-1 text-[var(--allyra-neutral-500)]"><ArrowLeft className="w-4 h-4" /></button>
        <div className="flex-1 min-w-0">
          <h1 className="text-[18px] text-[var(--allyra-neutral-900)] truncate" style={{ fontWeight: 600 }}>Reports & Analytics</h1>
          <p className="text-[12px] text-[var(--allyra-neutral-500)]">Portfolio insights and compliance reporting</p>
        </div>
        <div className="hidden md:flex items-center gap-2 pl-3 border-l border-[var(--allyra-neutral-200)]">
          <div className="w-7 h-7 rounded-full bg-[#eff6ff] flex items-center justify-center"><Landmark className="w-3.5 h-3.5 text-[#1d4ed8]" strokeWidth={2} /></div>
          <div><p className="text-[12px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 600 }}>Pan-African DFI</p></div>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Portfolio Overview", desc: "Quarterly performance summary", icon: FileText, color: "#2d6a4f" },
              { title: "Impact Report", desc: "Development outcomes Q1 2026", icon: FileText, color: "#7c3aed" },
              { title: "Risk Assessment", desc: "Portfolio risk analysis", icon: FileText, color: "#dc2626" },
              { title: "TA Summary", desc: "Technical assistance impact", icon: FileText, color: "#d97706" },
              { title: "Financial Summary", desc: "Deployment and returns", icon: FileText, color: "#1d4ed8" },
              { title: "Compliance Report", desc: "Regulatory and ESG", icon: FileText, color: "#0f766e" },
            ].map((report, i) => (
              <div key={i} className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5 hover:shadow-lg hover:border-[#2d6a4f] transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${report.color}15` }}>
                    <FileText className="w-5 h-5" style={{ color: report.color }} strokeWidth={2} />
                  </div>
                  <button className="w-8 h-8 rounded-lg bg-[var(--allyra-neutral-50)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Download className="w-3.5 h-3.5 text-[var(--allyra-neutral-600)]" />
                  </button>
                </div>
                <h3 className="text-[14px] text-[var(--allyra-neutral-900)] mb-1" style={{ fontWeight: 600 }}>{report.title}</h3>
                <p className="text-[12px] text-[var(--allyra-neutral-500)]">{report.desc}</p>
                <div className="flex items-center gap-1.5 mt-3 text-[11px] text-[var(--allyra-neutral-400)]">
                  <Calendar className="w-3 h-3" />Updated Mar 2026
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
