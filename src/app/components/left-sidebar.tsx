import { motion } from "motion/react";
import {
  LayoutDashboard,
  TrendingUp,
  Globe,
  GraduationCap,
  Banknote,
  FolderClosed,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import { useChatContext } from "./chat-context";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}

const menuItems: MenuItem[] = [
  { id: "control-room", label: "Control Room", icon: LayoutDashboard, path: "/control-room" },
  { id: "business-insights", label: "Business Insights", icon: TrendingUp, path: "/business-insights" },
  { id: "market-intelligence", label: "Market Intelligence", icon: Globe, path: "/market-intelligence" },
  { id: "training", label: "Training & Resources", icon: GraduationCap, path: "/training" },
  { id: "funding", label: "Funding Opportunities", icon: Banknote, path: "/funding" },
  { id: "documents", label: "Document Vault", icon: FolderClosed, path: "/documents" },
  { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
];

interface LeftSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function LeftSidebar({ isCollapsed, onToggle }: LeftSidebarProps) {
  const location = useLocation();
  const { navBadges, setNavBadge } = useChatContext();

  return (
    <motion.div
      id="left-sidebar"
      initial={false}
      animate={{ width: isCollapsed ? 64 : 240 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="relative h-full border-r border-[var(--allyra-neutral-200)] bg-[var(--allyra-neutral-50)] flex flex-col"
    >
      {/* Menu Items */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          const hasBadge = navBadges[item.id];

          return (
            <Link
              key={item.id}
              id={
                item.id === "business-insights" ? "business-insights-nav" 
                : item.id === "documents" ? "document-vault-nav" 
                : item.id === "market-intelligence" ? "market-intelligence-nav"
                : item.id === "training" ? "training-nav"
                : item.id === "funding" ? "funding-nav"
                : undefined
              }
              to={item.path}
              onClick={() => {
                if (hasBadge) setNavBadge(item.id, false);
              }}
              className={`
                group relative flex items-center gap-3 px-3 h-10 rounded-lg transition-all duration-200
                ${isActive 
                  ? "bg-white text-[var(--allyra-neutral-900)]" 
                  : "text-[var(--allyra-neutral-700)] hover:bg-white/50"
                }
              `}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="active-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-[var(--allyra-green)] rounded-r-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              <div className="relative flex-shrink-0">
                <Icon 
                  className={`w-5 h-5 ${isActive ? "text-[var(--allyra-green)]" : ""}`} 
                  strokeWidth={1.5} 
                />
                {/* Badge dot */}
                {hasBadge && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[var(--allyra-green)]"
                  />
                )}
              </div>
              
              <motion.span
                initial={false}
                animate={{
                  opacity: isCollapsed ? 0 : 1,
                  width: isCollapsed ? 0 : "auto",
                }}
                transition={{ duration: 0.2 }}
                className="text-sm font-medium whitespace-nowrap overflow-hidden"
              >
                {item.label}
              </motion.span>

              {/* New badge label */}
              {hasBadge && !isCollapsed && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto text-[9px] tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-[var(--allyra-green-light)] text-[var(--allyra-green)] border border-[var(--allyra-green-muted)]"
                  style={{ fontWeight: 600 }}
                >
                  New
                </motion.span>
              )}

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-3 py-1.5 bg-[var(--allyra-neutral-900)] text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                  {item.label}
                  <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-1.5 h-1.5 bg-[var(--allyra-neutral-900)] rotate-45" />
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 bg-white border border-[var(--allyra-neutral-200)] rounded-full flex items-center justify-center hover:bg-[var(--allyra-neutral-50)] transition-colors shadow-sm z-10"
      >
        {isCollapsed ? (
          <ChevronRight className="w-3.5 h-3.5 text-[var(--allyra-neutral-600)]" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5 text-[var(--allyra-neutral-600)]" />
        )}
      </button>
    </motion.div>
  );
}