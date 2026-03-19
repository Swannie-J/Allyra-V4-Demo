import {
  GraduationCap,
  FileText,
  PlayCircle,
  Download,
  ExternalLink,
  Clock,
  BookOpen,
  BarChart3,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import { useChatContext } from "../components/chat-context";

interface TrainingResource {
  id: string;
  title: string;
  description: string;
  type: "worksheet" | "guide" | "video" | "template";
  duration?: string;
  category: string;
  categoryColor: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

const TRAINING_RESOURCES: TrainingResource[] = [
  {
    id: "t1",
    title: "Fast-Moving Stock Tracker",
    description:
      "Track your top 20 fast-moving items daily to prevent stock-outs. Includes simple reorder level templates and weekly stock planning worksheets.",
    type: "worksheet",
    duration: "20 min",
    category: "Stock Control",
    categoryColor: "#2d6a4f",
    icon: BarChart3,
  },
  {
    id: "t2",
    title: "Daily Cash Control Sheet",
    description:
      "Simple daily cash-up template to track opening float, sales, expenses, and closing balance. Includes weekly summary format for basic record-keeping.",
    type: "template",
    duration: "15 min",
    category: "Cash Management",
    categoryColor: "#0891b2",
    icon: BarChart3,
  },
  {
    id: "t3",
    title: "Basic Food Costing Template",
    description:
      "Calculate ingredient costs, portion sizes, and pricing for your prepared food offerings. Helps identify which items give the best margins.",
    type: "worksheet",
    duration: "25 min",
    category: "Food Operations",
    categoryColor: "#d97706",
    icon: ShoppingBag,
  },
  {
    id: "t4",
    title: "Weekly Stock Planning Guide",
    description:
      "A practical guide to planning your weekly stock purchases based on sales patterns, preventing both stock-outs and over-buying.",
    type: "guide",
    duration: "20 min read",
    category: "Stock Control",
    categoryColor: "#2d6a4f",
    icon: BookOpen,
  },
  {
    id: "t5",
    title: "Small Equipment Planning Guide",
    description:
      "How to assess whether fridge, freezer, or food prep equipment would genuinely help your business, and how to cost and finance it properly.",
    type: "guide",
    duration: "25 min read",
    category: "Equipment & Infrastructure",
    categoryColor: "#7c3aed",
    icon: BookOpen,
  },
  {
    id: "t6",
    title: "Building a Simple Business Record System",
    description:
      "Step-by-step video showing how to set up basic daily and weekly business records that could support future finance applications.",
    type: "video",
    duration: "18 min",
    category: "Record-Keeping",
    categoryColor: "#0891b2",
    icon: PlayCircle,
  },
  {
    id: "t7",
    title: "Managing Customer Credit Without Losing Profit",
    description:
      "Practical guidance on setting credit limits, tracking outstanding amounts, and communicating policies clearly to customers and family.",
    type: "guide",
    duration: "15 min read",
    category: "Cash Management",
    categoryColor: "#0891b2",
    icon: BookOpen,
  },
  {
    id: "t8",
    title: "Training Support Staff: Daily Checklists",
    description:
      "Ready-made opening, cash-up, and closing checklists you can use to train helpers and reduce your own operational dependency.",
    type: "template",
    duration: "10 min",
    category: "Operations & Delegation",
    categoryColor: "#2563eb",
    icon: FileText,
  },
  {
    id: "t9",
    title: "Understanding Township Retail Margins",
    description:
      "Video explaining typical margins on staples vs. prepared foods, and how to identify where your profit is really coming from.",
    type: "video",
    duration: "22 min",
    category: "Financial Planning",
    categoryColor: "#0891b2",
    icon: PlayCircle,
  },
  {
    id: "t10",
    title: "Growing Your Food Business Safely",
    description:
      "Guide to expanding prepared food sales in a controlled way: hygiene basics, portion control, menu simplification, and fridge capacity planning.",
    type: "guide",
    duration: "30 min read",
    category: "Food Operations",
    categoryColor: "#d97706",
    icon: BookOpen,
  },
  {
    id: "t11",
    title: "WhatsApp Ordering: Making It Work",
    description:
      "Practical tips for managing WhatsApp orders efficiently, setting delivery terms, and avoiding stock confusion.",
    type: "guide",
    duration: "12 min read",
    category: "Sales & Customer Service",
    categoryColor: "#2563eb",
    icon: BookOpen,
  },
  {
    id: "t12",
    title: "Business Formalization Basics for Township Retailers",
    description:
      "What formalization actually means, why it matters, and the simple first steps (CIPC registration, basic bookkeeping, hygiene compliance).",
    type: "guide",
    duration: "25 min read",
    category: "Business Development",
    categoryColor: "#7c3aed",
    icon: TrendingUp,
  },
];

const TYPE_LABELS: Record<string, { label: string; bg: string; text: string }> = {
  worksheet: { label: "Worksheet", bg: "#ecfeff", text: "#0891b2" },
  guide: { label: "Guide", bg: "#f0faf4", text: "var(--allyra-green)" },
  video: { label: "Video", bg: "#faf5ff", text: "#9333ea" },
  template: { label: "Template", bg: "#eff6ff", text: "#2563eb" },
};

function ResourceCard({ resource }: { resource: TrainingResource }) {
  const Icon = resource.icon;
  const typeStyle = TYPE_LABELS[resource.type];

  return (
    <div className="bg-white rounded-xl border border-[var(--allyra-neutral-200)] hover:border-[var(--allyra-neutral-300)] transition-all duration-200 overflow-hidden group">
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] tracking-[0.06em] uppercase px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: typeStyle.bg,
                color: typeStyle.text,
                fontWeight: 600,
              }}
            >
              {typeStyle.label}
            </span>
            <span
              className="text-[10px] tracking-[0.06em] uppercase"
              style={{ color: resource.categoryColor, fontWeight: 600 }}
            >
              {resource.category}
            </span>
          </div>
          {resource.duration && (
            <div className="flex items-center gap-1 text-[11px] text-[var(--allyra-neutral-400)]">
              <Clock className="w-3 h-3" strokeWidth={2} />
              {resource.duration}
            </div>
          )}
        </div>

        <div className="flex items-start gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{
              backgroundColor: typeStyle.bg,
              border: `1px solid ${typeStyle.text}20`,
            }}
          >
            <Icon
              className="w-4 h-4"
              strokeWidth={1.5}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className="text-[14px] text-[var(--allyra-neutral-900)] mb-1"
              style={{ fontWeight: 600 }}
            >
              {resource.title}
            </h3>
            <p className="text-[13px] text-[var(--allyra-neutral-500)] leading-relaxed">
              {resource.description}
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 py-3 bg-[var(--allyra-neutral-50)] border-t border-[var(--allyra-neutral-100)] flex items-center gap-3">
        {resource.type === "video" ? (
          <button className="flex items-center gap-1.5 text-[12px] text-[var(--allyra-green)] hover:underline cursor-pointer" style={{ fontWeight: 500 }}>
            <PlayCircle className="w-3.5 h-3.5" strokeWidth={2} />
            Watch now
          </button>
        ) : (
          <>
            <button className="flex items-center gap-1.5 text-[12px] text-[var(--allyra-green)] hover:underline cursor-pointer" style={{ fontWeight: 500 }}>
              <ExternalLink className="w-3.5 h-3.5" strokeWidth={2} />
              Open
            </button>
            <button className="flex items-center gap-1.5 text-[12px] text-[var(--allyra-neutral-500)] hover:text-[var(--allyra-neutral-700)] cursor-pointer" style={{ fontWeight: 500 }}>
              <Download className="w-3.5 h-3.5" strokeWidth={2} />
              Download
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export function Training() {
  const { navBadges, growthPlanStep } = useChatContext();
  const hasContent = growthPlanStep >= 6;

  return (
    <div className="h-full bg-white px-12 py-10 overflow-y-auto">
      <div className="max-w-5xl">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl tracking-tight text-[var(--allyra-neutral-900)]">
            Training & Resources
          </h1>
          {navBadges["training"] && (
            <span
              className="text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-full bg-[var(--allyra-green-light)] text-[var(--allyra-green)] border border-[var(--allyra-green-muted)]"
              style={{ fontWeight: 600 }}
            >
              New
            </span>
          )}
        </div>
        <p className="text-[var(--allyra-neutral-600)] text-base mb-8">
          Curated learning materials and practical tools tailored to your growth plan.
        </p>

        {hasContent ? (
          <>
            {/* Summary strip */}
            <div className="flex items-center gap-6 mb-6 px-5 py-3 bg-[var(--allyra-neutral-50)] rounded-xl border border-[var(--allyra-neutral-200)]">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[var(--allyra-green)]" strokeWidth={2} />
                <span className="text-[13px] text-[var(--allyra-neutral-700)]" style={{ fontWeight: 500 }}>
                  {TRAINING_RESOURCES.length} resources available
                </span>
              </div>
              <span className="text-[12px] text-[var(--allyra-neutral-400)]">
                Based on your Growth Plan initiatives
              </span>
            </div>

            {/* Resource grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {TRAINING_RESOURCES.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </>
        ) : (
          <div className="h-64 border border-dashed border-[var(--allyra-neutral-300)] rounded-xl flex flex-col items-center justify-center gap-3">
            <GraduationCap className="w-8 h-8 text-[var(--allyra-neutral-300)]" strokeWidth={1.5} />
            <p className="text-[var(--allyra-neutral-500)] text-center max-w-sm">
              Training and resources will be tailored for you as Allyra identifies areas to help you grow.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}