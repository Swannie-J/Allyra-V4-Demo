import { useNavigate } from "react-router";
import { ArrowLeft, User, Bell, Shield, Settings, Landmark } from "lucide-react";

const SETTINGS_ITEMS = [
  { label: "Profile Settings", description: "Manage account and institution information", icon: User, color: "#0f766e" },
  { label: "Notifications", description: "Configure alert and reporting preferences", icon: Bell, color: "#1d4ed8" },
  { label: "Security", description: "Password, authentication, and access controls", icon: Shield, color: "#dc2626" },
  { label: "Preferences", description: "Dashboard display and default settings", icon: Settings, color: "#7c3aed" },
];

export function FspSettings() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <header className="bg-white border-b border-[var(--allyra-neutral-200)] px-5 py-3 flex items-center gap-4">
        <button onClick={() => navigate("/fsp-dashboard")} className="lg:hidden w-8 h-8 rounded-lg hover:bg-[var(--allyra-neutral-100)] flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-[var(--allyra-neutral-600)]" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-[18px] text-[var(--allyra-neutral-900)] truncate" style={{ fontWeight: 600 }}>Settings</h1>
          <p className="text-[12px] text-[var(--allyra-neutral-500)]">Manage your dashboard configuration</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f0fdfa] border border-[#99f6e4]">
          <Landmark className="w-3.5 h-3.5" style={{ color: "#0f766e" }} strokeWidth={2} />
          <span className="text-[12px]" style={{ fontWeight: 600, color: "#0f766e" }}>Pan-African Bank</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-5">
        <div className="max-w-3xl mx-auto space-y-3">
          {SETTINGS_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white px-5 py-4 flex items-center gap-4 cursor-pointer hover:shadow-md hover:border-[#0f766e] transition-all"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.color}10` }}>
                  <Icon className="w-5 h-5" style={{ color: item.color }} strokeWidth={1.8} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[14px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 600 }}>{item.label}</h3>
                  <p className="text-[12px] text-[var(--allyra-neutral-500)]">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
