import { useState, useEffect, useRef } from "react";
import { Check, Loader2 } from "lucide-react";
import { useChatContext } from "./chat-context";
import { getScenarioContent } from "../data/scenario-content";

const STEP_DURATION = 3000;

interface AnalysisStatusProps {
  onComplete: () => void;
  isFinished?: boolean;
}

export function AnalysisStatus({ onComplete, isFinished }: AnalysisStatusProps) {
  const { selectedScenario } = useChatContext();
  const analysisSteps = getScenarioContent(selectedScenario).analysisSteps;

  const [completedCount, setCompletedCount] = useState(
    isFinished ? analysisSteps.length : 0
  );
  const [activeIndex, setActiveIndex] = useState(isFinished ? -1 : 0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (isFinished || startedRef.current) return;
    startedRef.current = true;

    let current = 0;

    const tick = () => {
      setActiveIndex(current);

      setTimeout(() => {
        const justCompleted = current;
        setCompletedCount(justCompleted + 1);
        current++;

        if (current >= analysisSteps.length) {
          setActiveIndex(-1);
          setTimeout(() => onComplete(), 800);
        } else {
          tick();
        }
      }, STEP_DURATION);
    };

    const startDelay = setTimeout(tick, 400);
    return () => clearTimeout(startDelay);
  }, [isFinished, onComplete, analysisSteps.length]);

  const allDone = completedCount === analysisSteps.length;

  return (
    <div className="bg-[var(--allyra-neutral-50)] border border-[var(--allyra-neutral-200)] rounded-xl px-5 py-4">
      <p
        className="text-xs text-[var(--allyra-neutral-500)] mb-4"
        style={{ fontWeight: 500 }}
      >
        {allDone ? "Analysis complete" : "Allyra is analysing your business..."}
      </p>
      <div className="space-y-3">
        {analysisSteps.map((step, index) => {
          const isCompleted = index < completedCount;
          const isActive = index === activeIndex && !isCompleted;
          return (
            <div key={step} className="flex items-center gap-3">
              {isCompleted ? (
                <div className="w-5 h-5 rounded-full bg-[var(--allyra-green)] flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
              ) : isActive ? (
                <Loader2
                  className="w-5 h-5 text-[var(--allyra-green)] animate-spin flex-shrink-0"
                  strokeWidth={2}
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-[var(--allyra-neutral-200)] flex-shrink-0" />
              )}
              <span
                className={`text-[14px] transition-colors duration-300 ${
                  isCompleted
                    ? "text-[var(--allyra-neutral-800)]"
                    : isActive
                    ? "text-[var(--allyra-neutral-800)]"
                    : "text-[var(--allyra-neutral-400)]"
                }`}
                style={{ fontWeight: isCompleted || isActive ? 500 : 400 }}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}