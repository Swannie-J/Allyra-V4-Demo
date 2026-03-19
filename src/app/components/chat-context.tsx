import { createContext, useContext, useState, useCallback, useRef } from "react";
import type { InsightCardData } from "./insight-card";

export type ChatPhase = "scenario-select" | "welcome-typing" | "waiting-for-tour" | "touring" | "post-tour-typing" | "ready";

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  businessName: string;
}

export interface BusinessProfile {
  name: string;
  sector: string;
  stage: string;
  employees: string;
  revenue: string;
}

export interface GrowthPlanAction {
  id: string;
  task: string;
  owner: string;
  timeline: string;
  status: "Not started" | "In progress" | "Done" | "Planned";
  support?: { label: string; link: string };
}

export interface GrowthPlanInitiative {
  id: string;
  number: number;
  title: string;
  description: string;
  actions: GrowthPlanAction[];
}

export interface ChatMessage {
  id: string;
  type: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  isAnalysis?: boolean;
  insightCard?: InsightCardData;
}

export type ScenarioId = "masakhane" | "henderson" | "dlamini" | "vukani" | "indalo" | "sizwe";

interface ChatContextValue {
  phase: ChatPhase;
  setPhase: (phase: ChatPhase) => void;
  selectedScenario: ScenarioId | null;
  setSelectedScenario: (scenario: ScenarioId) => void;
  messages: ChatMessage[];
  addMessage: (msg: ChatMessage) => void;
  tourCompleted: boolean;
  markTourCompleted: () => void;
  resetTourState: () => void;
  journeyStage: number;
  setJourneyStage: (stage: number) => void;
  conversationStep: number;
  setConversationStep: (step: number) => void;
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  businessProfile: BusinessProfile | null;
  setBusinessProfile: (profile: BusinessProfile) => void;
  growthPlanActive: boolean;
  setGrowthPlanActive: (active: boolean) => void;
  growthPlanStep: number;
  setGrowthPlanStep: (step: number) => void;
  growthPlanInitiatives: GrowthPlanInitiative[];
  setGrowthPlanInitiatives: (initiatives: GrowthPlanInitiative[]) => void;
  updateActionStatus: (initiativeId: string, actionId: string, status: GrowthPlanAction["status"]) => void;
  addActionToInitiative: (initiativeId: string, action: GrowthPlanAction) => void;
  growthPlanWaiting: boolean;
  setGrowthPlanWaiting: (waiting: boolean) => void;
  navBadges: Record<string, boolean>;
  setNavBadge: (key: string, value: boolean) => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

const PHASE_ORDER: ChatPhase[] = [
  "scenario-select",
  "welcome-typing",
  "waiting-for-tour",
  "touring",
  "post-tour-typing",
  "ready",
];

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioId | null>(null);
  
  const [phase, setPhaseState] = useState<ChatPhase>(() => {
    if (sessionStorage.getItem("allyra-tour-completed") === "true") {
      return "ready";
    }
    const savedPhase = sessionStorage.getItem("allyra-phase") as ChatPhase | null;
    if (savedPhase && PHASE_ORDER.includes(savedPhase)) {
      return savedPhase;
    }
    return "scenario-select";
  });

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [journeyStage, setJourneyStageState] = useState<number>(() => {
    const saved = sessionStorage.getItem("allyra-journey-stage");
    return saved ? parseInt(saved, 10) : 1;
  });
  const [conversationStep, setConversationStepState] = useState<number>(() => {
    const saved = sessionStorage.getItem("allyra-convo-step");
    return saved ? parseInt(saved, 10) : 0;
  });

  const tourCompletedRef = useRef(
    sessionStorage.getItem("allyra-tour-completed") === "true"
  );

  const setPhase = useCallback((newPhase: ChatPhase) => {
    setPhaseState((current) => {
      const currentIndex = PHASE_ORDER.indexOf(current);
      const newIndex = PHASE_ORDER.indexOf(newPhase);
      if (newIndex > currentIndex) {
        sessionStorage.setItem("allyra-phase", newPhase);
        return newPhase;
      }
      return current;
    });
  }, []);

  const addMessage = useCallback((msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  const markTourCompleted = useCallback(() => {
    tourCompletedRef.current = true;
    sessionStorage.setItem("allyra-tour-completed", "true");
  }, []);

  const resetTourState = useCallback(() => {
    // Reset all tour-related state and sessionStorage
    tourCompletedRef.current = false;
    sessionStorage.removeItem("allyra-tour-completed");
    sessionStorage.removeItem("allyra-phase");
    sessionStorage.removeItem("allyra-journey-stage");
    sessionStorage.removeItem("allyra-convo-step");
    sessionStorage.removeItem("allyra-user-profile");
    sessionStorage.removeItem("allyra-business-profile");
    sessionStorage.removeItem("allyra-growth-plan-active");
    sessionStorage.removeItem("allyra-growth-plan-step");
    sessionStorage.removeItem("allyra-growth-plan-initiatives");
    sessionStorage.removeItem("allyra-growth-plan-waiting");
    sessionStorage.removeItem("allyra-nav-badges");
    
    // Reset all state to initial values
    setPhaseState("scenario-select");
    setJourneyStageState(1);
    setConversationStepState(0);
    setMessages([]);
    setSelectedScenario(null);
    setUserProfileState(null);
    setBusinessProfileState(null);
    setGrowthPlanActiveState(false);
    setGrowthPlanStepState(0);
    setGrowthPlanInitiativesState([]);
    setGrowthPlanWaitingState(false);
    setNavBadgesState({});
  }, []);

  const setJourneyStage = useCallback((stage: number) => {
    setJourneyStageState(stage);
    sessionStorage.setItem("allyra-journey-stage", stage.toString());
  }, []);

  const setConversationStep = useCallback((step: number) => {
    setConversationStepState(step);
    sessionStorage.setItem("allyra-convo-step", step.toString());
  }, []);

  const [userProfile, setUserProfileState] = useState<UserProfile | null>(() => {
    const saved = sessionStorage.getItem("allyra-user-profile");
    if (saved) {
      try { return JSON.parse(saved); } catch { return null; }
    }
    return null;
  });

  const setUserProfile = useCallback((profile: UserProfile) => {
    setUserProfileState(profile);
    sessionStorage.setItem("allyra-user-profile", JSON.stringify(profile));
  }, []);

  const [businessProfile, setBusinessProfileState] = useState<BusinessProfile | null>(() => {
    const saved = sessionStorage.getItem("allyra-business-profile");
    if (saved) {
      try { return JSON.parse(saved); } catch { return null; }
    }
    return null;
  });

  const setBusinessProfile = useCallback((profile: BusinessProfile) => {
    setBusinessProfileState(profile);
    sessionStorage.setItem("allyra-business-profile", JSON.stringify(profile));
  }, []);

  const [growthPlanActive, setGrowthPlanActiveState] = useState<boolean>(() => {
    const saved = sessionStorage.getItem("allyra-growth-plan-active");
    return saved ? saved === "true" : false;
  });

  const setGrowthPlanActive = useCallback((active: boolean) => {
    setGrowthPlanActiveState(active);
    sessionStorage.setItem("allyra-growth-plan-active", active.toString());
  }, []);

  const [growthPlanStep, setGrowthPlanStepState] = useState<number>(() => {
    const saved = sessionStorage.getItem("allyra-growth-plan-step");
    return saved ? parseInt(saved, 10) : 0;
  });

  const setGrowthPlanStep = useCallback((step: number) => {
    setGrowthPlanStepState(step);
    sessionStorage.setItem("allyra-growth-plan-step", step.toString());
  }, []);

  const [growthPlanInitiatives, setGrowthPlanInitiativesState] = useState<GrowthPlanInitiative[]>(() => {
    const saved = sessionStorage.getItem("allyra-growth-plan-initiatives");
    if (saved) {
      try { return JSON.parse(saved); } catch { return []; }
    }
    return [];
  });

  const setGrowthPlanInitiatives = useCallback((initiatives: GrowthPlanInitiative[]) => {
    setGrowthPlanInitiativesState(initiatives);
    sessionStorage.setItem("allyra-growth-plan-initiatives", JSON.stringify(initiatives));
  }, []);

  const updateActionStatus = useCallback((initiativeId: string, actionId: string, status: GrowthPlanAction["status"]) => {
    setGrowthPlanInitiativesState((prev) => {
      const updatedInitiatives = prev.map((initiative) => {
        if (initiative.id === initiativeId) {
          return {
            ...initiative,
            actions: initiative.actions.map((action) => {
              if (action.id === actionId) {
                return {
                  ...action,
                  status,
                };
              }
              return action;
            }),
          };
        }
        return initiative;
      });
      sessionStorage.setItem("allyra-growth-plan-initiatives", JSON.stringify(updatedInitiatives));
      return updatedInitiatives;
    });
  }, []);

  const addActionToInitiative = useCallback((initiativeId: string, action: GrowthPlanAction) => {
    setGrowthPlanInitiativesState((prev) => {
      const updatedInitiatives = prev.map((initiative) => {
        if (initiative.id === initiativeId) {
          return {
            ...initiative,
            actions: [...initiative.actions, action],
          };
        }
        return initiative;
      });
      sessionStorage.setItem("allyra-growth-plan-initiatives", JSON.stringify(updatedInitiatives));
      return updatedInitiatives;
    });
  }, []);

  const [growthPlanWaiting, setGrowthPlanWaitingState] = useState<boolean>(() => {
    const saved = sessionStorage.getItem("allyra-growth-plan-waiting");
    return saved ? saved === "true" : false;
  });

  const setGrowthPlanWaiting = useCallback((waiting: boolean) => {
    setGrowthPlanWaitingState(waiting);
    sessionStorage.setItem("allyra-growth-plan-waiting", waiting.toString());
  }, []);

  const [navBadges, setNavBadgesState] = useState<Record<string, boolean>>(() => {
    const saved = sessionStorage.getItem("allyra-nav-badges");
    if (saved) {
      try { return JSON.parse(saved); } catch { return {}; }
    }
    return {};
  });

  const setNavBadge = useCallback((key: string, value: boolean) => {
    setNavBadgesState((prev) => {
      const updatedBadges = {
        ...prev,
        [key]: value,
      };
      sessionStorage.setItem("allyra-nav-badges", JSON.stringify(updatedBadges));
      return updatedBadges;
    });
  }, []);

  return (
    <ChatContext.Provider
      value={{
        phase,
        setPhase,
        selectedScenario,
        setSelectedScenario,
        messages,
        addMessage,
        tourCompleted: tourCompletedRef.current,
        markTourCompleted,
        resetTourState,
        journeyStage,
        setJourneyStage,
        conversationStep,
        setConversationStep,
        userProfile,
        setUserProfile,
        businessProfile,
        setBusinessProfile,
        growthPlanActive,
        setGrowthPlanActive,
        growthPlanStep,
        setGrowthPlanStep,
        growthPlanInitiatives,
        setGrowthPlanInitiatives,
        updateActionStatus,
        addActionToInitiative,
        growthPlanWaiting,
        setGrowthPlanWaiting,
        navBadges,
        setNavBadge,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatContext must be used within ChatProvider");
  return ctx;
}