import { useState, useRef, useEffect } from "react";
import { ChevronDown, User, LogOut, HelpCircle, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useChatContext } from "./chat-context";

function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export function ProductHeader() {
  const { userProfile, resetTourState } = useChatContext();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Fallback to default values if no user profile (shouldn't happen due to routing)
  const displayName = userProfile 
    ? `${userProfile.firstName} ${userProfile.lastName}`
    : "Thandi Molefe";
  const businessName = userProfile?.businessName || "Lowveld Harvest Foods";
  const email = userProfile?.email || "thandi@lowveldharvest.co.za";
  const initials = userProfile 
    ? getInitials(userProfile.firstName, userProfile.lastName)
    : "TM";

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    if (userMenuOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [userMenuOpen]);

  return (
    <header className="h-14 border-b border-[var(--allyra-neutral-200)] bg-white flex items-center justify-between px-6">
      {/* Logo and Brand */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => {
            resetTourState();
            navigate("/");
          }}
          className="flex items-center gap-1.5 text-[12px] text-[var(--allyra-neutral-500)] hover:text-[var(--allyra-neutral-700)] transition-colors mr-2 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} />
          <span className="hidden sm:inline">Demo</span>
        </button>
        <div className="w-px h-5 bg-[var(--allyra-neutral-200)] mr-1" />
        <div className="w-7 h-7 rounded-lg border border-[var(--allyra-neutral-300)] bg-white flex items-center justify-center">
          <span className="text-[var(--allyra-green)] font-semibold text-sm">A</span>
        </div>
        <span className="text-lg font-semibold tracking-tight text-[var(--allyra-neutral-900)]">
          Allyra
        </span>
        <span className="text-[11px] text-[var(--allyra-neutral-400)] tracking-wide italic ml-0.5 hidden sm:inline">
          Always on, Always Growing
        </span>
      </div>

      {/* User Account */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className="flex items-center gap-2.5 hover:bg-[var(--allyra-neutral-50)] rounded-lg px-3 py-1.5 transition-colors cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-[var(--allyra-green-light)] border border-[var(--allyra-green-muted)] flex items-center justify-center overflow-hidden">
            <span className="text-sm font-medium text-[var(--allyra-green)]">{initials}</span>
          </div>
          <div className="hidden sm:flex flex-col items-start">
            <span className="text-sm font-medium text-[var(--allyra-neutral-900)] leading-tight">{displayName}</span>
            <span className="text-[10px] text-[var(--allyra-neutral-400)] leading-tight">{businessName}</span>
          </div>
          <ChevronDown className="w-4 h-4 text-[var(--allyra-neutral-600)]" strokeWidth={2} />
        </button>

        {userMenuOpen && (
          <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-xl shadow-lg border border-[var(--allyra-neutral-200)] py-1 z-50">
            <div className="px-4 py-3 border-b border-[var(--allyra-neutral-100)]">
              <p className="text-[13px] text-[var(--allyra-neutral-900)]" style={{ fontWeight: 600 }}>{displayName}</p>
              <p className="text-[12px] text-[var(--allyra-neutral-500)]">{email}</p>
            </div>
            <div className="py-1">
              <Link
                to="/settings"
                onClick={() => setUserMenuOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-[13px] text-[var(--allyra-neutral-700)] hover:bg-[var(--allyra-neutral-50)] transition-colors"
              >
                <User className="w-4 h-4" strokeWidth={1.5} />
                Account Settings
              </Link>
              <button className="w-full flex items-center gap-2.5 px-4 py-2 text-[13px] text-[var(--allyra-neutral-700)] hover:bg-[var(--allyra-neutral-50)] transition-colors cursor-pointer">
                <HelpCircle className="w-4 h-4" strokeWidth={1.5} />
                Help & Support
              </button>
            </div>
            <div className="border-t border-[var(--allyra-neutral-100)] py-1">
              <button className="w-full flex items-center gap-2.5 px-4 py-2 text-[13px] text-[var(--allyra-neutral-500)] hover:bg-[var(--allyra-neutral-50)] transition-colors cursor-pointer">
                <LogOut className="w-4 h-4" strokeWidth={1.5} />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}