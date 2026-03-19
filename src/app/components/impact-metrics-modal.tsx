import { motion, AnimatePresence } from "motion/react";
import { X, Target, UserCheck, Users, MapPin, TrendingUp, Briefcase, ArrowUpRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface ImpactMetricsModalProps {
  isOpen: boolean;
  onClose: () => void;
  metric: {
    label: string;
    value: string;
    count: number | null;
    icon: any;
    color: string;
  } | null;
}

const WOMEN_LED_DATA = [
  { id: "w1", sector: "Agri-processing", count: 22 },
  { id: "w2", sector: "Retail", count: 18 },
  { id: "w3", sector: "Manufacturing", count: 15 },
  { id: "w4", sector: "Services", count: 16 },
  { id: "w5", sector: "Logistics", count: 8 },
  { id: "w6", sector: "Energy", count: 5 },
];

const YOUTH_LED_DATA = [
  { id: "y1", sector: "Services", count: 14 },
  { id: "y2", sector: "Retail", count: 12 },
  { id: "y3", sector: "Logistics", count: 10 },
  { id: "y4", sector: "Manufacturing", count: 9 },
  { id: "y5", sector: "Agri-processing", count: 7 },
  { id: "y6", sector: "Energy", count: 4 },
];

const REGION_DATA = [
  { id: "r1", region: "Eastern Cape", count: 18 },
  { id: "r2", region: "Limpopo", count: 16 },
  { id: "r3", region: "Rural Kenya", count: 14 },
  { id: "r4", region: "Northern Nigeria", count: 12 },
  { id: "r5", region: "Rural Tanzania", count: 10 },
];

export function ImpactMetricsModal({ isOpen, onClose, metric }: ImpactMetricsModalProps) {
  if (!isOpen || !metric) return null;

  const Icon = metric.icon;

  let chartData: any[] = [];
  let smeList: string[] = [];
  let subtitle = "";

  if (metric.label === "Women-Led SMEs") {
    chartData = WOMEN_LED_DATA;
    subtitle = "Distribution across sectors";
    smeList = [
      "Nairobi Fresh Foods · Kenya · Agri-processing",
      "Cape Harvest Foods · South Africa · Manufacturing",
      "Soweto Quick Serve · South Africa · Retail",
      "Lagos Textiles Ltd · Nigeria · Manufacturing",
      "Dar Coffee Exports · Tanzania · Agri-processing",
    ];
  } else if (metric.label === "Youth-Led SMEs") {
    chartData = YOUTH_LED_DATA;
    subtitle = "Distribution across sectors";
    smeList = [
      "Accra Solar Systems · Ghana · Energy",
      "Mombasa Marine Svcs · Kenya · Services",
      "Kigali Logistics Hub · Rwanda · Logistics",
      "Abuja Green Energy · Nigeria · Energy",
    ];
  } else if (metric.label === "Underserved Regions") {
    chartData = REGION_DATA;
    subtitle = "SMEs in underserved geographies";
    smeList = [
      "Tshwane Agri Co-op · Eastern Cape · Agri-processing",
      "Limpopo Harvest Co · Limpopo · Agri-processing",
      "Mombasa Marine Svcs · Rural Kenya · Services",
      "Dar Coffee Exports · Rural Tanzania · Agri-processing",
    ];
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-[var(--allyra-neutral-200)]" style={{ backgroundColor: `${metric.color}08` }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${metric.color}15` }}>
                  <Icon className="w-5 h-5" style={{ color: metric.color }} strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-[18px] text-[var(--allyra-neutral-900)]" style={{ fontWeight: 600 }}>
                    {metric.label}
                  </h2>
                  <p className="text-[12px] text-[var(--allyra-neutral-500)]">{subtitle}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg hover:bg-white/80 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-[var(--allyra-neutral-500)]" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(80vh-120px)]">
            {/* Metric Summary */}
            <div className="rounded-xl border p-5" style={{ borderColor: `${metric.color}30`, backgroundColor: `${metric.color}08` }}>
              <div className="flex items-end gap-3">
                <p className="text-[42px] leading-none" style={{ fontWeight: 700, color: metric.color }}>
                  {metric.value}
                </p>
                {metric.count && (
                  <p className="text-[16px] text-[var(--allyra-neutral-600)] mb-1.5">
                    ({metric.count} SMEs)
                  </p>
                )}
              </div>
              <p className="text-[13px] text-[var(--allyra-neutral-600)] mt-2">
                Part of our development mandate to support inclusive economic growth
              </p>
            </div>

            {/* Chart */}
            {chartData.length > 0 && (
              <div>
                <p className="text-[11px] tracking-[0.05em] uppercase text-[var(--allyra-neutral-400)] mb-3" style={{ fontWeight: 600 }}>
                  {metric.label === "Underserved Regions" ? "By Region" : "By Sector"}
                </p>
                <div className="h-56 rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical" margin={{ left: 10 }}>
                      <XAxis 
                        type="number" 
                        tick={{ fontSize: 11 }} 
                        axisLine={false} 
                        tickLine={false}
                        tickFormatter={(value) => String(value)}
                      />
                      <YAxis 
                        type="category" 
                        dataKey={metric.label === "Underserved Regions" ? "region" : "sector"}
                        tick={{ fontSize: 11 }} 
                        axisLine={false} 
                        tickLine={false} 
                        width={120}
                        tickFormatter={(value) => String(value)}
                      />
                      <Tooltip contentStyle={{ fontSize: "12px", borderRadius: "8px", border: "1px solid #e5e7eb" }} />
                      <Bar dataKey="count" fill={metric.color} radius={[0, 4, 4, 0]} barSize={18} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* SME List */}
            {smeList.length > 0 && (
              <div>
                <p className="text-[11px] tracking-[0.05em] uppercase text-[var(--allyra-neutral-400)] mb-3" style={{ fontWeight: 600 }}>
                  Sample SMEs
                </p>
                <div className="space-y-2">
                  {smeList.map((sme, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg bg-[var(--allyra-neutral-50)] px-4 py-3 hover:bg-[var(--allyra-neutral-100)] transition-colors cursor-pointer group"
                    >
                      <p className="text-[12px] text-[var(--allyra-neutral-700)]">{sme}</p>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[var(--allyra-neutral-300)] group-hover:text-[var(--allyra-neutral-600)] transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Insights */}
            <div className="rounded-xl bg-[#f0faf4] border border-[#c6e9d4] p-4">
              <p className="text-[11px] tracking-[0.05em] uppercase text-[#2d6a4f] mb-2" style={{ fontWeight: 600 }}>
                Key Insights
              </p>
              <ul className="space-y-1.5">
                {metric.label === "Women-Led SMEs" && (
                  <>
                    <li className="text-[12px] text-[var(--allyra-neutral-700)] flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#2d6a4f] mt-1.5 shrink-0" />
                      Women-led enterprises show 15% higher completion rate in TA programs
                    </li>
                    <li className="text-[12px] text-[var(--allyra-neutral-700)] flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#2d6a4f] mt-1.5 shrink-0" />
                      Average investment readiness score: 68/100
                    </li>
                  </>
                )}
                {metric.label === "Youth-Led SMEs" && (
                  <>
                    <li className="text-[12px] text-[var(--allyra-neutral-700)] flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#2d6a4f] mt-1.5 shrink-0" />
                      Youth entrepreneurs demonstrate strong digital adoption
                    </li>
                    <li className="text-[12px] text-[var(--allyra-neutral-700)] flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#2d6a4f] mt-1.5 shrink-0" />
                      Higher growth velocity but require governance support
                    </li>
                  </>
                )}
                {metric.label === "Underserved Regions" && (
                  <>
                    <li className="text-[12px] text-[var(--allyra-neutral-700)] flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#2d6a4f] mt-1.5 shrink-0" />
                      Rural SMEs create 2.3x more jobs per dollar invested
                    </li>
                    <li className="text-[12px] text-[var(--allyra-neutral-700)] flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#2d6a4f] mt-1.5 shrink-0" />
                      Market access remains the primary bottleneck
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
