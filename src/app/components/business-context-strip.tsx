import { Building2, Users, TrendingUp, BarChart3, Layers } from "lucide-react";
import type { BusinessProfile } from "./chat-context";

interface BusinessContextStripProps {
  isOnboarding?: boolean;
  profile?: BusinessProfile | null;
  showBusinessDetails?: boolean;
}

const CHIP_ICONS = [Building2, Layers, TrendingUp, Users, BarChart3];

export function BusinessContextStrip({ isOnboarding = true, profile, showBusinessDetails = false }: BusinessContextStripProps) {
  // Show "Learning about your business" if we don't have business details yet
  if (isOnboarding || !profile || !showBusinessDetails) {
    return (
      <div className="h-10 border-b border-[var(--allyra-neutral-200)] bg-[var(--allyra-neutral-50)] flex items-center px-6">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--allyra-green)] animate-pulse" />
          <span className="text-sm text-[var(--allyra-neutral-700)]">
            Learning about your business
          </span>
        </div>
      </div>
    );
  }

  const chips = [
    { icon: Building2, label: profile.name },
    { icon: Layers, label: profile.sector },
    { icon: TrendingUp, label: profile.stage },
    { icon: Users, label: profile.employees },
    { icon: BarChart3, label: profile.revenue },
  ];

  return (
    <div className="h-10 border-b border-[var(--allyra-neutral-200)] bg-[var(--allyra-neutral-50)] flex items-center px-6">
      <div className="flex items-center justify-between w-full">
        {chips.map((chip, i) => {
          const Icon = chip.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-2"
            >
              {i > 0 && (
                <div className="w-px h-3.5 bg-[var(--allyra-neutral-300)] -ml-0.5 mr-0.5" />
              )}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--allyra-green-light)] border border-[var(--allyra-green-muted)]">
                <Icon className="w-3 h-3 text-[var(--allyra-green)]" strokeWidth={2} />
                <span className="text-[11px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 500 }}>
                  {chip.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}