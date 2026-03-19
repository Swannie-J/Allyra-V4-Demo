import { ArrowLeft, Settings, Bell, Shield, User, Landmark } from "lucide-react";
import { useNavigate } from "react-router";

export function DfiSettings() {
  const navigate = useNavigate();
  return (
    <div className="flex-1 flex flex-col min-w-0">
      <header className="bg-white border-b border-[var(--allyra-neutral-200)] px-5 py-3 flex items-center gap-4">
        <button onClick={() => navigate("/dfi-dashboard")} className="lg:hidden mr-1 text-[var(--allyra-neutral-500)]"><ArrowLeft className="w-4 h-4" /></button>
        <div className="flex-1 min-w-0">
          <h1 className="text-[18px] text-[var(--allyra-neutral-900)] truncate" style={{ fontWeight: 600 }}>Settings</h1>
          <p className="text-[12px] text-[var(--allyra-neutral-500)]">Account preferences and configuration</p>
        </div>
        <div className="hidden md:flex items-center gap-2 pl-3 border-l border-[var(--allyra-neutral-200)]">
          <div className="w-7 h-7 rounded-full bg-[#eff6ff] flex items-center justify-center"><Landmark className="w-3.5 h-3.5 text-[#1d4ed8]" strokeWidth={2} /></div>
          <div><p className="text-[12px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 600 }}>Pan-African DFI</p></div>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto space-y-3">
          {[
            { title: "Profile Settings", desc: "Manage your account information", icon: User, color: "#2d6a4f" },
            { title: "Notifications", desc: "Configure alert preferences", icon: Bell, color: "#d97706" },
            { title: "Security", desc: "Password and authentication", icon: Shield, color: "#dc2626" },
            { title: "Preferences", desc: "Dashboard and display settings", icon: Settings, color: "#1d4ed8" },
          ].map((setting, i) => (
            <div key={i} className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5 hover:shadow-md hover:border-[#2d6a4f] transition-all cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${setting.color}15` }}>
                  <setting.icon className="w-5 h-5" style={{ color: setting.color }} strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <h3 className="text-[14px] text-[var(--allyra-neutral-900)] mb-0.5" style={{ fontWeight: 600 }}>{setting.title}</h3>
                  <p className="text-[12px] text-[var(--allyra-neutral-500)]">{setting.desc}</p>
                </div>
                <div className="text-[var(--allyra-neutral-300)] group-hover:text-[var(--allyra-neutral-500)] transition-colors">
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
