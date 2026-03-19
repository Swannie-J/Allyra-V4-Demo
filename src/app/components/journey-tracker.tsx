import { Check, ChevronRight, ArrowRight } from "lucide-react";

interface JourneyStage {
  id: number;
  label: string;
}

const journeyStages: JourneyStage[] = [
  { id: 1, label: "Understand Your Business" },
  { id: 2, label: "Analyse Your Business" },
  { id: 3, label: "Growth Insights" },
  { id: 4, label: "Build Your Growth Plan" },
  { id: 5, label: "Grow Your Business" },
];

interface JourneyTrackerProps {
  currentStage?: number;
}

export function JourneyTracker({ currentStage = 1 }: JourneyTrackerProps) {
  // Determine collapse threshold — at stage 4, collapse 1-3; at stage 5, collapse 1-4
  const collapseThreshold = currentStage >= 5 ? 5 : currentStage >= 4 ? 4 : 0;
  const isCollapsed = collapseThreshold > 0;

  const collapsedCount = isCollapsed ? collapseThreshold - 1 : 0;
  const visibleStages = isCollapsed
    ? journeyStages.filter((s) => s.id >= collapseThreshold)
    : journeyStages;

  return (
    <div
      id="journey-tracker"
      className="w-full bg-white border-b border-[var(--allyra-neutral-200)] px-6 py-4"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-0">
          {/* Collapsed earlier steps indicator */}
          {isCollapsed && (
            <div className="flex items-center">
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[var(--allyra-green-light)] border border-[var(--allyra-green-muted)]">
                <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-[var(--allyra-green)] text-white">
                  <Check className="w-3 h-3" strokeWidth={2.5} />
                </div>
                <span
                  className="text-[12px] whitespace-nowrap text-[var(--allyra-neutral-600)]"
                  style={{ fontWeight: 500 }}
                >
                  Steps 1–{collapsedCount} complete
                </span>
              </div>
              <div className="flex items-center px-1.5">
                <ChevronRight
                  className="w-3.5 h-3.5 text-[var(--allyra-green-muted)]"
                  strokeWidth={2}
                />
              </div>
            </div>
          )}

          {visibleStages.map((stage, index) => {
            const isActive = stage.id === currentStage;
            const isCompleted = stage.id < currentStage;
            const isFuture = stage.id > currentStage;
            const isLast = index === visibleStages.length - 1;

            return (
              <div key={stage.id} className="flex items-center">
                {/* Stage Block */}
                <div
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 select-none
                    ${
                      isActive
                        ? "bg-[var(--allyra-green-light)] border border-[var(--allyra-green)] shadow-[0_0_0_1px_rgba(45,106,79,0.08)]"
                        : ""
                    }
                    ${
                      isCompleted
                        ? "bg-[var(--allyra-green-light)] border border-[var(--allyra-green-muted)]"
                        : ""
                    }
                    ${
                      isFuture
                        ? "bg-[var(--allyra-neutral-50)] border border-[var(--allyra-neutral-200)]"
                        : ""
                    }
                  `}
                >
                  {/* Number / Check indicator */}
                  <div
                    className={`
                      flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300
                      ${isCompleted ? "bg-[var(--allyra-green)] text-white" : ""}
                      ${isActive ? "bg-[var(--allyra-green)] text-white" : ""}
                      ${isFuture ? "bg-[var(--allyra-neutral-200)] text-[var(--allyra-neutral-400)]" : ""}
                    `}
                  >
                    {isCompleted ? (
                      <Check className="w-3 h-3" strokeWidth={2.5} />
                    ) : (
                      <span className="text-[10px]" style={{ fontWeight: 600 }}>
                        {stage.id}
                      </span>
                    )}
                  </div>

                  {/* Label */}
                  <span
                    className={`
                      text-[12px] whitespace-nowrap transition-colors duration-300
                      ${isActive ? "text-[var(--allyra-green)]" : ""}
                      ${isCompleted ? "text-[var(--allyra-neutral-700)]" : ""}
                      ${isFuture ? "text-[var(--allyra-neutral-400)]" : ""}
                    `}
                    style={{ fontWeight: isActive ? 600 : 500 }}
                  >
                    {stage.label}
                  </span>

                  {/* Arrow pointing to growth plan for active "Grow Your Business" stage */}
                  {isActive && stage.id === 5 && (
                    <ArrowRight
                      className="w-3.5 h-3.5 text-[var(--allyra-green)] ml-0.5 animate-pulse"
                      strokeWidth={2.5}
                    />
                  )}
                </div>

                {/* Connector arrow */}
                {!isLast && (
                  <div className="flex items-center px-1.5">
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-colors duration-300 ${
                        isCompleted
                          ? "text-[var(--allyra-green-muted)]"
                          : "text-[var(--allyra-neutral-300)]"
                      }`}
                      strokeWidth={2}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
