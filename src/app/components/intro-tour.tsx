import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, SkipForward } from "lucide-react";

interface TourStep {
  id: number;
  targetId: string;
  title: string;
  description: string;
  position: "top" | "right" | "bottom" | "left";
}

const tourSteps: TourStep[] = [
  {
    id: 1,
    targetId: "journey-tracker",
    title: "Growth Journey",
    description:
      "This is our growth journey.\n\nWe'll move through these stages together as we understand your business, review your data, identify insights, and build your growth plan.\n\nYou'll always see where we are and what comes next.",
    position: "bottom",
  },
  {
    id: 2,
    targetId: "business-insights-nav",
    title: "Business Insights",
    description:
      "This is where I organise insights about your business.\n\nYou'll see what's working, what's not, and where the biggest opportunities for growth are.",
    position: "right",
  },
  {
    id: 3,
    targetId: "market-intelligence-nav",
    title: "Market Intelligence",
    description:
      "Here you'll find industry signals, competitor insights, and market trends relevant to your business.",
    position: "right",
  },
  {
    id: 4,
    targetId: "training-nav",
    title: "Training & Resources",
    description:
      "I'll recommend practical tools, frameworks, and short learning resources here to help strengthen important parts of your business.",
    position: "right",
  },
  {
    id: 5,
    targetId: "funding-nav",
    title: "Funding Opportunities",
    description:
      "This is where I'll surface funding and financing opportunities that may support your growth.",
    position: "right",
  },
  {
    id: 6,
    targetId: "document-vault-nav",
    title: "Document Vault",
    description:
      "Upload financial statements, contracts, or other documents here so I can analyse them and generate deeper insights.",
    position: "right",
  },
  {
    id: 7,
    targetId: "chat-workspace",
    title: "Our Workspace",
    description:
      "This is where we work together.\n\nAsk questions, share information, upload documents, and build your growth plan with me.",
    position: "top",
  },
];

interface IntroTourProps {
  onComplete: () => void;
}

export function IntroTour({ onComplete }: IntroTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
  const [cutoutRect, setCutoutRect] = useState({ x: 0, y: 0, w: 0, h: 0, r: 12 });
  const previousElementRef = useRef<HTMLElement | null>(null);

  const applyPopEffect = useCallback((element: HTMLElement) => {
    element.dataset.origPosition = element.style.position;
    element.dataset.origZIndex = element.style.zIndex;
    element.dataset.origBoxShadow = element.style.boxShadow;
    element.dataset.origTransition = element.style.transition;

    const computed = window.getComputedStyle(element);
    if (computed.position === "static") {
      element.style.position = "relative";
    }
    element.style.zIndex = "60";
    element.style.boxShadow = "0 0 0 4px rgba(45, 106, 79, 0.3), 0 8px 32px rgba(0, 0, 0, 0.12)";
    element.style.transition = "box-shadow 0.4s ease, transform 0.4s ease";
  }, []);

  const removePopEffect = useCallback((element: HTMLElement) => {
    element.style.position = element.dataset.origPosition || "";
    element.style.zIndex = element.dataset.origZIndex || "";
    element.style.boxShadow = element.dataset.origBoxShadow || "";
    element.style.transition = element.dataset.origTransition || "";
    delete element.dataset.origPosition;
    delete element.dataset.origZIndex;
    delete element.dataset.origBoxShadow;
    delete element.dataset.origTransition;
  }, []);

  useEffect(() => {
    const step = tourSteps[currentStep];
    const element = document.getElementById(step.targetId);

    if (previousElementRef.current && previousElementRef.current !== element) {
      removePopEffect(previousElementRef.current);
    }

    if (!element) return;

    previousElementRef.current = element;
    applyPopEffect(element);

    element.scrollIntoView({ behavior: "smooth", block: "nearest" });

    const timer = setTimeout(() => {
      const rect = element.getBoundingClientRect();
      const padding = 6;

      const isJourneyTracker = step.targetId === "journey-tracker";
      setCutoutRect({
        x: rect.left - padding,
        y: rect.top - padding,
        w: rect.width + padding * 2,
        h: rect.height + padding * 2,
        r: isJourneyTracker ? 4 : 12,
      });

      const tooltipWidth = 360;
      const tooltipGap = 20;
      let style: React.CSSProperties = {};

      switch (step.position) {
        case "bottom":
          style = {
            top: rect.bottom + tooltipGap,
            left: rect.left + rect.width / 2,
            transform: "translateX(-50%)",
          };
          break;
        case "right":
          style = {
            top: rect.top + rect.height / 2,
            left: rect.right + tooltipGap,
            transform: "translateY(-50%)",
          };
          break;
        case "top":
          style = {
            bottom: window.innerHeight - rect.top + tooltipGap,
            left: rect.left + rect.width / 2,
            transform: "translateX(-50%)",
          };
          break;
        case "left":
          style = {
            top: rect.top + rect.height / 2,
            right: window.innerWidth - rect.left + tooltipGap,
            transform: "translateY(-50%)",
          };
          break;
      }

      setTooltipStyle({ ...style, width: tooltipWidth });
    }, 100);

    return () => clearTimeout(timer);
  }, [currentStep, applyPopEffect, removePopEffect]);

  useEffect(() => {
    return () => {
      if (previousElementRef.current) {
        removePopEffect(previousElementRef.current);
      }
    };
  }, [removePopEffect]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      if (previousElementRef.current) {
        removePopEffect(previousElementRef.current);
      }
      onComplete();
    }
  };

  const handleSkip = () => {
    if (previousElementRef.current) {
      removePopEffect(previousElementRef.current);
    }
    onComplete();
  };

  const step = tourSteps[currentStep];

  return (
    <div className="fixed inset-0 z-50">
      {/* SVG overlay with cutout */}
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: "none" }}
      >
        <defs>
          <mask id="spotlight-mask">
            <rect width="100%" height="100%" fill="white" />
            <motion.rect
              animate={{
                x: cutoutRect.x,
                y: cutoutRect.y,
                width: cutoutRect.w,
                height: cutoutRect.h,
              }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              rx={cutoutRect.r}
              ry={cutoutRect.r}
              fill="black"
            />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="rgba(0, 0, 0, 0.45)"
          mask="url(#spotlight-mask)"
          style={{ pointerEvents: "auto" }}
          onClick={handleNext}
        />
      </motion.svg>

      {/* Tooltip card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="fixed z-[70]"
          style={tooltipStyle}
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-[var(--allyra-neutral-200)] overflow-hidden">
            {/* Header bar */}
            <div className="flex items-center justify-between px-5 pt-4 pb-0">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[var(--allyra-green)] flex items-center justify-center">
                  <span className="text-white text-[10px] font-semibold">A</span>
                </div>
                <span className="text-xs text-[var(--allyra-neutral-500)]">
                  {currentStep + 1} of {tourSteps.length}
                </span>
              </div>
              <button
                onClick={handleSkip}
                className="p-1 text-[var(--allyra-neutral-400)] hover:text-[var(--allyra-neutral-700)] transition-colors rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="px-5 pt-3 pb-5">
              <h3 className="text-[var(--allyra-neutral-900)] mb-1.5" style={{ fontSize: "15px" }}>
                {step.title}
              </h3>
              <p className="text-sm text-[var(--allyra-neutral-600)] leading-relaxed whitespace-pre-line">
                {step.description}
              </p>

              {/* Actions */}
              <div className="flex items-center justify-between mt-5 pt-3.5 border-t border-[var(--allyra-neutral-100)]">
                {/* Progress dots */}
                <div className="flex gap-1.5">
                  {tourSteps.map((_, index) => (
                    <motion.div
                      key={index}
                      animate={{
                        width: index === currentStep ? 20 : 6,
                        backgroundColor:
                          index === currentStep
                            ? "var(--allyra-green)"
                            : index < currentStep
                            ? "var(--allyra-green)"
                            : "var(--allyra-neutral-300)",
                      }}
                      transition={{ duration: 0.3 }}
                      className="h-1.5 rounded-full"
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {currentStep > 0 && (
                    <button
                      onClick={handleSkip}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs text-[var(--allyra-neutral-500)] hover:text-[var(--allyra-neutral-800)] transition-colors"
                    >
                      <SkipForward className="w-3 h-3" />
                      Skip
                    </button>
                  )}
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[var(--allyra-green)] text-white text-sm rounded-lg hover:bg-[var(--allyra-green-medium)] transition-colors"
                  >
                    {currentStep === tourSteps.length - 1 ? "Let's begin" : "Next"}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
