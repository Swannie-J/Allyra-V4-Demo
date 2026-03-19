import { ArrowLeft, Wrench, CheckCircle2, Clock, Landmark } from "lucide-react";
import { useNavigate } from "react-router";

export function TechnicalAssistance() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <header className="bg-white border-b border-[var(--allyra-neutral-200)] px-5 py-3 flex items-center gap-4">
        <button onClick={() => navigate("/dfi-dashboard")} className="lg:hidden mr-1 text-[var(--allyra-neutral-500)]">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-[18px] text-[var(--allyra-neutral-900)] truncate" style={{ fontWeight: 600 }}>Technical Assistance Programs</h1>
          <p className="text-[12px] text-[var(--allyra-neutral-500)]">Capability development and advisory support</p>
        </div>
        <div className="hidden md:flex items-center gap-2 pl-3 border-l border-[var(--allyra-neutral-200)]">
          <div className="w-7 h-7 rounded-full bg-[#eff6ff] flex items-center justify-center">
            <Landmark className="w-3.5 h-3.5 text-[#1d4ed8]" strokeWidth={2} />
          </div>
          <div><p className="text-[12px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 600 }}>Pan-African DFI</p></div>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#fffbeb] flex items-center justify-center"><Clock className="w-5 h-5 text-[#d97706]" strokeWidth={2} /></div>
                <div><p className="text-[24px] text-[var(--allyra-neutral-900)] leading-none" style={{ fontWeight: 700 }}>42</p><p className="text-[11px] text-[var(--allyra-neutral-500)] mt-0.5">Active Programs</p></div>
              </div>
              <p className="text-[12px] text-[var(--allyra-neutral-600)]">SMEs currently receiving TA support</p>
            </div>
            <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#f0faf4] flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-[#2d6a4f]" strokeWidth={2} /></div>
                <div><p className="text-[24px] text-[var(--allyra-neutral-900)] leading-none" style={{ fontWeight: 700 }}>127</p><p className="text-[11px] text-[var(--allyra-neutral-500)] mt-0.5">Completed</p></div>
              </div>
              <p className="text-[12px] text-[var(--allyra-neutral-600)]">Successful TA interventions YTD</p>
            </div>
            <div className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#eff6ff] flex items-center justify-center"><Wrench className="w-5 h-5 text-[#1d4ed8]" strokeWidth={2} /></div>
                <div><p className="text-[24px] text-[var(--allyra-neutral-900)] leading-none" style={{ fontWeight: 700 }}>8</p><p className="text-[11px] text-[var(--allyra-neutral-500)] mt-0.5">Program Types</p></div>
              </div>
              <p className="text-[12px] text-[var(--allyra-neutral-600)]">Financial, governance, operations, market access</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
