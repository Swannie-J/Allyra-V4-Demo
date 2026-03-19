import { ArrowLeft, ShieldCheck, TrendingDown, AlertTriangle, Landmark } from "lucide-react";
import { useNavigate } from "react-router";

export function ReadinessRisk() {
  const navigate = useNavigate();

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
            Readiness & Risk Assessment
          </h1>
          <p className="text-[12px] text-[var(--allyra-neutral-500)]">
            Investment readiness scoring and risk profiling
          </p>
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
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#f0faf4] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-[#2d6a4f]" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[24px] text-[var(--allyra-neutral-900)] leading-none" style={{ fontWeight: 700 }}>47</p>
                  <p className="text-[11px] text-[var(--allyra-neutral-500)] mt-0.5">Finance-Ready</p>
                </div>
              </div>
              <p className="text-[12px] text-[var(--allyra-neutral-600)]">
                SMEs scoring 70+ on investment readiness
              </p>
            </div>

            <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#fffbeb] flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-[#d97706]" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[24px] text-[var(--allyra-neutral-900)] leading-none" style={{ fontWeight: 700 }}>68</p>
                  <p className="text-[11px] text-[var(--allyra-neutral-500)] mt-0.5">Development Track</p>
                </div>
              </div>
              <p className="text-[12px] text-[var(--allyra-neutral-600)]">
                SMEs requiring capability building
              </p>
            </div>

            <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#fef2f2] flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-[#dc2626]" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[24px] text-[var(--allyra-neutral-900)] leading-none" style={{ fontWeight: 700 }}>19</p>
                  <p className="text-[11px] text-[var(--allyra-neutral-500)] mt-0.5">Elevated Risk</p>
                </div>
              </div>
              <p className="text-[12px] text-[var(--allyra-neutral-600)]">
                SMEs flagged for intervention
              </p>
            </div>
          </div>

          {/* Content Placeholder */}
          <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-8">
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-[#f0faf4] flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-[#2d6a4f]" strokeWidth={1.5} />
              </div>
              <h3 className="text-[16px] text-[var(--allyra-neutral-900)] mb-2" style={{ fontWeight: 600 }}>
                Readiness & Risk Framework
              </h3>
              <p className="text-[13px] text-[var(--allyra-neutral-500)] max-w-md mx-auto">
                Comprehensive assessment combining financial health, governance maturity, operational capability, and market positioning to determine investment readiness and risk profile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
