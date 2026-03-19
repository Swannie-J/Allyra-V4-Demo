import type { InsightCardData } from "../components/insight-card";
import type { GrowthPlanInitiative } from "../components/chat-context";

export interface ConversationScriptItem {
  role: "assistant" | "user";
  content: string;
}

export type InsightScriptItem =
  | { type: "message"; content: string }
  | { type: "card"; card: InsightCardData }
  | { type: "wait-for-user"; userResponse: string };

export interface GpStepScript {
  messages: string[];
  question?: string;
  userResponse?: string;
}

export interface GrowthFocus {
  statement: string;
  primaryConstraint: string;
  secondaryOpportunity: string;
}

export interface ScenarioBusinessProfile {
  sector: string;
  stage: string;
  employees: string;
  revenue: string;
}

export interface ScenarioContent {
  conversationScript: ConversationScriptItem[];
  uploadFileNames: string[];
  analysisSteps: string[];
  growthInsightsScript: InsightScriptItem[];
  businessProfile: ScenarioBusinessProfile;
  growthFocus: GrowthFocus;
  initiatives: GrowthPlanInitiative[];
  gpStepScripts: GpStepScript[];
}

// ─── MASAKHANE MINI MARKET ────────────────────────────────────────────────────

const masakhaneContent: ScenarioContent = {
  conversationScript: [
    { role: "assistant", content: "Tell me a bit about the business. What do you sell, and who usually buys from you?" },
    { role: "user", content: "I run a spaza shop here in Orlando West. We sell the usual things people need every day, like bread, milk, drinks, maize meal, snacks, airtime, electricity, toiletries, that kind of thing. We also make vetkoek and sometimes kota or lunch plates. Mostly it is people from the area, school kids, workers, and some regular customers who message us on WhatsApp." },
    { role: "assistant", content: "That helps. It sounds like you've got a mix of everyday convenience sales and some higher-margin food sales as well.\n\nHow long have you been running it, and did it start as a shop from day one?" },
    { role: "user", content: "It started small from home first. I was selling basics and snacks, then later we moved properly into the shop. It's been about four years now, but the shop as it is now is about two and a half years." },
    { role: "assistant", content: "Understood. And out of everything you do, what currently brings in most of the money: the normal shop items, prepaid services, or the cooked food side?" },
    { role: "user", content: "Most of the money is still the normal shop side because that moves every day. But the food side gives better profit when we have enough ingredients and everything is working." },
    { role: "assistant", content: "That makes sense. Just so I understand the scale properly, how big is the business today? For example, how many people help, how busy the shop gets, or how much of it still depends on you directly." },
    { role: "user", content: "It is mainly me. My younger sister helps in the shop and I have one lady who helps with food sometimes, especially month-end or weekends. But I still handle buying stock, cash, suppliers, and most decisions myself." },
    { role: "assistant", content: "And over the next year or so, what are you trying to improve most? More sales, better profit, a bigger shop, more food sales, another location, or something else?" },
    { role: "user", content: "Right now I want this one to work better and make more money properly. I would like to grow the food side because people respond well to it, and also stop running out of fast things people ask for." },
    { role: "assistant", content: "When things feel tight in the business, what usually causes it most? Is it stock buying, cash being short, customers taking on credit, equipment problems, or something else?" },
    { role: "user", content: "Mostly cash. Money comes in but it disappears quickly because I must buy stock all the time. Also some people ask for credit and sometimes family also takes things. Then with food, if the fridge is full or not working nicely, we can't do as much." },
    { role: "assistant", content: "That's useful. So demand is there, but control and capacity are getting in the way.\n\nDo you currently keep proper records for the business, or is it more bank statements, supplier slips, cash notes, and what you track yourself?" },
    { role: "user", content: "I don't have proper financial statements. I have the bank account statements, some supplier slips, cash records, and I know the business in my head. My cousin also helped me put some numbers into Excel before." },
    { role: "assistant", content: "One last thing for now. When the shop gets busier, what breaks first: stock availability, cash, space, equipment, or your own time?" },
    { role: "user", content: "Stock and cash first. Then my time. Because if bread, drinks, or mealie meal finish, people just go somewhere else. And with food, fridge space and prep space become a problem." },
    { role: "assistant", content: "Thanks, that gives me a much clearer picture.\n\nI can already see that the business has steady local demand, but there may be pressure around stock control, cash discipline, and your ability to expand the food side properly.\n\nTo test that properly, I'd like to look at a few things with you." },
    { role: "assistant", content: "Could you please upload any of the following if you have them available?\n\n• Recent bank statements\n• Any sales records, stock sheets, or cash books\n• Financial statements or management accounts (if available)\n• Business registration documents\n\nDon't worry if you don't have all of them — anything you can share will help." },
  ],

  uploadFileNames: [
    "Bank statements (3 months).pdf",
    "Cash notebook.jpg",
    "Stock list.xlsx",
    "CIPC registration.pdf",
  ],

  analysisSteps: [
    "Reviewing bank statements and cash notes",
    "Checking stock and sales patterns",
    "Researching township retail demand signals",
    "Analysing convenience and prepared-food trends",
    "Reviewing local competition signals",
    "Identifying growth and margin pressure points",
    "Compiling insights",
  ],

  businessProfile: {
    sector: "Township Retail / Spaza Shop / Prepared Foods",
    stage: "Informal-to-Formal Growth",
    employees: "3 (Owner + 2 part-time)",
    revenue: "R45,000 – R65,000/month",
  },

  growthFocus: {
    statement: "Strengthen stock and cash control so the shop can grow profitably, while expanding the prepared-food offering in a more disciplined way.",
    primaryConstraint: "Stock control & cash discipline",
    secondaryOpportunity: "Prepared food margin expansion",
  },

  growthInsightsScript: [
    { type: "message", content: "I've finished reviewing what you shared and looking at the market around your business.\n\nA few patterns come through quite clearly.\n\nThe business has real customer demand and strong local relevance, but there are also some basic operating issues that are making growth harder than it should be.\n\nLet me walk you through what I found." },
    { type: "card", card: { title: "WHAT'S WORKING", variant: "working", items: ["Strong daily local demand for essential convenience products", "Good neighbourhood trust and repeat customer traffic", "Prepared-food offering creates higher-margin sales potential", "WhatsApp ordering shows early demand for convenience and local delivery"] } },
    { type: "message", content: "The good news is that the business clearly serves a real need in the area.\n\nYou already have customer trust, regular foot traffic, and an extra income stream through food and WhatsApp orders.\n\nFrom your side, which of these has helped the business most so far?" },
    { type: "wait-for-user", userResponse: "The regular customers from the area. They keep the shop moving every day." },
    { type: "card", card: { title: "WHAT NEEDS ATTENTION", variant: "attention", items: ["Frequent stock-outs on fast-moving items are losing sales", "Cash is being recycled into stock too reactively instead of being planned", "Informal credit and leakage are reducing real profit", "Food sales are constrained by limited refrigeration and prep capacity"] } },
    { type: "message", content: "These look like the main issues stopping the business from performing as strongly as it could.\n\nNot because demand is weak, but because too much value is leaking out of the system.\n\nDoes this reflect what you experience day to day?" },
    { type: "wait-for-user", userResponse: "Yes, especially stock and cash. We are always chasing the next stock buy." },
    { type: "card", card: { title: "FINANCIAL INSIGHTS", variant: "financial", items: [], metrics: [{ label: "Average cash pressure", value: "High", detail: "especially before major restocking" }, { label: "Estimated gross margin leakage", value: "Moderate to high", detail: "credit, shrinkage, untracked withdrawals" }, { label: "Fast-moving stock-out risk", value: "Frequent", detail: "bread, drinks, mealie meal, airtime" }, { label: "Prepared-food margin potential", value: "Strong", detail: "higher than core convenience items" }, { label: "Record-keeping quality", value: "Basic", detail: "limits planning and finance readiness" }] } },
    { type: "message", content: "Your financial picture suggests the business is active, but not yet fully under control.\n\nThere is money moving through the shop, but the records suggest that profit is being reduced by a mix of unplanned stock buying, informal credit, and weak visibility on what is really making money." },
    { type: "message", content: "The prepared-food side looks especially important.\n\nIt likely gives better margin than many of the normal shelf items, but right now it is being held back by equipment, storage, and how much of the process still depends on you." },
    { type: "message", content: "Does that feel accurate from your side?\n\nFor example, do you feel the business is busier than it is actually profitable?" },
    { type: "wait-for-user", userResponse: "Yes. It can feel busy all day but at the end the money is not always where it should be." },
    { type: "card", card: { title: "GROWTH OPPORTUNITIES", variant: "opportunities", items: ["Improve margins by expanding prepared foods in a controlled way", "Increase basket size through better fast-moving stock availability", "Build repeat local ordering through WhatsApp and simple delivery", "Formalise basic records to unlock future supplier and finance options"] } },
    { type: "message", content: "There are good growth paths here, but the best ones are quite practical.\n\nThis is less about opening a second shop too soon, and more about tightening this one so it produces more profit and more repeat spend.\n\nWhich of these opportunities feels most realistic for you right now?" },
    { type: "wait-for-user", userResponse: "Growing the food side properly and keeping the right stock available." },
    { type: "card", card: { title: "THINGS TO WATCH", variant: "watch", items: ["Price-sensitive customers switching quickly if key items are unavailable", "Informal competitors reacting fast on convenience pricing", "Rising food input and electricity costs affecting prepared-food margins", "Increasing dependence on the founder creating scaling risk"] } },
    { type: "message", content: "These are not all immediate threats, but they do matter as you grow.\n\nThe biggest one is probably that the business still depends heavily on you personally, which makes it difficult to scale without more pressure falling back on you.\n\nAre you already feeling that?" },
    { type: "wait-for-user", userResponse: "Yes. If I am not there, things don't run the same." },
    { type: "card", card: { title: "CURRENT GROWTH BOTTLENECKS", variant: "bottlenecks", items: ["Poor stock control on fast-moving items", "Cash leakage and weak record discipline", "Limited refrigeration and food prep capacity", "Heavy founder dependence in day-to-day operations"] } },
    { type: "message", content: "Looking across everything we've discussed, these appear to be the real bottlenecks holding the business back.\n\nIf we solved just one first, it would probably unlock the most progress.\n\nWhich of these feels most urgent to tackle first?" },
    { type: "wait-for-user", userResponse: "Stock and cash control first. Because that affects everything else." },
    { type: "message", content: "Great.\n\nI've captured these findings in your Business Insights section so you can review them more clearly.\n\nThe important thing at this stage is that the business does have room to grow, but the first phase of growth should be about control, consistency, and stronger daily economics.\n\nFrom there, we can turn this into a practical growth plan." },
  ],

  initiatives: [
    {
      id: "init-1", number: 1,
      title: "Take control of stock and fast-moving items",
      description: "The business is losing sales and creating daily pressure because key products run out too often and stock buying is too reactive.",
      actions: [
        { id: "a1-1", task: "Identify top 20 fast-moving items and track them daily", owner: "Nthabiseng", timeline: "15 April 2026", status: "Not started", support: { label: "Fast-moving stock tracker", link: "/training" } },
        { id: "a1-2", task: "Set minimum reorder levels for key staples and drinks", owner: "Nthabiseng", timeline: "22 April 2026", status: "Not started" },
        { id: "a1-3", task: "Move to a fixed weekly core stock planning routine", owner: "Nthabiseng", timeline: "30 April 2026", status: "Planned", support: { label: "Weekly stock planning guide", link: "/training" } },
      ],
    },
    {
      id: "init-2", number: 2,
      title: "Improve cash discipline and reduce leakage",
      description: "The business is active, but profit is being reduced by informal credit, weak tracking, and cash being pulled into stock without enough planning.",
      actions: [
        { id: "a2-1", task: "Separate business cash tracking from personal and family use", owner: "Nthabiseng", timeline: "20 April 2026", status: "Not started" },
        { id: "a2-2", task: "Introduce a simple daily cash-up and weekly summary sheet", owner: "Nthabiseng + Sister", timeline: "30 April 2026", status: "Not started", support: { label: "Daily cash control sheet", link: "/training" } },
        { id: "a2-3", task: "Set and communicate a stricter customer credit policy", owner: "Nthabiseng", timeline: "05 May 2026", status: "Planned" },
      ],
    },
    {
      id: "init-3", number: 3,
      title: "Expand the food side where margins are stronger",
      description: "Prepared foods already show demand and stronger profit potential, but the business needs better storage, planning, and simpler menu discipline before scaling this further.",
      actions: [
        { id: "a3-1", task: "Identify top 5 best-selling food items by demand and margin", owner: "Nthabiseng", timeline: "10 May 2026", status: "Not started" },
        { id: "a3-2", task: "Standardise ingredients and portion sizes for those items", owner: "Nthabiseng + Food assistant", timeline: "20 May 2026", status: "Not started", support: { label: "Basic food costing template", link: "/training" } },
        { id: "a3-3", task: "Assess additional fridge or freezer need for food expansion", owner: "Nthabiseng", timeline: "31 May 2026", status: "Planned", support: { label: "Small equipment planning guide", link: "/training" } },
      ],
    },
    {
      id: "init-4", number: 4,
      title: "Reduce founder dependence and build a more reliable routine",
      description: "The business depends heavily on the founder for stock, cash, decisions, and food operations. This limits consistency and makes growth harder.",
      actions: [
        { id: "a4-1", task: "Create a simple daily opening and closing checklist", owner: "Nthabiseng", timeline: "25 April 2026", status: "Not started" },
        { id: "a4-2", task: "Train sister on stock counts and cash-up routine", owner: "Nthabiseng", timeline: "15 May 2026", status: "Not started" },
        { id: "a4-3", task: "Assign one repeatable weekly admin hour for numbers and planning", owner: "Nthabiseng", timeline: "15 May 2026", status: "Planned" },
      ],
    },
  ],

  gpStepScripts: [
    { messages: ["Based on everything we've discussed, I'd like to start by defining the main growth focus for your business.", "From the analysis, the business already has strong local demand, but growth and profitability are being limited by stock control, cash leakage, and the way too much still depends on you directly.", "I also see a real opportunity to grow the prepared-food side and increase customer basket size if the basics become more controlled.", "Based on this, the core focus I see is:\n\nStrengthen stock and cash control so the shop can grow profitably, while expanding the prepared-food offering in a more disciplined way."], question: "Does this feel like the right focus for the next phase of your business?", userResponse: "Yes, that sounds right." },
    { messages: ["The first priority is to tighten control over the products that drive daily customer traffic."], question: "Does this capture the stock problem properly, or would you change anything?", userResponse: "No, this is right." },
    { messages: ["The second priority is getting more control over where the money is going and protecting the real profit of the business."], question: "Does this match what you see happening with cash in the business?", userResponse: "Yes, that's exactly what happens." },
    { messages: ["The third opportunity is to build the prepared-food side more deliberately, because that looks like one of the best margin opportunities in the business."], question: "Does focusing on the food side as a growth lever make sense for you?", userResponse: "Yes, definitely. That's where we can improve margins most." },
    { messages: ["The fourth priority is making the business less dependent on you carrying everything yourself."], question: "Does this feel like a realistic next step to work towards?", userResponse: "Yes, I need to build this properly if I want to grow." },
  ],
};

// ─── HENDERSON STEEL FABRICATION ─────────────────────────────────────────────

const hendersonContent: ScenarioContent = {
  conversationScript: [
    { role: "assistant", content: "Tell me a bit about the business. What do you do, and who are your customers?" },
    { role: "user", content: "We do general steel fabrication. Gates, balustrades, staircases, light structural work, brackets, that sort of thing. Most of our work comes from building contractors, some factory clients, and then the odd private client." },
    { role: "assistant", content: "And how long have you been running it, and how did it start?" },
    { role: "user", content: "I started it about eight years ago. I'd worked in fabrication for years before that, then went on my own. It was mostly smaller residential work at first, and over time we got more contractor and industrial jobs." },
    { role: "assistant", content: "Which part of the business brings in most of the money now?" },
    { role: "user", content: "The contractor work, definitely. That's where most of the turnover sits. The smaller private jobs help with cash flow, but the contractor jobs are the bigger numbers, even if they're not always the easiest." },
    { role: "assistant", content: "And how big is the business these days? How many people are involved, and how much still depends on you directly?" },
    { role: "user", content: "We've got fourteen people in total. I've got a foreman on the floor and admin in the office, but I still handle most of the quoting, pricing, supplier issues, and anything that gets sticky with clients or jobs." },
    { role: "assistant", content: "Over the next year, what are you most trying to improve?" },
    { role: "user", content: "Better margins, better control in the workshop, and less firefighting. We're busy enough. I'm not desperate for more work. I want the business to run better and make the right money." },
    { role: "assistant", content: "When things feel tight, what usually causes it most?" },
    { role: "user", content: "Bad quoting, jobs taking longer than they should, and then late payment from contractors. One or two jobs go wrong and suddenly everything feels tight." },
    { role: "assistant", content: "Do you keep proper records, or is it more informal, like bank statements and what you track yourself?" },
    { role: "user", content: "The accounts are all proper. Accountant handles the books, VAT, year-end, all of that. But proper job costing is weak. We quote, we invoice, but we don't always track properly afterwards what each job actually made us." },
    { role: "assistant", content: "When the business gets busier, what breaks first?" },
    { role: "user", content: "Planning, without a doubt. The workshop gets congested, jobs overlap, things get delayed, and then I get dragged back into sorting everything out." },
    { role: "assistant", content: "Thanks, that gives me a much clearer picture.\n\nI can already see that the business has strong demand and a solid contractor base, but there may be pressure around pricing accuracy, job-level profitability, and how smoothly work moves through the workshop once volume picks up.\n\nTo test that properly, I'd like to look at a few things with you." },
    { role: "assistant", content: "Could you please upload any of the following if you have them available?\n\n• Recent bank statements\n• Sample job quotes, invoices, and any job costing sheets\n• Financial statements or management accounts (if available)\n• Workshop schedules, production trackers, or project breakdowns\n• Business registration documents\n\nDon't worry if you don't have all of them — anything you can share will help." },
  ],

  uploadFileNames: [
    "Bank statements (Jan-Mar 2026).pdf",
    "Job quotes and invoices sample.xlsx",
    "Management accounts FY2025.pdf",
    "Workshop production schedule and costing tracker.xlsx",
  ],

  analysisSteps: [
    "Reviewing bank statements and revenue patterns",
    "Analysing quoting accuracy and pricing consistency",
    "Reviewing job costing and margin performance",
    "Assessing workshop workflow and utilisation",
    "Analysing contractor and client concentration",
    "Identifying margin leakage and operational bottlenecks",
    "Compiling insights",
  ],

  businessProfile: {
    sector: "Metal Fabrication / Light Manufacturing / Construction Supply",
    stage: "Growth Stage",
    employees: "14 (Owner + 10 workshop + 2 installers + 1 admin)",
    revenue: "R650,000 – R950,000/month",
  },

  growthFocus: {
    statement: "Improve profitability and scalability by strengthening job costing, pricing discipline, and workshop control, so the business can grow with better margins and less owner dependence.",
    primaryConstraint: "Margin control and operational discipline",
    secondaryOpportunity: "Higher-quality contractor revenue",
  },

  growthInsightsScript: [
    { type: "message", content: "I've finished reviewing everything you shared and looking at the steel fabrication and contractor market in Gauteng.\n\nThere are some clear patterns here.\n\nThe business is commercially active and well-regarded, but there are pricing, workflow, and control issues that are limiting profitability more than the turnover level suggests.\n\nLet me walk you through what I found." },
    { type: "card", card: { title: "WHAT'S WORKING", variant: "working", items: ["Strong repeat demand from contractor and industrial clients", "Established reputation for quality fabrication and delivery", "Broad capability across custom and recurring job types", "Existing team structure provides a base for scale"] } },
    { type: "message", content: "You've built a real market position here, especially with repeat contractor work.\n\nWhich of these has helped the business most so far?" },
    { type: "wait-for-user", userResponse: "The repeat contractor work, definitely. Once they trust you, you stay in the mix." },
    { type: "card", card: { title: "WHAT NEEDS ATTENTION", variant: "attention", items: ["Inconsistent quoting is reducing margin on some jobs", "Limited post-job costing makes profitability hard to track", "Workshop congestion is slowing execution when jobs overlap", "Too many key decisions still route back through Mark"] } },
    { type: "message", content: "These issues all have something in common. The business is active and commercially credible, but the operating control underneath it is not yet tight enough.\n\nDoes that match the day-to-day reality?" },
    { type: "wait-for-user", userResponse: "Yes, that's spot on." },
    { type: "card", card: { title: "FINANCIAL INSIGHTS", variant: "financial", items: [], metrics: [{ label: "Pricing consistency", value: "Uneven", detail: "similar jobs quoted differently depending on urgency and client" }, { label: "Cash flow pressure", value: "Moderate", detail: "worsens when contractor payments slip beyond agreed terms" }, { label: "Margin leakage", value: "Moderate to high", detail: "driven by underquoting, rework, and extra time on site" }, { label: "Customer concentration", value: "Moderate", detail: "top contractor accounts drive a large share of monthly revenue" }, { label: "Job costing quality", value: "Limited", detail: "weak close-out visibility reduces pricing confidence" }] } },
    { type: "message", content: "Financially, the business looks commercially active, but the quality of earnings is less consistent than the topline suggests. Some jobs are likely carrying more effort and risk than the final margin justifies." },
    { type: "message", content: "The biggest financial tension is that contractor work is driving turnover, but without tighter costing and cleaner execution, that turnover is not always translating into the profit it should." },
    { type: "message", content: "Does it feel at times like the business is working harder than the numbers should require?" },
    { type: "wait-for-user", userResponse: "Yes. That's exactly how it feels." },
    { type: "card", card: { title: "GROWTH OPPORTUNITIES", variant: "opportunities", items: ["Improve gross margin through tighter quoting and post-job costing", "Increase throughput by improving workshop planning and sequencing", "Grow higher-quality contractor relationships with better terms", "Reduce decision bottlenecks by formalising internal processes"] } },
    { type: "message", content: "The opportunity here is not really chasing more volume straight away. It's improving the quality and control of the work already flowing through the business.\n\nWhich of these feels most realistic to act on now?" },
    { type: "wait-for-user", userResponse: "Costing and planning first. That would make the biggest difference." },
    { type: "card", card: { title: "THINGS TO WATCH", variant: "watch", items: ["Steel and material price volatility can erode margins quickly", "Delayed contractor payments can create pressure across the whole operation", "Custom jobs can become margin traps if not scoped properly upfront", "Growth will keep stalling if too much commercial judgment sits with Mark"] } },
    { type: "message", content: "Not all of these are immediate problems every week, but the most important one is probably the combination of margin erosion and owner dependence.\n\nAre you already feeling that quite strongly?" },
    { type: "wait-for-user", userResponse: "Yes, especially when a couple of jobs hit at once." },
    { type: "card", card: { title: "CURRENT GROWTH BOTTLENECKS", variant: "bottlenecks", items: ["Weak job costing and inconsistent pricing discipline", "Reactive workshop scheduling and workflow congestion", "High owner dependence in commercial and operational decisions", "Exposure to delayed contractor payments"] } },
    { type: "message", content: "Taken together, these are the points where growth is getting stuck.\n\nIf you could only tackle one of them first, which would unlock the most progress?" },
    { type: "wait-for-user", userResponse: "Job costing and pricing. That's where I'd start." },
    { type: "message", content: "I've saved these findings in your Business Insights section so you can review them properly.\n\nWhat the analysis shows is that the business already has real demand, strong capability, and room to grow. But the next phase of growth depends on tightening control, improving margin quality, and making the operation less dependent on you before simply pushing for more volume." },
  ],

  initiatives: [
    {
      id: "h-init-1", number: 1,
      title: "Tighten job costing and pricing discipline",
      description: "The business is already winning work, but not consistently converting that work into the right level of profit. Better costing and stronger pricing discipline will improve margins, sharpen quoting, and give the business a more reliable commercial foundation.",
      actions: [
        { id: "h-a1-1", task: "Build a standard costing template for the top 10 recurring job types", owner: "Mark + Admin", timeline: "18 April 2026", status: "Not started", support: { label: "Job costing template", link: "/training" } },
        { id: "h-a1-2", task: "Compare quoted vs actual cost and hours on the next 8 completed jobs", owner: "Mark + Foreman", timeline: "30 April 2026", status: "Not started", support: { label: "Post-job review sheet", link: "/training" } },
        { id: "h-a1-3", task: "Introduce quote approval rules for low-margin, rushed, or custom jobs", owner: "Mark", timeline: "08 May 2026", status: "Planned", support: { label: "Pricing discipline checklist", link: "/training" } },
      ],
    },
    {
      id: "h-init-2", number: 2,
      title: "Improve workshop planning and job flow",
      description: "The workshop is losing efficiency when jobs overlap or move through the floor without clear sequencing. Better planning will improve throughput, reduce delivery pressure, and make it easier to hit deadlines without increasing stress and rework.",
      actions: [
        { id: "h-a2-1", task: "Implement a weekly production planning board for all active jobs", owner: "Foreman", timeline: "22 April 2026", status: "Not started", support: { label: "Production planning board", link: "/training" } },
        { id: "h-a2-2", task: "Classify each job by urgency, complexity, and material readiness before scheduling", owner: "Foreman + Mark", timeline: "06 May 2026", status: "Not started", support: { label: "Job scheduling guide", link: "/training" } },
        { id: "h-a2-3", task: "Run a 30-day review of repeat bottlenecks, delays, and workshop congestion points", owner: "Mark", timeline: "20 May 2026", status: "Planned", support: { label: "Bottleneck review checklist", link: "/training" } },
      ],
    },
    {
      id: "h-init-3", number: 3,
      title: "Improve quality of contractor revenue",
      description: "Contractor work is the main revenue driver, but not all accounts are equally good for the business. The goal is to prioritise the right clients, improve commercial terms where possible, and lean into work that supports stronger margins and more predictable cash flow.",
      actions: [
        { id: "h-a3-1", task: "Review top 10 contractor accounts by revenue, margin, and payment behaviour", owner: "Mark + Admin", timeline: "30 April 2026", status: "Not started", support: { label: "Customer profitability tracker", link: "/training" } },
        { id: "h-a3-2", task: "Set deposit and payment term rules for higher-risk or custom jobs", owner: "Mark", timeline: "14 May 2026", status: "Not started", support: { label: "Payment terms guide", link: "/training" } },
        { id: "h-a3-3", task: "Prioritise 3 higher-quality contractor accounts for repeat growth and account planning", owner: "Mark", timeline: "29 May 2026", status: "Planned", support: { label: "Key account plan", link: "/training" } },
      ],
    },
    {
      id: "h-init-4", number: 4,
      title: "Reduce owner dependence in daily decision-making",
      description: "Too much of the business still runs through Mark, especially around quoting, approvals, exceptions, and problem-solving. Building clearer rules, routines, and team accountability will make the business more stable and easier to grow without everything bouncing back to the owner.",
      actions: [
        { id: "h-a4-1", task: "Define decision thresholds for foreman, admin, and owner escalation", owner: "Mark", timeline: "05 May 2026", status: "Not started", support: { label: "Decision rights matrix", link: "/training" } },
        { id: "h-a4-2", task: "Introduce a weekly operations and numbers review with the foreman and admin lead", owner: "Mark + Foreman + Admin", timeline: "19 May 2026", status: "Not started", support: { label: "Weekly review agenda", link: "/training" } },
        { id: "h-a4-3", task: "Train the foreman to handle defined workshop exceptions without owner sign-off", owner: "Mark", timeline: "05 June 2026", status: "Planned", support: { label: "Supervisor coaching checklist", link: "/training" } },
      ],
    },
  ],

  gpStepScripts: [
    { messages: ["Based on everything we've discussed, I'd like to start by defining the main growth focus for your business.", "The analysis shows that the business has real demand and a credible market position, but growth is being limited by uneven costing, workshop congestion, and the amount of decision-making still sitting with you.", "At the same time, there is a clear opportunity to improve profitability and scale more confidently by tightening control, especially around pricing, flow, and account quality.", "Based on this, the core focus I see is:\n\nImprove profitability and scalability by strengthening job costing, pricing discipline, and workshop control, so the business can grow with better margins and less owner dependence."], question: "Does this feel like the right focus for the next phase of the business?", userResponse: "Yes, that feels right. That's exactly where we need to get sharper." },
    { messages: ["The first priority is fixing job costing and pricing, because that is where margin quality starts. You said yourself that the business is busy, but not always making the right money, and this is the clearest place to change that."], question: "Does this capture the problem properly, or would you change anything?", userResponse: "No, this is right." },
    { messages: ["The second priority is workshop flow. When the floor gets congested and jobs overlap, profitability and delivery both take a hit, so improving planning becomes the next logical step."], question: "Does this match what you experience when things get busy?", userResponse: "Yes. Once the flow goes, everything starts backing up." },
    { messages: ["The third priority is improving the quality of contractor revenue. The opportunity is not just more work, but better work, with better terms and more predictable returns."], question: "Does this growth lever make sense for where the business is now?", userResponse: "Yes, definitely. I'd rather do better work than just pile on more turnover." },
    { messages: ["The fourth priority is reducing how much of the business depends on you personally. That is usually one of the harder shifts, but it is also what makes growth more stable and sustainable."], question: "Does this feel like a realistic next step?", userResponse: "Yes. It won't happen overnight, but it definitely needs to happen." },
  ],
};

// ─── DLAMINI FLEET SERVICES ───────────────────────────────────────────────────

const dlaminiContent: ScenarioContent = {
  conversationScript: [
    { role: "assistant", content: "Tell me a bit about the business. What do you do, and who are your customers?" },
    { role: "user", content: "We do transport and deliveries. Mostly regional loads around KZN, sometimes Gauteng as well. Our clients are mainly wholesalers, distributors, a couple of manufacturers, and some retail supply jobs." },
    { role: "assistant", content: "And how long have you been running it, and how did it start?" },
    { role: "user", content: "I started with one truck about six years ago. At first it was ad hoc loads and subcontracting. Then over time we picked up more regular clients and added more vehicles." },
    { role: "assistant", content: "Which part of the business brings in most of the money now?" },
    { role: "user", content: "The contract work. That's where most of the revenue comes from. The once-off loads help fill gaps, but the regular client runs are really what keep the business going." },
    { role: "assistant", content: "How big is the business now, and how much still depends on you personally?" },
    { role: "user", content: "We've got six trucks running. Eleven people altogether. I'm still very involved though. I deal with clients, vehicle issues, driver problems, payments, and anything that goes wrong on the road." },
    { role: "assistant", content: "Over the next year, what are you most trying to improve?" },
    { role: "user", content: "I want more stability. Better cash flow, fewer breakdown disruptions, and to be able to take on bigger work without stressing every month about fuel and salaries." },
    { role: "assistant", content: "When things feel tight, what usually causes it most?" },
    { role: "user", content: "Cash flow. Always cash flow. The work is there, but clients can take 30, 45, even 60 days to pay. Meanwhile fuel, tyres, repairs, and wages don't wait." },
    { role: "assistant", content: "Do you keep proper records, or is it more informal, like bank statements, receipts, and what you track yourself?" },
    { role: "user", content: "The accounts are proper enough. We've got bank statements, invoices, client statements, and the accountant does the books. We also track mileage, fuel, and deliveries, but it's not all in one clean system." },
    { role: "assistant", content: "When the business gets busier, what breaks first?" },
    { role: "user", content: "Working capital and fleet reliability. More work sounds good, but if two vehicles need attention and clients are paying late, you feel it straight away." },
    { role: "assistant", content: "Thanks, that gives me a much clearer picture.\n\nI can already see that the business has solid demand and a base of repeat contract work, but there may be pressure around delayed client payments, uneven fleet reliability, and how much working capital gets tied up before the cash comes back in.\n\nTo test that properly, I'd like to look at a few things with you." },
    { role: "assistant", content: "Could you please upload any of the following if you have them available?\n\n• Recent bank statements\n• Delivery waybills, fuel records, or vehicle running cost summaries\n• Financial statements or management accounts (if available)\n• Client invoices, statements, or contract schedules\n• Business registration documents\n\nDon't worry if you don't have all of them — anything you can share will help." },
  ],

  uploadFileNames: [
    "Bank statements (Jan-Mar 2026).pdf",
    "Fuel and vehicle running costs Q1 2026.xlsx",
    "Client invoices and payment schedule.pdf",
    "Management accounts FY2025.pdf",
  ],

  analysisSteps: [
    "Reviewing bank statements and client payment patterns",
    "Analysing delivery volumes and contract revenue mix",
    "Reviewing fuel, maintenance, and route cost trends",
    "Assessing fleet utilisation and downtime patterns",
    "Analysing debtor days and cash conversion pressure",
    "Identifying working capital gaps and growth constraints",
    "Compiling insights",
  ],

  businessProfile: {
    sector: "Fleet-Based Logistics / Regional Transport / Contract Delivery",
    stage: "Expansion Stage",
    employees: "11 (Owner + 6 drivers + 2 assistants + 1 coordinator + 1 admin)",
    revenue: "R420,000 – R680,000/month",
  },

  growthFocus: {
    statement: "Strengthen cash flow, fleet reliability, and operating control so Dlamini Fleet Services can grow contract revenue without constant working capital pressure.",
    primaryConstraint: "Working capital gap and fleet reliability",
    secondaryOpportunity: "Better-quality contract growth",
  },

  growthInsightsScript: [
    { type: "message", content: "I've finished reviewing everything you shared and looking at the regional transport and contract delivery market in KwaZulu-Natal.\n\nThere are some clear patterns here.\n\nThe business has solid repeat client demand and real capacity to grow, but working capital pressure and fleet reliability are making it harder to run smoothly and take on more work.\n\nLet me walk you through what I found." },
    { type: "card", card: { title: "WHAT'S WORKING", variant: "working", items: ["Strong repeat demand from contract-based delivery clients", "Established operating footprint across KZN with some Gauteng reach", "Fleet capacity already large enough to support further growth", "Good client retention driven by reliability and responsiveness"] } },
    { type: "message", content: "The strongest thing here is that this is not a business searching for demand. You've already built recurring client relationships, which is a strong base.\n\nWhich of these has helped the business most so far?" },
    { type: "wait-for-user", userResponse: "The repeat clients. Once you've got a regular route or account, it changes everything." },
    { type: "card", card: { title: "WHAT NEEDS ATTENTION", variant: "attention", items: ["Cash flow pressure is distorting day-to-day decision-making", "Late-paying clients are creating avoidable strain on the whole business", "Vehicle downtime is reducing utilisation and disrupting service", "Too much of the operation still depends on Sibusiso personally"] } },
    { type: "message", content: "These issues all point to a business that has work, but not enough cash and operating slack to carry that work comfortably.\n\nDoes that match what it feels like on your side?" },
    { type: "wait-for-user", userResponse: "Yes, exactly. The work is there, but the pressure sits in the gaps between doing the job and getting paid." },
    { type: "card", card: { title: "FINANCIAL INSIGHTS", variant: "financial", items: [], metrics: [{ label: "Working capital pressure", value: "High", detail: "fuel, wages, and maintenance are paid well before client receipts land" }, { label: "Debtor cycle", value: "45–60 days", detail: "some key clients are stretching beyond agreed terms" }, { label: "Fleet utilisation", value: "Moderate", detail: "affected by downtime, scheduling gaps, and reactive maintenance" }, { label: "Revenue concentration", value: "Moderate to high", detail: "top 3 accounts drive a significant share of monthly income" }, { label: "Record integration", value: "Partial", detail: "financial, delivery, and running-cost data are not yet fully linked" }] } },
    { type: "message", content: "Financially, the business looks viable, but the operating cycle is putting heavy strain on cash. You are effectively funding the service upfront while waiting too long for parts of the debtor book to convert." },
    { type: "message", content: "The biggest tension is that more work does not automatically make the business more comfortable. Without stronger working capital and better fleet control, growth can actually increase the stress." },
    { type: "message", content: "Does it feel like the business is busy and earning, but still regularly squeezed for cash?" },
    { type: "wait-for-user", userResponse: "Yes, all the time." },
    { type: "card", card: { title: "GROWTH OPPORTUNITIES", variant: "opportunities", items: ["Improve cash stability through structured working capital support", "Increase margin by tightening route planning and fleet utilisation", "Strengthen client mix toward better-paying, more predictable accounts", "Build a stronger operating layer so daily issues do not always escalate to the owner"] } },
    { type: "message", content: "The opportunities here are practical. This is not about trying to double the fleet overnight. It is about making the existing operation more cash-stable and commercially stronger.\n\nWhich of these feels most realistic right now?" },
    { type: "wait-for-user", userResponse: "Working capital first, then getting the fleet running more cleanly." },
    { type: "card", card: { title: "THINGS TO WATCH", variant: "watch", items: ["Fuel and tyre cost inflation can quickly erode margin", "Vehicle downtime can damage both profitability and client confidence", "Client concentration increases exposure if one major account slows or pays late", "Growth without stronger systems can increase pressure instead of reducing it"] } },
    { type: "message", content: "Not all of these hit at the same time, but the biggest one is probably the mix of late payments and vehicle downtime.\n\nAre you already feeling that combination pretty hard?" },
    { type: "wait-for-user", userResponse: "Yes. If one truck is down and one client delays, it's a bad month." },
    { type: "card", card: { title: "CURRENT GROWTH BOTTLENECKS", variant: "bottlenecks", items: ["Working capital gap between delivery and payment", "Fleet downtime and reactive maintenance", "Client payment discipline", "High founder dependence in daily operations"] } },
    { type: "message", content: "These bottlenecks are linked. If you could tackle just one first, which one would unlock the most progress for the business?" },
    { type: "wait-for-user", userResponse: "Working capital. That's the thing that gives us breathing room." },
    { type: "message", content: "I've saved these findings in your Business Insights section so you can review them properly.\n\nWhat the analysis shows is that the business already has commercial traction and growth potential, but the next phase depends on closing the working capital gap, improving fleet reliability, and making the operation less reactive. That gives us a strong base for building a practical growth plan." },
  ],

  initiatives: [
    {
      id: "d-init-1", number: 1,
      title: "Stabilise working capital and cash planning",
      description: "The business is operationally viable, but cash pressure is limiting its ability to run comfortably and grow with confidence. Creating better visibility and preparing for a structured working capital solution will reduce month-to-month strain and support more stable execution.",
      actions: [
        { id: "d-a1-1", task: "Build a 12-week cash flow forecast linked to expected client payments and major cost outflows", owner: "Sibusiso + Admin", timeline: "16 April 2026", status: "Not started", support: { label: "Cash flow planning template", link: "/training" } },
        { id: "d-a1-2", task: "Map the payment cycle of top 8 clients and flag regular late-payers", owner: "Admin", timeline: "30 April 2026", status: "Not started", support: { label: "Debtor tracking sheet", link: "/training" } },
        { id: "d-a1-3", task: "Prepare working capital pack for finance discussion using invoices, statements, and cash flow needs", owner: "Sibusiso", timeline: "15 May 2026", status: "Planned", support: { label: "Funding readiness checklist", link: "/funding" } },
      ],
    },
    {
      id: "d-init-2", number: 2,
      title: "Improve fleet utilisation and maintenance control",
      description: "Better fleet reliability is essential because vehicle downtime turns into missed revenue, higher repair costs, and client frustration. The business does not only need more work — it needs the existing fleet to run more predictably and productively.",
      actions: [
        { id: "d-a2-1", task: "Create a weekly fleet status tracker covering availability, maintenance needs, and route assignment", owner: "Fleet coordinator", timeline: "22 April 2026", status: "Not started", support: { label: "Fleet utilisation tracker", link: "/training" } },
        { id: "d-a2-2", task: "Introduce a preventative maintenance calendar for all active vehicles", owner: "Fleet coordinator + Sibusiso", timeline: "06 May 2026", status: "Not started", support: { label: "Vehicle maintenance planner", link: "/training" } },
        { id: "d-a2-3", task: "Review the last 90 days of breakdowns and identify the top repeat causes of downtime", owner: "Sibusiso", timeline: "20 May 2026", status: "Planned", support: { label: "Downtime review checklist", link: "/training" } },
      ],
    },
    {
      id: "d-init-3", number: 3,
      title: "Improve client quality and payment discipline",
      description: "The business has good repeat clients, but not all accounts support healthy cash flow. Improving payment behaviour, account quality, and commercial terms will make growth more sustainable and reduce the pressure created by slow debtors.",
      actions: [
        { id: "d-a3-1", task: "Rank top clients by revenue, payment days, and route profitability", owner: "Sibusiso + Admin", timeline: "29 April 2026", status: "Not started", support: { label: "Client quality scorecard", link: "/training" } },
        { id: "d-a3-2", task: "Introduce revised payment follow-up routines for overdue accounts", owner: "Admin", timeline: "13 May 2026", status: "Not started", support: { label: "Collections workflow", link: "/training" } },
        { id: "d-a3-3", task: "Negotiate improved payment terms with 3 strategic accounts where possible", owner: "Sibusiso", timeline: "30 May 2026", status: "Planned", support: { label: "Client terms discussion guide", link: "/training" } },
      ],
    },
    {
      id: "d-init-4", number: 4,
      title: "Reduce founder dependence in daily operations",
      description: "Sibusiso is still carrying too much of the day-to-day load, especially around client issues, vehicle problems, and operational exceptions. Building clearer routines and stronger delegation will reduce stress and improve consistency as the business grows.",
      actions: [
        { id: "d-a4-1", task: "Define daily responsibility split between owner, fleet coordinator, and admin", owner: "Sibusiso", timeline: "07 May 2026", status: "Not started", support: { label: "Operations role matrix", link: "/training" } },
        { id: "d-a4-2", task: "Introduce a daily fleet and delivery check-in process that does not rely on owner intervention", owner: "Fleet coordinator", timeline: "21 May 2026", status: "Not started", support: { label: "Daily dispatch checklist", link: "/training" } },
        { id: "d-a4-3", task: "Run a 4-week trial where selected operational issues are resolved without escalating to owner first", owner: "Sibusiso + Fleet coordinator", timeline: "06 June 2026", status: "Planned", support: { label: "Escalation protocol guide", link: "/training" } },
      ],
    },
  ],

  gpStepScripts: [
    { messages: ["Based on everything we've discussed, I'd like to start by defining the main growth focus for your business.", "The analysis shows that the business has real demand and a base of contract revenue, but growth is being limited by the gap between when you deliver the work and when the cash actually comes back in, together with fleet reliability pressure.", "There is also a clear opportunity to improve commercial quality and grow more confidently if the operation becomes more cash-stable and less reactive.", "Based on this, the core focus I see is:\n\nStrengthen cash flow, fleet reliability, and operating control so Dlamini Fleet Services can grow contract revenue without constant working capital pressure."], question: "Does this feel like the right focus for the next phase of the business?", userResponse: "Yes, definitely. That's exactly where the pressure is." },
    { messages: ["The first priority is stabilising working capital, because that is the pressure point underneath almost everything else. You said yourself that the work is there, but the cash gap between delivery and payment is what keeps squeezing the business."], question: "Does this capture the problem properly, or would you change anything?", userResponse: "No, this is right." },
    { messages: ["The second priority is improving fleet reliability and utilisation. If the vehicles run more predictably, the business can service existing work better and reduce some of the pressure that comes from reactive breakdowns."], question: "Does this match what you experience operationally?", userResponse: "Yes. When the fleet is stable, the whole business feels different." },
    { messages: ["The third priority is improving the quality of client revenue, especially around payment behaviour and account terms. That gives you a chance to grow from a stronger base, not just from more work."], question: "Does this growth lever make sense for where the business is now?", userResponse: "Yes, it does. Better-paying work is a lot more useful than just more work." },
    { messages: ["The fourth priority is reducing how much daily pressure comes back to you. That shift is important because the business will struggle to scale properly if every issue still lands on your shoulders."], question: "Does this feel like a realistic next step?", userResponse: "Yes. It's needed, even if it's not the easiest change." },
  ],
};

// ─── EXPORT ───────────────────────────────────────────────────────────────────

export const SCENARIO_CONTENT: Partial<Record<string, ScenarioContent>> = {
  masakhane: masakhaneContent,
  henderson: hendersonContent,
  dlamini: dlaminiContent,
};

export function getScenarioContent(scenarioId: string | null): ScenarioContent {
  if (scenarioId && SCENARIO_CONTENT[scenarioId]) {
    return SCENARIO_CONTENT[scenarioId]!;
  }
  return masakhaneContent;
}
