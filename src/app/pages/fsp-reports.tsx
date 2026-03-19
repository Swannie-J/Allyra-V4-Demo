import { useNavigate } from "react-router";
import { ArrowLeft, FileText, Shield, TrendingUp, DollarSign, Banknote, Brain, Landmark, Download } from "lucide-react";

const REPORTS = [
  { title: "Regulatory Report", description: "Basel III compliance and central bank reporting", icon: Shield, color: "#dc2626" },
  { title: "Portfolio Quality", description: "PAR aging, NPL trends, and provisioning analysis", icon: TrendingUp, color: "#0f766e" },
  { title: "Vintage Analysis", description: "Loan cohort performance by origination period", icon: FileText, color: "#1d4ed8" },
  { title: "Collections Performance", description: "Recovery rates and collections efficiency", icon: DollarSign, color: "#d97706" },
  { title: "Product Performance", description: "Loan product profitability and risk comparison", icon: Banknote, color: "#7c3aed" },
  { title: "Allyra Intelligence", description: "Knowledge score impact on portfolio outcomes", icon: Brain, color: "#0891b2" },
];

export function FspReports() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <header className="bg-white border-b border-[var(--allyra-neutral-200)] px-5 py-3 flex items-center gap-4">
        <button onClick={() => navigate("/fsp-dashboard")} className="lg:hidden w-8 h-8 rounded-lg hover:bg-[var(--allyra-neutral-100)] flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-[var(--allyra-neutral-600)]" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-[18px] text-[var(--allyra-neutral-900)] truncate" style={{ fontWeight: 600 }}>Reports & Analytics</h1>
          <p className="text-[12px] text-[var(--allyra-neutral-500)]">Generate and download portfolio reports</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f0fdfa] border border-[#99f6e4]">
          <Landmark className="w-3.5 h-3.5" style={{ color: "#0f766e" }} strokeWidth={2} />
          <span className="text-[12px]" style={{ fontWeight: 600, color: "#0f766e" }}>Pan-African Bank</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-5">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REPORTS.map((report) => {
            const Icon = report.icon;
            return (
              <div key={report.title} className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5 hover:shadow-md hover:border-[#0f766e] transition-all">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: `${report.color}10` }}>
                  <Icon className="w-5 h-5" style={{ color: report.color }} strokeWidth={1.8} />
                </div>
                <h3 className="text-[14px] text-[var(--allyra-neutral-800)] mb-1" style={{ fontWeight: 600 }}>{report.title}</h3>
                <p className="text-[12px] text-[var(--allyra-neutral-500)] mb-3">{report.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[var(--allyra-neutral-400)]">Updated Mar 2026</span>
                  <button className="flex items-center gap-1 text-[12px] px-2.5 py-1 rounded-lg bg-[var(--allyra-neutral-100)] hover:bg-[var(--allyra-neutral-200)] transition-colors" style={{ fontWeight: 500, color: "var(--allyra-neutral-700)" }}>
                    <Download className="w-3 h-3" /> Download
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
