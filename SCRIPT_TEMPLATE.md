# ALLYRA COMPLETE SCRIPT TEMPLATE

This document contains the exact script and flow for the Allyra conversation experience. Use this to create custom business scenarios.

---

## ONBOARDING DATA
```
User First Name: [e.g., "Sarah"]
User Last Name: [e.g., "Johnson"]
User Email: [e.g., "sarah@example.com"]
Business Name: [e.g., "Artisan Dried Fruit Co"]
```

---

## PHASE 1: WELCOME MESSAGE
**Location:** `/src/app/components/chat-workspace.tsx` - `getWelcomeText()`

**Script:**
```
Hi [FirstName], I'm Allyra. It's great to meet you.

Welcome to your Growth Control Room.

This is where we'll work together to understand your business, uncover real growth opportunities, and build a practical plan to move your business forward.

Before we get started, let me quickly show you around so you know where everything lives.
```

**Timing:** Types out character by character at 22ms per character
**Action:** After completion → 2-second pause → Tour starts

---

## PHASE 2: GUIDED TOUR
**Location:** `/src/app/components/intro-tour.tsx`

**Tour Steps (7 spotlights):**
1. Your Journey - Track where you are in the growth process
2. Business Insights - See key patterns about your business
3. Market Intelligence - Monitor trends affecting your industry
4. Growth Plan - Your live action plan
5. Training & Resources - Tools to support execution
6. Funding Opportunities - Capital options
7. Our Workspace - Where conversations happen

**Action:** User clicks through → Tour complete → Post-tour message

---

## PHASE 3: POST-TOUR MESSAGE
**Location:** `/src/app/components/chat-workspace.tsx` - `POST_TOUR_TEXT`

**Script:**
```
Alright — that's the quick tour.

Now let's start with forming an understanding of your business.
```

**Timing:** Types out at 22ms per character
**Action:** After completion → 1.5 second pause → Discovery questions begin

---

## PHASE 4: BUSINESS DISCOVERY (5 Questions)
**Location:** `/src/app/components/chat-workspace.tsx` - `CONVERSATION_SCRIPT`

### Question 1 (conversationStep = 0)
```
Tell me a little about your business. What do you produce or offer, and who usually buys from you?
```

**USER RESPONSE EXAMPLE:**
```
[Your scripted answer here - e.g., "We produce artisan dried fruit snacks using locally sourced fruit. Our customers are mainly regional farm stalls, boutique retailers, and tourism businesses like lodges and restaurants."]
```

---

### Question 2 (conversationStep = 1)
```
How did the business get started, and how long have you been running it now?
```

**USER RESPONSE EXAMPLE:**
```
[Your scripted answer here]
```

---

### Question 3 (conversationStep = 2)
```
How does the business typically make money today? For example through product sales, wholesale orders, contracts, or something else.
```

**USER RESPONSE EXAMPLE:**
```
[Your scripted answer here]
```

---

### Question 4 (conversationStep = 3)
```
Roughly how big is the business at the moment? For example the size of your team or how busy operations are.
```

**USER RESPONSE EXAMPLE:**
```
[Your scripted answer here]
```

---

### Question 5 (conversationStep = 4)
```
If you could fix one thing in the business that would unlock growth faster, what would it be?
```

**USER RESPONSE EXAMPLE:**
```
[Your scripted answer here]
```

---

## PHASE 5: DOCUMENT REQUEST (conversationStep = 5)
**Location:** `/src/app/components/chat-workspace.tsx` - `CONVERSATION_SCRIPT[5]` and `[6]`

### Message 1
```
Great — that gives me a good starting picture of your business.

To go deeper and generate meaningful insights, I'll also review some documents and run market research.
```

### Message 2
```
Could you please upload any of the following if you have them available?

• Recent bank statements
• Financial statements or management accounts
• Major sales contracts or offtake agreements
• Any strategy or business planning documents

Don't worry if you don't have all of them — anything you can share will help.
```

**Action:** Document upload UI appears → User uploads → Analysis begins

---

## PHASE 6: ANALYSIS (7 Steps × 3 seconds each = ~21 seconds)
**Location:** `/src/app/components/analysis-status.tsx` - `ANALYSIS_STEPS`

**Analysis Steps:**
1. "Reviewing uploaded documents"
2. "Running financial analysis"
3. "Researching your market"
4. "Analysing sector trends"
5. "Reviewing competitor signals"
6. "Generating preliminary growth signals"
7. "Compiling insights"

**Timing:** Each step shows a spinner for 3 seconds, then ticks off with a checkmark
**Action:** After step 7 completes → 800ms pause → Insights delivery begins

---

## PHASE 7: GROWTH INSIGHTS DELIVERY (6 Cards)
**Location:** `/src/app/components/chat-workspace.tsx` - `GROWTH_INSIGHTS_SCRIPT`

### Intro Message
```
I've finished reviewing your documents and analysing the market around your business.

A few clear patterns are emerging.

Some things in your business are working well, there are a few areas creating pressure, and there are also clear opportunities for growth.

Let me walk you through what I found.
```

---

### CARD 1: WHAT'S WORKING (Green)
**Variant:** `"working"`

**Items:**
- Strong demand for natural snack products in retail and tourism markets
- Good relationships with local fruit farmers securing reliable supply
- Established distribution through farm stalls, regional retailers and hospitality businesses
- Product category aligned with growing consumer demand for healthy snacks

**Follow-up Message:**
```
Overall, the foundations of the business look strong and the category you operate in is growing.

From your perspective, which of these strengths has helped the business the most so far?
```

**[WAIT FOR USER RESPONSE]**

**USER RESPONSE EXAMPLE:**
```
[Your scripted answer here]
```

---

### CARD 2: WHAT NEEDS ATTENTION (Amber)
**Variant:** `"attention"`

**Items:**
- Processing capacity limiting how much product you can supply
- Working capital pressure during harvest season
- Limited marketing capacity to expand retail distribution
- Founder time heavily absorbed in day to day operations

**Follow-up Message:**
```
These areas appear to be the main factors currently slowing growth.

Does this reflect what you experience running the business day to day?
```

**[WAIT FOR USER RESPONSE]**

**USER RESPONSE EXAMPLE:**
```
[Your scripted answer here]
```

---

### CARD 3: GROWTH OPPORTUNITIES (Blue)
**Variant:** `"opportunities"`

**Items:**
- Expanding distribution into regional retail chains
- Increasing sales into hospitality and tourism channels
- Developing higher margin product variations
- Potential niche export demand for natural snack products

**Follow-up Message:**
```
Based on what I can see, there are several promising growth paths available.

Which of these opportunities feels most exciting or realistic for you right now?
```

**[WAIT FOR USER RESPONSE]**

**USER RESPONSE EXAMPLE:**
```
[Your scripted answer here]
```

---

### CARD 4: THINGS TO WATCH (Orange)
**Variant:** `"watch"`

**Items:**
- Larger snack brands entering the natural snack category
- Seasonal fruit supply variability
- Rising packaging and logistics costs
- Retail buyers pushing for higher volumes and tighter pricing

**Follow-up Message:**
```
These aren't immediate problems, but they are trends worth keeping an eye on as you grow.

Have you already started seeing any of these pressures in the market?
```

**[WAIT FOR USER RESPONSE]**

**USER RESPONSE EXAMPLE:**
```
[Your scripted answer here]
```

---

### CARD 5: FINANCIAL INSIGHTS (Purple)
**Variant:** `"financial"`

**Metrics (not items - uses different layout):**
- **Revenue concentration:** 62% | "from top 3 buyers"
- **Seasonal cash pressure:** High | "during fruit purchasing months"
- **Working capital cycle:** 75–90 days | "purchase to payment"
- **Gross margin estimate:** 28–32% | "depending on product mix"
- **Margin improvement potential:** Moderate | "via premium variations"

**Follow-up Messages:**

**Message 1:**
```
Your financial information reveals a few important patterns.

The business appears to have strong demand, but your operating cycle is quite tight. A significant portion of revenue comes from a small group of repeat buyers, which is positive but also creates some dependency.

Cash flow also appears to tighten during fruit purchasing season when you need to buy raw product before it is sold.
```

**Message 2:**
```
Does this match what you experience during the year?

For example, are there specific months where cash flow becomes more difficult even though demand is strong?
```

**[WAIT FOR USER RESPONSE]**

**USER RESPONSE EXAMPLE:**
```
[Your scripted answer here]
```

**Message 3:**
```
Another interesting pattern is that your margins could likely improve with slightly higher value product variations such as premium snack packs or bundled products for hospitality and tourism markets.
```

**Message 4:**
```
Have you experimented with higher value packaging or premium product variations before?
```

**[WAIT FOR USER RESPONSE]**

**USER RESPONSE EXAMPLE:**
```
[Your scripted answer here]
```

---

### CARD 6: CURRENT GROWTH BOTTLENECKS (Red)
**Variant:** `"bottlenecks"`

**Items:**
- Processing capacity
- Working capital during harvest season
- Limited marketing reach
- Founder capacity

**Follow-up Message:**
```
Looking across everything we've discussed so far, these appear to be the main constraints limiting growth right now.

If we solved just one of these first, it would likely unlock the most progress.

Which of these feels most urgent to tackle?
```

**[WAIT FOR USER RESPONSE]**

**USER RESPONSE EXAMPLE:**
```
[Your scripted answer here]
```

---

### Insights Conclusion
```
Great.

I've captured all of these findings in your Business Insights section so you can explore them in more detail.

You can now open the Business Insights panel from the menu to review everything we've discussed.

From there we can start turning these insights into a practical growth plan.
```

**Action:** conversationStep becomes 20 → Growth plan build auto-triggers

---

## PHASE 8: GROWTH PLAN BUILD SEQUENCE
**Location:** `/src/app/pages/control-room.tsx` - `GP_STEP_SCRIPTS` and `INITIATIVES`

### Step 0: Growth Focus Definition

**Message 1:**
```
Based on everything we've discussed, I'd like to start by defining the main growth focus for your business.
```

**Message 2:**
```
From the analysis it appears that demand for your dried fruit products is strong, but growth is currently constrained by processing capacity and seasonal working capital.
```

**Message 3:**
```
I also see a clear opportunity to expand your retail and tourism distribution.
```

**Message 4:**
```
Based on this, the core focus I see is:

Expand retail distribution while increasing fruit drying capacity to support growing demand.
```

**Question:**
```
Does this feel like the right focus for the next phase of your business?
```

**[WAIT FOR USER CONFIRMATION]**

**USER RESPONSE EXAMPLE:**
```
[Your scripted answer - e.g., "Yes, that captures it well."]
```

**Action:** growthPlanStep becomes 1 → "Growth Focus" card appears in canvas

---

### Step 1: Initiative 01 - Increase fruit drying capacity

**Message:**
```
The first priority is addressing the processing capacity constraint we identified.
```

**Action:** Initiative 01 card appears in Growth Plan Canvas (right panel)

**Initiative 01 Details:**
```
NUMBER: 01
TITLE: Increase fruit drying capacity

DESCRIPTION:
Demand for dried fruit snacks is strong, but current drying capacity limits how much fruit can be processed during peak harvest periods.

ACTIONS:
1. Assess additional fruit drying equipment options
   Owner: Operations Manager
   Timeline: 30 April 2026
   Status: Not started
   Support: "Equipment financing options" → link to /funding

2. Cost equipment and installation
   Owner: Founder + Operations Manager
   Timeline: 15 May 2026
   Status: Not started

3. Secure equipment financing or lease option
   Owner: Founder
   Timeline: 15 June 2026
   Status: Planned
   Support: "Equipment financing options" → link to /funding
```

**Question:**
```
Does this capture the production constraint we discussed?

Would you adjust anything here?
```

**[Brief pause - auto-advances without waiting for user]**

**Action:** growthPlanStep becomes 2

---

### Step 2: Initiative 02 - Strengthen seasonal working capital

**Message:**
```
The second constraint affecting growth is seasonal working capital during fruit purchasing season.
```

**Action:** Initiative 02 card appears in Growth Plan Canvas

**Initiative 02 Details:**
```
NUMBER: 02
TITLE: Strengthen seasonal working capital

DESCRIPTION:
Fruit purchasing during harvest season creates cash pressure before finished products are sold.

ACTIONS:
1. Map seasonal fruit purchasing and cash flow cycle
   Owner: Founder
   Timeline: 15 April 2026
   Status: Not started
   Support: "Cash flow planning worksheet" → link to /training

2. Prepare financial documentation for financing
   Owner: Founder
   Timeline: 30 April 2026
   Status: Not started

3. Explore working capital financing options
   Owner: Founder
   Timeline: 31 May 2026
   Status: Planned
   Support: "Working capital options" → link to /funding
```

**[Brief pause - auto-advances]**

**Action:** growthPlanStep becomes 3

---

### Step 3: Initiative 03 - Expand retail and tourism distribution

**Message:**
```
The third opportunity we identified is expanding retail and tourism distribution.
```

**Action:** Initiative 03 card appears in Growth Plan Canvas

**Initiative 03 Details:**
```
NUMBER: 03
TITLE: Expand retail and tourism distribution

DESCRIPTION:
Demand for natural snack products is increasing in regional retail stores and tourism outlets.

ACTIONS:
1. Identify regional retail buyers and tourism distributors
   Owner: Founder
   Timeline: 30 April 2026
   Status: Not started
   Support: "Retail buyer outreach template" → link to /training

2. Develop retail-ready packaging format
   Owner: Operations Manager
   Timeline: 31 May 2026
   Status: Not started

3. Secure first regional retail listing
   Owner: Founder
   Timeline: 31 July 2026
   Status: Planned
```

**[Brief pause - auto-advances]**

**Action:** growthPlanStep becomes 4

---

### Step 4: Initiative 04 - Develop premium snack product variations

**Message:**
```
The financial analysis also showed potential to improve margins through premium product variations.
```

**Action:** Initiative 04 card appears in Growth Plan Canvas

**Initiative 04 Details:**
```
NUMBER: 04
TITLE: Develop premium snack product variations

DESCRIPTION:
The financial analysis shows potential to improve margins through premium product variations targeting tourism and hospitality markets.

ACTIONS:
1. Design premium snack pack format
   Owner: Founder
   Timeline: 31 May 2026
   Status: Not started

2. Test pricing with tourism outlets
   Owner: Founder
   Timeline: 30 June 2026
   Status: Not started

3. Launch premium product variation
   Owner: Operations Manager
   Timeline: 31 August 2026
   Status: Planned
```

**[2-second pause - auto-advances to conclusion]**

**Action:** growthPlanStep becomes 5

---

## PHASE 9: CONCLUSION

**Message 1:**
```
I've also identified training resources and potential funding options that can help you execute this plan.
```

**[2-second pause]**

**Message 2:**
```
You'll now find relevant information in the Training and Funding sections.

Your growth plan is now live — you can update action statuses, add new actions, and track your progress as you go.
```

**Actions:**
- conversationStep becomes 30
- growthPlanStep becomes 6
- journeyStage becomes 5
- Training navigation badge lights up
- Funding navigation badge lights up
- Initiatives 02-04 automatically collapse in canvas
- Journey tracker shows "Grow Your Business" with pulsing arrow

---

## SUPPORTING CONTENT TO CUSTOMIZE

### Business Insights Page
**Location:** `/src/app/pages/business-insights.tsx`

Should mirror the 6 insight cards from Phase 7.

---

### Market Intelligence Page
**Location:** `/src/app/pages/market-intelligence.tsx`

**Current Content:**
- Industry trends section
- Competitive landscape
- Customer behavior patterns
- Market opportunity sizing
- Regulatory environment

**Customize with:** Market data specific to your business scenario's industry

---

### Training & Resources Page
**Location:** `/src/app/pages/training.tsx`

**Current Content (gated - only shows after growthPlanStep >= 6):**

**Courses:**
1. Financial Planning for Growth
   - Duration: 2 hours
   - Level: Intermediate
   - Status: Recommended
   - Description: Learn to forecast cash flow, build financial models, and make data-driven decisions

2. Scaling Operations
   - Duration: 90 minutes
   - Level: Beginner
   - Status: In Progress (45% complete)
   - Description: Practical frameworks for increasing production capacity while maintaining quality

3. Strategic Marketing for SMEs
   - Duration: 3 hours
   - Level: Intermediate
   - Status: New
   - Description: Build a marketing strategy that drives measurable growth

**Templates:**
- Cash Flow Planning Worksheet
- Retail Buyer Outreach Template
- Product Launch Checklist
- Sales Forecast Model

**Customize with:** Training relevant to your scenario's initiatives

---

### Funding Opportunities Page
**Location:** `/src/app/pages/funding.tsx`

**Current Content (gated - only shows after growthPlanStep >= 6):**

**Active Opportunities:**
1. SEDA Equipment Finance Programme
   - Amount: R50,000 - R500,000
   - Type: Equipment Finance
   - Sector: Manufacturing & Agro-processing
   - Status: Applications Open
   - Deadline: 30 June 2026

2. Working Capital Facility
   - Amount: Up to R250,000
   - Type: Working Capital
   - Sector: All sectors
   - Status: Available
   - Deadline: Rolling applications

3. Business Partners Limited - Growth Fund
   - Amount: R500,000 - R50M
   - Type: Equity + Debt
   - Sector: All sectors
   - Status: Applications Open
   - Deadline: Ongoing

**Customize with:** Funding options relevant to your scenario's needs

---

## CARD VARIANTS & COLORS

**Available Card Variants:**
- `"working"` - Green accent (#2d6a4f)
- `"attention"` - Amber accent (#d97706)
- `"opportunities"` - Blue accent (#0284c7)
- `"watch"` - Orange accent (#ea580c)
- `"financial"` - Purple accent (#7c3aed)
- `"bottlenecks"` - Red accent (#dc2626)

---

## TIMING REFERENCE

- **Typewriter speed:** 22ms per character
- **Tour pause:** 2 seconds after welcome message
- **Post-tour pause:** 1.5 seconds before first question
- **Analysis steps:** 3 seconds each (7 total = ~21 seconds)
- **Growth plan auto-advance:** Brief pauses between initiatives
- **Conclusion pause:** 2 seconds between final messages

---

## FILES TO EDIT FOR CUSTOM SCENARIOS

1. `/src/app/components/chat-workspace.tsx` - Discovery questions, insights script
2. `/src/app/components/analysis-status.tsx` - Analysis step labels
3. `/src/app/pages/control-room.tsx` - Growth plan messages and initiatives
4. `/src/app/pages/business-insights.tsx` - Insight cards display
5. `/src/app/pages/market-intelligence.tsx` - Market data
6. `/src/app/pages/training.tsx` - Courses and templates
7. `/src/app/pages/funding.tsx` - Funding opportunities

---

## NOTES

- All user responses during insights delivery are **wait-for-user** points
- Growth plan build sequence **auto-triggers** when conversationStep reaches 20
- Only the first initiative (Growth Focus confirmation) waits for user response
- Initiatives 01-04 auto-advance with brief pauses
- Training/Funding pages only populate after growthPlanStep >= 6
- Journey tracker collapses stages dynamically as user progresses
