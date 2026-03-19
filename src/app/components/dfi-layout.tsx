import { Outlet, useNavigate, useLocation } from "react-router";
import {
  LayoutDashboard, FolderOpen, Shield, Wrench, DollarSign,
  Target, FileText, Settings, ArrowLeft,
} from "lucide-react";
import logo from "../../assets/365cd6f2dd45be695d6550c45d6280e22785450e.png";

const SIDEBAR_NAV = [
  { label: "Portfolio Dashboard", icon: LayoutDashboard, path: "/dfi-dashboard" },
  { label: "SME Portfolio", icon: FolderOpen, path: "/dfi-dashboard/sme-portfolio" },
  { label: "Readiness & Risk", icon: Shield, path: "/dfi-dashboard/readiness-risk" },
  { label: "Technical Assistance", icon: Wrench, path: "/dfi-dashboard/technical-assistance" },
  { label: "Funding Pathways", icon: DollarSign, path: "/dfi-dashboard/funding-pathways" },
  { label: "Impact & Inclusion", icon: Target, path: "/dfi-dashboard/impact-inclusion" },
  { label: "Reports", icon: FileText, path: "/dfi-dashboard/reports" },
  { label: "Settings", icon: Settings, path: "/dfi-dashboard/settings" },
];

export function DfiLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="h-screen w-full flex bg-[var(--allyra-neutral-50)]">
      {/* Left Sidebar */}
      <aside className="hidden lg:flex flex-col w-[220px] bg-white border-r border-[var(--allyra-neutral-200)] shrink-0">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-[var(--allyra-neutral-100)]">
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="Allyra" className="h-7 w-auto" />
            <span className="text-[15px] text-[var(--allyra-neutral-900)]" style={{ fontWeight: 600 }}>
              Allyra
            </span>
          </div>
          <p className="text-[10px] tracking-[0.06em] uppercase text-[var(--allyra-neutral-400)] mt-1" style={{ fontWeight: 600 }}>
            DFI Partner View
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-3 space-y-0.5 overflow-y-auto">
          {SIDEBAR_NAV.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-colors ${
                  isActive
                    ? "bg-[#f0faf4] text-[#2d6a4f]"
                    : "text-[var(--allyra-neutral-600)] hover:bg-[var(--allyra-neutral-100)]"
                }`}
                style={{ fontWeight: isActive ? 600 : 400 }}
              >
                <Icon className="w-4 h-4 shrink-0" strokeWidth={isActive ? 2.2 : 1.6} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Back */}
        <div className="px-3 py-3 border-t border-[var(--allyra-neutral-100)]">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] text-[var(--allyra-neutral-500)] hover:bg-[var(--allyra-neutral-100)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} />
            Back to Scenarios
          </button>
        </div>
      </aside>

      {/* Main Content Area - rendered by child routes */}
      <Outlet />
    </div>
  );
}
