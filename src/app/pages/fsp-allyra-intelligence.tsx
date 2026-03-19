import { useNavigate } from "react-router";
import { ArrowLeft, Brain, Users, AlertTriangle, Shield, Clock, Landmark, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const KPI_CARDS = [
  { label: "Avg Intelligence Score", value: "68", description: "Portfolio-wide average out of 100", icon: Brain, color: "#0f766e", bg: "#f0fdfa", border: "#99f6e4" },
  { label: "Active Engagements", value: "72%", description: "Borrowers with Allyra interaction in last 30 days", icon: Users, color: "#0891b2", bg: "#ecfeff", border: "#a5f3fc" },
  { label: "Early Warnings", value: "14", description: "Pre-financial deterioration signals detected", icon: AlertTriangle, color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
];

const SCORE_DISTRIBUTION = [
  { band: "0-20", count: 8, fill: "#dc2626" },
  { band: "21-40", count: 22, fill: "#d97706" },
  { band: "41-60", count: 48, fill: "#d97706" },
  { band: "61-80", count: 78, fill: "#0f766e" },
  { band: "81-100", count: 44, fill: "#2d6a4f" },
];

const SCORE_BANDS = [
  { band: "81-100", label: "Deep Insight", implication: "High confidence in borrower understanding. Supports streamlined credit decisioning.", color: "#2d6a4f" },
  { band: "61-80", label: "Strong Insight", implication: "Good visibility into borrower operations. Standard assessment sufficient.", color: "#0f766e" },
  { band: "41-60", label: "Developing Insight", implication: "Material gaps in borrower data. Enhanced due diligence recommended.", color: "#d97706" },
  { band: "21-40", label: "Limited Insight", implication: "Significant information gaps. Manual review and RM engagement required.", color: "#d97706" },
  { band: "0-20", label: "Minimal Insight", implication: "Insufficient Allyra data. Traditional credit assessment only.", color: "#dc2626" },
];

const EARLY_WARNINGS = [
  { borrower: "Accra Solar Systems", signal: "Last Allyra interaction 47 days ago — PO finance facility of R890K maturing in 90 days with DSCR already at 0.9x. Pattern matches 3 prior PAR migrations in Ghana energy sector.", severity: "high", score: 38 },
  { borrower: "Soweto Quick Serve", signal: "Quarterly management accounts overdue by 33 days (covenant breach threshold: 45 days). Last uploaded financials showed declining gross margin from 28% to 21% over two periods.", severity: "high", score: 47 },
  { borrower: "Mombasa Marine Svcs", signal: "Growth plan inactive since January — 0 of 4 initiatives progressing. DSCR dropped from 1.1x to 0.8x over same period. RM last visited 5 months ago.", severity: "high", score: 32 },
  { borrower: "Lagos Textiles Ltd", signal: "Allyra interaction frequency dropped from 8 to 3 sessions per month. Invoice discounting drawdowns up 40% while sales conversation showed flat revenue — possible cash flow strain.", severity: "medium", score: 54 },
  { borrower: "Dar Coffee Exports", signal: "3 of 8 findings from last business analysis still unverified — including supplier concentration risk and export licence renewal status. Both flagged as material in original assessment.", severity: "medium", score: 65 },
];

const INTERVENTIONS = [
  { borrower: "Accra Solar Systems", action: "RM site visit before maturity — assess operational status, update business profile, and evaluate refinancing options given sub-1.0x DSCR.", priority: "urgent" },
  { borrower: "Mombasa Marine Svcs", action: "Joint RM and credit review — DSCR below covenant threshold. Reactivate growth plan engagement and assess whether restructuring is needed.", priority: "urgent" },
  { borrower: "Soweto Quick Serve", action: "Trigger Allyra document upload prompt with 12-day covenant deadline warning. Flag to RM for follow-up if not received within 5 days.", priority: "high" },
  { borrower: "Lagos Textiles Ltd", action: "Automated Allyra check-in focused on revenue pipeline and cash position. Cross-reference invoice discounting utilisation against reported sales.", priority: "medium" },
];

function severityColor(s: string) {
  if (s === "high" || s === "urgent") return { bg: "#fef2f2", text: "#dc2626", border: "#fecaca" };
  if (s === "medium") return { bg: "#fffbeb", text: "#d97706", border: "#fde68a" };
  return { bg: "#f0faf4", text: "#2d6a4f", border: "#c6e9d4" };
}

export function FspAllyraIntelligence() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <header className="bg-white border-b border-[var(--allyra-neutral-200)] px-5 py-3 flex items-center gap-4">
        <button onClick={() => navigate("/fsp-dashboard")} className="lg:hidden w-8 h-8 rounded-lg hover:bg-[var(--allyra-neutral-100)] flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-[var(--allyra-neutral-600)]" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-[18px] text-[var(--allyra-neutral-900)] truncate" style={{ fontWeight: 600 }}>Allyra Intelligence</h1>
          <p className="text-[12px] text-[var(--allyra-neutral-500)]">Knowledge score analytics and early warning signals</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f0fdfa] border border-[#99f6e4]">
          <Landmark className="w-3.5 h-3.5" style={{ color: "#0f766e" }} strokeWidth={2} />
          <span className="text-[12px]" style={{ fontWeight: 600, color: "#0f766e" }}>Pan-African Bank</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-5">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {KPI_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="rounded-xl border bg-white p-5 hover:shadow-md transition-all"
                  style={{ borderColor: card.border }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: card.bg }}>
                    <Icon className="w-5 h-5" style={{ color: card.color }} strokeWidth={1.8} />
                  </div>
                  <p className="text-[24px] text-[var(--allyra-neutral-900)]" style={{ fontWeight: 700 }}>{card.value}</p>
                  <p className="text-[11px] tracking-[0.04em] uppercase text-[var(--allyra-neutral-500)] mt-1" style={{ fontWeight: 600 }}>{card.label}</p>
                  <p className="text-[12px] text-[var(--allyra-neutral-500)] mt-1">{card.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Score Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5" style={{ color: "#0f766e" }} strokeWidth={1.8} />
              <h2 className="text-[14px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 600 }}>Intelligence Score Distribution</h2>
            </div>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SCORE_DISTRIBUTION} margin={{ left: 0, right: 10 }}>
                  <XAxis dataKey="band" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: "12px", borderRadius: "8px", border: "1px solid #e5e7eb" }} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={40}>
                    {SCORE_DISTRIBUTION.map((entry, index) => (
                      <motion.rect key={index} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Band Legend */}
            <div className="mt-4 space-y-2">
              {SCORE_BANDS.map((b) => (
                <div key={b.band} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: b.color }} />
                  <div>
                    <span className="text-[12px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 600 }}>{b.band} — {b.label}: </span>
                    <span className="text-[12px] text-[var(--allyra-neutral-500)]">{b.implication}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Early Warning Signals */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5" style={{ color: "#d97706" }} strokeWidth={1.8} />
              <h2 className="text-[14px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 600 }}>Early Warning Signals</h2>
            </div>
            <div className="space-y-3">
              {EARLY_WARNINGS.map((w, i) => {
                const sc = severityColor(w.severity);
                return (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[var(--allyra-neutral-50)]">
                    <span className="text-[10px] tracking-[0.04em] uppercase px-2 py-0.5 rounded-full shrink-0 mt-0.5" style={{ fontWeight: 600, color: sc.text, backgroundColor: sc.bg, border: `1px solid ${sc.border}` }}>{w.severity}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 600 }}>{w.borrower}</p>
                      <p className="text-[12px] text-[var(--allyra-neutral-500)] mt-0.5">{w.signal}</p>
                    </div>
                    <span className="text-[11px] shrink-0" style={{ fontWeight: 700, color: w.score < 40 ? "#dc2626" : "#d97706" }}>Score: {w.score}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Suggested Interventions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="rounded-xl border border-[var(--allyra-neutral-200)] bg-white p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5" style={{ color: "#0f766e" }} strokeWidth={1.8} />
              <h2 className="text-[14px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 600 }}>Suggested Interventions</h2>
            </div>
            <div className="space-y-3">
              {INTERVENTIONS.map((int, i) => {
                const pc = severityColor(int.priority);
                return (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-[var(--allyra-neutral-100)]">
                    <span className="text-[10px] tracking-[0.04em] uppercase px-2 py-0.5 rounded-full shrink-0 mt-0.5" style={{ fontWeight: 600, color: pc.text, backgroundColor: pc.bg, border: `1px solid ${pc.border}` }}>{int.priority}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-[var(--allyra-neutral-800)]" style={{ fontWeight: 600 }}>{int.borrower}</p>
                      <p className="text-[12px] text-[var(--allyra-neutral-500)] mt-0.5">{int.action}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
