# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install      # Install dependencies
npm run dev      # Start dev server (Vite, hot reload)
npm run build    # Production build
```

There are no test commands or linting scripts configured in this project.

## Architecture Overview

**Allyra** is a React + TypeScript SPA delivering an automated business-growth consulting experience for SMEs. It has two distinct user interfaces sharing the same codebase:

1. **SME Shell** — A conversational "Control Room" where an AI assistant (Allyra) walks a small business owner through a scripted discovery, analysis, and growth-planning journey.
2. **DFI Layout** — A portfolio analytics dashboard for Development Finance Institutions to track and manage their SME clients.

### State Management

All conversation/journey state lives in `src/app/components/chat-context.tsx` (React Context + `useReducer`). State is persisted to `sessionStorage`. Key state includes:

- `conversationStep` (0–30+) — tracks where in the automated script execution is
- `journeyStage` (0–5) — coarse-grained stage shown in the left sidebar
- `growthPlanStep` — tracks which growth plan initiative is being built
- Document upload state, analysis phase, insight delivery flags

### Automated Flow

The entire SME experience is scripted and self-running. The flow in `chat-workspace.tsx` advances through phases automatically using `setTimeout` chains:

1. Welcome → Guided Tour (7 spotlights via `intro-tour.tsx`)
2. Discovery conversation (8 scripted Q&A turns)
3. Auto document upload → Analysis (7 steps, ~21s)
4. Insight card delivery (6 cards)
5. Growth plan build (4 initiatives × 3 actions each)
6. Conclusion & badge activation

All scenario-specific content (scripts, business profile, initiatives, insight cards) is data-driven and lives in `src/app/data/scenario-content.ts`. New scenarios can be added by following `SCRIPT_TEMPLATE.md`.

### Routing

Defined in `src/app/routes.tsx` using React Router v7. Two layout branches:

- `/` → `ScenarioLanding` (scenario picker)
- `/app/*` → `Shell` layout (SME experience: control-room, business-insights, market-intelligence, training, funding, documents, settings)
- `/dfi/*` → `DfiLayout` (portfolio dashboard: dfi-dashboard, sme-portfolio, readiness-risk, technical-assistance, funding-pathways, impact-inclusion, reports, dfi-settings)

### Key Files

| File | Purpose |
|---|---|
| `src/app/components/chat-context.tsx` | Global state provider — read this first |
| `src/app/components/chat-workspace.tsx` | Core conversation UI and automation engine (~26KB) |
| `src/app/components/growth-plan-canvas.tsx` | Drag-and-drop growth plan editor (~23KB) |
| `src/app/data/scenario-content.ts` | All scripted content for the Masakhane demo scenario |
| `src/app/pages/control-room.tsx` | Main page composing the tour, chat, and growth plan |
| `src/app/pages/dfi-dashboard.tsx` | DFI analytics dashboard (~825 lines) |
| `IMPLEMENTATION_COMPLETE.md` | Full narrative of the automation flow with timing details |
| `SCRIPT_TEMPLATE.md` | Guide for adding new business scenarios |

### UI Components

`src/app/components/ui/` contains ~50 shadcn/ui-style components built on Radix UI primitives. Use these existing components rather than introducing new component libraries.

### Styling

Tailwind CSS v4 (configured via `@tailwindcss/vite` plugin — no `tailwind.config.js`). Custom theme tokens are in `src/styles/theme.css`. The PostCSS config is minimal; Tailwind v4 handles its own processing.
