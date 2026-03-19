import { ArrowLeft, Target, UserCheck, Users, MapPin, Landmark } from "lucide-react";
import { useNavigate } from "react-router";

export function ImpactInclusion() {
  const navigate = useNavigate();
  return (
    <div className="flex-1 flex flex-col min-w-0">
      <header className="bg-white border-b border-[var(--allyra-neutral-200)] px-5 py-3 flex items-center gap-4">
        <button onClick={() => navigate("/dfi-dashboard")} className="lg:hidden mr-1 text-[var(--allyra-neutral-500)]"><ArrowLeft className="w-4 h-4" /></button>
        <div className="flex-1 min-w-0">
          <h1 className="text-[18px] text-[var(--allyra-neutral-900)] truncate" style={{ fontWeight: 600 }}>Impact & Inclusion Metrics</h1>
          <p className="text-[12px] text-[var(--allyra-neutral-500)]">Development mandate and social impact tracking</p>
        </div>
        <div className="hidden md:flex items-center gap-2 pl-3 border-l border-[var(--allyra-neutral-200)]">
          <div className="w-7 h-7 rounded-full bg-[#eff6ff] flex items-center justify-center"><Landmark className="w-3.5 h-3.5 text-[#1d4ed8]" strokeWidth={2} /></div>
          <div><p className="text-[12px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 600 }}>Pan-African DFI</p></div>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#fef3f2] flex items-center justify-center"><UserCheck className="w-5 h-5 text-[#f97316]" strokeWidth={2} /></div>
                <div><p className="text-[24px] text-[var(--allyra-neutral-900)] leading-none" style={{ fontWeight: 700 }}>42%</p><p className="text-[11px] text-[var(--allyra-neutral-500)] mt-0.5">Women-Led</p></div>
              </div>
              <p className="text-[12px] text-[var(--allyra-neutral-600)]">84 SMEs with women ownership</p>
            </div>
            <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#f0f9ff] flex items-center justify-center"><Users className="w-5 h-5 text-[#0ea5e9]" strokeWidth={2} /></div>
                <div><p className="text-[24px] text-[var(--allyra-neutral-900)] leading-none" style={{ fontWeight: 700 }}>28%</p><p className="text-[11px] text-[var(--allyra-neutral-500)] mt-0.5">Youth-Led</p></div>
              </div>
              <p className="text-[12px] text-[var(--allyra-neutral-600)]">56 SMEs led by under-35s</p>
            </div>
            <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#faf5ff] flex items-center justify-center"><MapPin className="w-5 h-5 text-[#a855f7]" strokeWidth={2} /></div>
                <div><p className="text-[24px] text-[var(--allyra-neutral-900)] leading-none" style={{ fontWeight: 700 }}>35%</p><p className="text-[11px] text-[var(--allyra-neutral-500)] mt-0.5">Rural/Underserved</p></div>
              </div>
              <p className="text-[12px] text-[var(--allyra-neutral-600)]">70 SMEs in target regions</p>
            </div>
            <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#f0fdf4] flex items-center justify-center"><Target className="w-5 h-5 text-[#22c55e]" strokeWidth={2} /></div>
                <div><p className="text-[24px] text-[var(--allyra-neutral-900)] leading-none" style={{ fontWeight: 700 }}>3.4K</p><p className="text-[11px] text-[var(--allyra-neutral-500)] mt-0.5">Jobs Created</p></div>
              </div>
              <p className="text-[12px] text-[var(--allyra-neutral-600)]">Direct employment impact</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
