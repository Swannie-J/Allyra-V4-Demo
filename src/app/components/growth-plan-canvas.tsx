import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Target,
  Plus,
  Check,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Zap,
  DollarSign,
  ShoppingBag,
  Sparkles,
  LinkIcon,
} from "lucide-react";
import {
  useChatContext,
  type GrowthPlanInitiative,
  type GrowthPlanAction,
} from "./chat-context";
import { getScenarioContent } from "../data/scenario-content";

const STATUS_COLORS: Record<
  GrowthPlanAction["status"],
  { bg: string; text: string; border: string }
> = {
  "Not started": {
    bg: "#f5f5f5",
    text: "var(--allyra-neutral-600)",
    border: "var(--allyra-neutral-300)",
  },
  "In progress": {
    bg: "#fffbeb",
    text: "#d97706",
    border: "#fde68a",
  },
  Done: {
    bg: "#f0faf4",
    text: "var(--allyra-green)",
    border: "#c6e9d4",
  },
  Planned: {
    bg: "#eff6ff",
    text: "#2563eb",
    border: "#bfdbfe",
  },
};

const INITIATIVE_ICONS = [Zap, DollarSign, ShoppingBag, Sparkles];
const INITIATIVE_COLORS = [
  { accent: "var(--allyra-green)", bg: "#f0faf4", border: "#c6e9d4" },
  { accent: "#0891b2", bg: "#ecfeff", border: "#a5f3fc" },
  { accent: "#2563eb", bg: "#eff6ff", border: "#bfdbfe" },
  { accent: "#9333ea", bg: "#faf5ff", border: "#e9d5ff" },
];

function StatusDropdown({
  status,
  onChange,
}: {
  status: GrowthPlanAction["status"];
  onChange: (status: GrowthPlanAction["status"]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const colors = STATUS_COLORS[status];
  const allStatuses: GrowthPlanAction["status"][] = [
    "Not started",
    "In progress",
    "Done",
    "Planned",
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] cursor-pointer transition-colors"
        style={{
          backgroundColor: colors.bg,
          color: colors.text,
          border: `1px solid ${colors.border}`,
          fontWeight: 500,
        }}
      >
        {status === "Done" && <Check className="w-3 h-3" strokeWidth={2.5} />}
        {status}
        <ChevronDown className="w-3 h-3 ml-0.5" strokeWidth={2} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-1 z-50 bg-white rounded-lg shadow-lg border border-[var(--allyra-neutral-200)] py-1 min-w-[120px]">
            {allStatuses.map((s) => {
              const sColors = STATUS_COLORS[s];
              return (
                <button
                  key={s}
                  onClick={() => {
                    onChange(s);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-[11px] hover:bg-[var(--allyra-neutral-50)] flex items-center gap-2 cursor-pointer"
                  style={{ color: sColors.text, fontWeight: 500 }}
                >
                  {s === status && (
                    <Check className="w-3 h-3" strokeWidth={2.5} />
                  )}
                  {s !== status && <span className="w-3" />}
                  {s}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function AddActionRow({
  initiativeId,
  onAdd,
}: {
  initiativeId: string;
  onAdd: (initiativeId: string, action: GrowthPlanAction) => void;
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (!task.trim()) return;
    const action: GrowthPlanAction = {
      id: `custom-${Date.now()}`,
      task: task.trim(),
      owner: "Owner",
      timeline: "TBD",
      status: "Not started",
    };
    onAdd(initiativeId, action);
    setTask("");
    setIsAdding(false);
  };

  if (!isAdding) {
    return (
      <button
        onClick={() => setIsAdding(true)}
        className="flex items-center gap-1.5 px-4 py-2 text-[12px] text-[var(--allyra-neutral-500)] hover:text-[var(--allyra-green)] transition-colors cursor-pointer"
        style={{ fontWeight: 500 }}
      >
        <Plus className="w-3.5 h-3.5" strokeWidth={2} />
        Add action
      </button>
    );
  }

  return (
    <div className="px-4 py-2 flex items-center gap-2">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAdd();
          if (e.key === "Escape") setIsAdding(false);
        }}
        placeholder="Describe the action..."
        className="flex-1 text-[12px] px-3 py-1.5 rounded-md border border-[var(--allyra-neutral-300)] focus:outline-none focus:border-[var(--allyra-green)] focus:ring-1 focus:ring-[var(--allyra-green)]"
        autoFocus
      />
      <button
        onClick={handleAdd}
        disabled={!task.trim()}
        className="px-3 py-1.5 text-[11px] rounded-md bg-[var(--allyra-green)] text-white disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
        style={{ fontWeight: 500 }}
      >
        Add
      </button>
      <button
        onClick={() => {
          setIsAdding(false);
          setTask("");
        }}
        className="px-2 py-1.5 text-[11px] text-[var(--allyra-neutral-500)] hover:text-[var(--allyra-neutral-700)] cursor-pointer"
      >
        Cancel
      </button>
    </div>
  );
}

function InitiativeCard({
  initiative,
  index,
  isNew,
  collapsible,
  defaultCollapsed,
  buildComplete,
}: {
  initiative: GrowthPlanInitiative;
  index: number;
  isNew: boolean;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  buildComplete?: boolean;
}) {
  const { updateActionStatus, addActionToInitiative } = useChatContext();
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed ?? false);
  const prevBuildComplete = useRef(buildComplete);

  // Auto-collapse collapsible initiatives when build transitions to complete
  useEffect(() => {
    if (collapsible && buildComplete && !prevBuildComplete.current) {
      setIsCollapsed(true);
    }
    prevBuildComplete.current = buildComplete;
  }, [buildComplete, collapsible]);

  const Icon = INITIATIVE_ICONS[index] || Zap;
  const colors = INITIATIVE_COLORS[index] || INITIATIVE_COLORS[0];

  const completedActions = initiative.actions.filter(
    (a) => a.status === "Done"
  ).length;

  // Collect all resource links from actions
  const resources = initiative.actions
    .filter((a) => a.support)
    .map((a) => a.support!);

  // Deduplicate resources by label
  const uniqueResources = resources.filter(
    (r, i, arr) => arr.findIndex((x) => x.label === r.label) === i
  );

  return (
    <motion.div
      initial={isNew ? { opacity: 0, y: 20, scale: 0.97 } : false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="rounded-xl overflow-hidden bg-white"
      style={{ border: `1px solid var(--allyra-neutral-200)` }}
    >
      {/* Initiative Header */}
      <div
        className={`px-5 py-4 flex items-center justify-between ${collapsible ? "cursor-pointer select-none" : ""}`}
        style={{
          backgroundColor: colors.bg,
          borderBottom: isCollapsed ? "none" : `1px solid ${colors.border}`,
        }}
        onClick={collapsible ? () => setIsCollapsed(!isCollapsed) : undefined}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              backgroundColor: "white",
              border: `1px solid ${colors.border}`,
            }}
          >
            <Icon
              className="w-4 h-4"
              style={{ color: colors.accent }}
              strokeWidth={2}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] tracking-[0.08em] uppercase"
                style={{ color: colors.accent, fontWeight: 600 }}
              >
                Growth Initiative {String(initiative.number).padStart(2, "0")}
              </span>
            </div>
            <h3
              className="text-[14px] text-[var(--allyra-neutral-900)] -mt-0.5"
              style={{ fontWeight: 600 }}
            >
              {initiative.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Progress */}
          <div className="flex items-center gap-2">
            <span
              className="text-[11px] text-[var(--allyra-neutral-500)]"
              style={{ fontWeight: 500 }}
            >
              {completedActions} of {initiative.actions.length} complete
            </span>
            <div className="w-16 h-1.5 rounded-full bg-[var(--allyra-neutral-200)] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width:
                    initiative.actions.length > 0
                      ? `${(completedActions / initiative.actions.length) * 100}%`
                      : "0%",
                }}
                transition={{ duration: 0.5 }}
                className="h-full rounded-full"
                style={{ backgroundColor: colors.accent }}
              />
            </div>
          </div>

          {/* Collapse toggle for collapsible initiatives */}
          {collapsible && (
            <motion.div
              animate={{ rotate: isCollapsed ? 0 : 180 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown
                className="w-4 h-4 text-[var(--allyra-neutral-400)]"
                strokeWidth={2}
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Collapsible Content */}
      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            initial={collapsible ? { height: 0, opacity: 0 } : false}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            {/* Description */}
            <div className="px-5 py-3 border-b border-[var(--allyra-neutral-100)]">
              <p className="text-[13px] text-[var(--allyra-neutral-600)] leading-relaxed">
                {initiative.description}
              </p>
            </div>

            {/* Action Table */}
            <div>
              {/* Action Rows — stacked layout for legibility */}
              <AnimatePresence>
                {initiative.actions.map((action, i) => {
                  const isDone = action.status === "Done";
                  const stepNum = `${initiative.number}.${i + 1}`;
                  return (
                    <motion.div
                      key={action.id}
                      initial={isNew ? { opacity: 0, x: -10 } : false}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: isNew ? i * 0.15 + 0.3 : 0,
                      }}
                      className="relative"
                      style={{
                        borderBottom:
                          i < initiative.actions.length - 1
                            ? "1px solid var(--allyra-neutral-100)"
                            : "none",
                      }}
                    >
                      {/* Left accent bar */}
                      <div
                        className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full"
                        style={{
                          backgroundColor: isDone
                            ? colors.accent
                            : "var(--allyra-neutral-200)",
                          opacity: isDone ? 1 : 0.6,
                        }}
                      />

                      <div className="pl-5 pr-5 py-3.5 ml-1">
                        {/* Task line with step number */}
                        <div className="flex items-start gap-2.5">
                          <span
                            className="shrink-0 mt-0.5 w-6 h-6 rounded-md flex items-center justify-center text-[11px]"
                            style={{
                              backgroundColor: isDone ? colors.bg : "var(--allyra-neutral-100)",
                              color: isDone ? colors.accent : "var(--allyra-neutral-500)",
                              border: `1px solid ${isDone ? colors.border : "var(--allyra-neutral-200)"}`,
                              fontWeight: 600,
                              fontVariantNumeric: "tabular-nums",
                            }}
                          >
                            {isDone ? (
                              <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                            ) : (
                              stepNum
                            )}
                          </span>
                          <p
                            className="flex-1 text-[13px] leading-relaxed"
                            style={{
                              color: isDone
                                ? "var(--allyra-neutral-500)"
                                : "var(--allyra-neutral-800)",
                              textDecoration: isDone ? "line-through" : "none",
                              textDecorationColor: "var(--allyra-neutral-300)",
                            }}
                          >
                            {action.task}
                          </p>
                        </div>

                        {/* Metadata row — secondary details inline */}
                        <div className="flex items-center gap-4 flex-wrap ml-8.5 mt-1.5">
                          <div className="flex items-center gap-1.5">
                            <span
                              className="text-[10px] tracking-[0.05em] uppercase text-[var(--allyra-neutral-400)]"
                              style={{ fontWeight: 600 }}
                            >
                              Who
                            </span>
                            <span
                              className="text-[12px] text-[var(--allyra-neutral-600)]"
                              style={{ fontWeight: 500 }}
                            >
                              {action.owner}
                            </span>
                          </div>
                          <span className="text-[var(--allyra-neutral-300)]">·</span>
                          <div className="flex items-center gap-1.5">
                            <span
                              className="text-[10px] tracking-[0.05em] uppercase text-[var(--allyra-neutral-400)]"
                              style={{ fontWeight: 600 }}
                            >
                              By
                            </span>
                            <span className="text-[12px] text-[var(--allyra-neutral-600)]">
                              {action.timeline}
                            </span>
                          </div>
                          <span className="text-[var(--allyra-neutral-300)]">·</span>
                          <StatusDropdown
                            status={action.status}
                            onChange={(s) =>
                              updateActionStatus(initiative.id, action.id, s)
                            }
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Add Action */}
              <div className="border-t border-[var(--allyra-neutral-100)]">
                <AddActionRow
                  initiativeId={initiative.id}
                  onAdd={addActionToInitiative}
                />
              </div>
            </div>

            {/* Resources Section */}
            {uniqueResources.length > 0 && (
              <div className="px-5 py-3 bg-[var(--allyra-neutral-50)] border-t border-[var(--allyra-neutral-100)]">
                <div className="flex items-center gap-1.5 mb-2">
                  <LinkIcon
                    className="w-3 h-3 text-[var(--allyra-neutral-400)]"
                    strokeWidth={2}
                  />
                  <span
                    className="text-[10px] tracking-[0.06em] uppercase text-[var(--allyra-neutral-500)]"
                    style={{ fontWeight: 600 }}
                  >
                    Resources
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {uniqueResources.map((resource, i) => (
                    <a
                      key={i}
                      href={resource.link}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] text-[var(--allyra-green)] bg-white border border-[var(--allyra-neutral-200)] hover:border-[var(--allyra-green-muted)] hover:bg-[var(--allyra-green-light)] transition-colors"
                      style={{ fontWeight: 500 }}
                    >
                      <ExternalLink className="w-3 h-3" strokeWidth={2} />
                      {resource.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function GrowthPlanCanvas() {
  const { growthPlanStep, growthPlanInitiatives, selectedScenario } = useChatContext();
  const scenarioContent = getScenarioContent(selectedScenario);
  const { growthFocus } = scenarioContent;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const prevStepRef = useRef(growthPlanStep);

  // Auto-scroll to bottom when new content is added
  useEffect(() => {
    if (growthPlanStep > prevStepRef.current && scrollContainerRef.current) {
      setTimeout(() => {
        scrollContainerRef.current?.scrollTo({
          top: scrollContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 300);
    }
    prevStepRef.current = growthPlanStep;
  }, [growthPlanStep]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      ref={scrollContainerRef}
      className="h-full bg-[var(--allyra-neutral-50)] border-l border-[var(--allyra-neutral-200)] overflow-y-auto"
    >
      <div className="px-8 py-8">
        {/* Canvas Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-6"
        >
          <h2 className="text-[22px] tracking-tight text-[var(--allyra-neutral-900)] mb-1">
            Growth Plan
          </h2>
          <p className="text-[14px] text-[var(--allyra-neutral-500)]">
            Turning insights into practical actions for your business.
          </p>
        </motion.div>

        {/* Growth Focus Card — only visible once step >= 1 */}
        {growthPlanStep >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25 }}
            className="mb-7 rounded-xl bg-white border border-[var(--allyra-neutral-200)] overflow-hidden"
          >
            <div className="px-5 py-3.5 bg-[var(--allyra-green-light)] border-b border-[var(--allyra-green-muted)] flex items-center gap-2.5">
              <Target
                className="w-4 h-4 text-[var(--allyra-green)]"
                strokeWidth={2}
              />
              <span
                className="text-[11px] tracking-[0.08em] uppercase text-[var(--allyra-green)]"
                style={{ fontWeight: 600 }}
              >
                Growth Focus
              </span>
            </div>
            <div className="px-5 py-4 space-y-3">
              <p className="text-[14px] text-[var(--allyra-neutral-800)] leading-relaxed">
                {growthFocus.statement}
              </p>
              <div className="flex gap-6">
                <div>
                  <span
                    className="text-[10px] tracking-[0.06em] uppercase text-[var(--allyra-neutral-500)] block mb-0.5"
                    style={{ fontWeight: 600 }}
                  >
                    Primary constraint
                  </span>
                  <span className="text-[13px] text-[var(--allyra-neutral-700)]">
                    {growthFocus.primaryConstraint}
                  </span>
                </div>
                <div>
                  <span
                    className="text-[10px] tracking-[0.06em] uppercase text-[var(--allyra-neutral-500)] block mb-0.5"
                    style={{ fontWeight: 600 }}
                  >
                    Secondary opportunity
                  </span>
                  <span className="text-[13px] text-[var(--allyra-neutral-700)]">
                    {growthFocus.secondaryOpportunity}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Empty state when canvas is fresh (step 0) */}
        {growthPlanStep === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-[var(--allyra-green-light)] border border-[var(--allyra-green-muted)] flex items-center justify-center mb-4">
              <Target
                className="w-5 h-5 text-[var(--allyra-green)]"
                strokeWidth={1.5}
              />
            </div>
            <p className="text-[14px] text-[var(--allyra-neutral-500)] max-w-xs">
              Your growth plan will take shape here as we work through it
              together.
            </p>
          </motion.div>
        )}

        {/* Initiatives */}
        <div className="space-y-5">
          {growthPlanInitiatives.map((initiative, i) => (
            <InitiativeCard
              key={initiative.id}
              initiative={initiative}
              index={i}
              isNew={
                i === growthPlanInitiatives.length - 1 &&
                growthPlanStep === i + 2
              }
              collapsible={true}
              defaultCollapsed={i > 0 && growthPlanStep >= 6}
              buildComplete={growthPlanStep >= 6}
            />
          ))}
        </div>

        {/* Building indicator */}
        {growthPlanStep >= 1 &&
          growthPlanStep < 6 &&
          growthPlanInitiatives.length <
            Math.max(0, growthPlanStep - 1) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 flex items-center gap-2 px-4 py-3 rounded-lg bg-white border border-[var(--allyra-neutral-200)]"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--allyra-green)] animate-pulse" />
              <span className="text-[13px] text-[var(--allyra-neutral-500)]">
                Allyra is structuring the next initiative...
              </span>
            </motion.div>
          )}
      </div>
    </motion.div>
  );
}