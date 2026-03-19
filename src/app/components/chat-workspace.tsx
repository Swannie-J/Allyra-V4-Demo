import { Send, Paperclip, Mic } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { JourneyTracker } from "./journey-tracker";
import { DocumentUpload } from "./document-upload";
import { AnalysisStatus } from "./analysis-status";
import { InsightCard, type InsightCardData } from "./insight-card";
import { useChatContext, type ChatPhase, type ChatMessage } from "./chat-context";
import { getScenarioContent } from "../data/scenario-content";

interface DisplayMessage {
  id: string;
  type: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  isDocUpload?: boolean;
  isAnalysis?: boolean;
  insightCard?: InsightCardData;
}

interface ChatWorkspaceProps {
  phase: ChatPhase;
  onWelcomeTyped?: () => void;
  onPostTourTyped?: () => void;
  compactMode?: boolean;
}

function getWelcomeText(firstName?: string): string {
  const greeting = firstName ? `Hi ${firstName}, I'm Allyra.` : `Hi, I'm Allyra.`;
  return `${greeting} It's great to meet you.\n\nWelcome to your Growth Control Room.\n\nThis is where we'll work together to understand your business, uncover real growth opportunities, and build a practical plan to move your business forward.\n\nBefore we get started, let me quickly show you around so you know where everything lives.`;
}

const POST_TOUR_TEXT = `Alright — that's the quick tour.\n\nNow let's start with forming an understanding of your business.`;

function useTypewriter(
  text: string,
  isActive: boolean,
  onComplete?: () => void,
  speed = 22
) {
  const [displayed, setDisplayed] = useState("");
  const indexRef = useRef(0);
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!isActive) {
      completedRef.current = false;
      return;
    }
    if (completedRef.current) return;

    indexRef.current = 0;
    setDisplayed("");

    const interval = setInterval(() => {
      indexRef.current += 1;
      const nextIndex = indexRef.current;

      if (nextIndex >= text.length) {
        setDisplayed(text);
        clearInterval(interval);
        if (!completedRef.current) {
          completedRef.current = true;
          onCompleteRef.current?.();
        }
        return;
      }

      setDisplayed(text.slice(0, nextIndex));
    }, speed);

    return () => clearInterval(interval);
  }, [text, isActive, speed]);

  return displayed;
}

function TypingMessage({
  content,
  onComplete,
  speed = 18,
}: {
  content: string;
  onComplete?: () => void;
  speed?: number;
}) {
  const displayed = useTypewriter(content, true, onComplete, speed);

  return (
    <p className="text-[15px] leading-relaxed whitespace-pre-line">
      {displayed}
      <span className="inline-block w-0.5 h-[18px] bg-[var(--allyra-green)] ml-0.5 align-text-bottom animate-pulse" />
    </p>
  );
}

export function ChatWorkspace({
  phase,
  onWelcomeTyped,
  onPostTourTyped,
  compactMode,
}: ChatWorkspaceProps) {
  const {
    messages,
    addMessage,
    journeyStage,
    setJourneyStage,
    conversationStep,
    setConversationStep,
    setBusinessProfile,
    growthPlanWaiting,
    growthPlanActive,
    growthPlanStep,
    userProfile,
    selectedScenario,
  } = useChatContext();

  // Derive all scenario-specific content from selected scenario
  const scenarioContent = getScenarioContent(selectedScenario);
  const CONVERSATION_SCRIPT = scenarioContent.conversationScript;
  const GROWTH_INSIGHTS_SCRIPT = scenarioContent.growthInsightsScript;

  // Calculate user initials
  const userInitials = userProfile
    ? `${userProfile.firstName.charAt(0)}${userProfile.lastName.charAt(0)}`.toUpperCase()
    : "TM";

  const [input, setInput] = useState("");
  const [isAllyraTyping, setIsAllyraTyping] = useState(false);
  const [typingMessageContent, setTypingMessageContent] = useState<string | null>(null);
  const [showDocUpload, setShowDocUpload] = useState(false);
  const [analysisRunning, setAnalysisRunning] = useState(false);
  const [insightIndex, setInsightIndex] = useState(-1);
  const [waitingForInsightReply, setWaitingForInsightReply] = useState(false);
  const insightDeliveryRef = useRef(false);
  const advanceInsightRef = useRef<(nextIndex: number) => void>(() => {});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasStartedConvoRef = useRef(false);

  const isWelcomeTyping = phase === "welcome-typing";
  const isPostTourTyping = phase === "post-tour-typing";

  const welcomeText = getWelcomeText(userProfile?.firstName);
  const welcomeDisplayed = useTypewriter(welcomeText, isWelcomeTyping, onWelcomeTyped, 22);
  const postTourDisplayed = useTypewriter(POST_TOUR_TEXT, isPostTourTyping, onPostTourTyped, 22);

  // Build visible messages based on phase
  const systemMessages: DisplayMessage[] = [];

  if (phase === "welcome-typing" || phase === "waiting-for-tour" || phase === "touring") {
    const content = phase === "welcome-typing" ? welcomeDisplayed : welcomeText;
    if (content) {
      systemMessages.push({
        id: "welcome",
        type: "assistant",
        content,
        timestamp: new Date(2026, 2, 7, 10, 30),
        isTyping: phase === "welcome-typing",
      });
    }
  }

  if (phase === "post-tour-typing" || phase === "ready") {
    systemMessages.push({
      id: "welcome",
      type: "assistant",
      content: welcomeText,
      timestamp: new Date(2026, 2, 7, 10, 30),
    });

    const postContent = phase === "post-tour-typing" ? postTourDisplayed : POST_TOUR_TEXT;
    if (postContent) {
      systemMessages.push({
        id: "post-tour",
        type: "assistant",
        content: postContent,
        timestamp: new Date(2026, 2, 7, 10, 32),
        isTyping: phase === "post-tour-typing",
      });
    }
  }

  const allMessages: DisplayMessage[] = [
    ...systemMessages,
    ...messages.map((m) => ({ ...m, isTyping: false })),
  ];

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [
    welcomeDisplayed,
    postTourDisplayed,
    messages,
    isAllyraTyping,
    typingMessageContent,
    showDocUpload,
    analysisRunning,
  ]);

  // Start the scripted conversation after post-tour completes
  useEffect(() => {
    if (phase === "ready" && conversationStep === 0 && messages.length === 0 && !hasStartedConvoRef.current) {
      hasStartedConvoRef.current = true;
      const timer = setTimeout(() => {
        deliverAllyraMessage(CONVERSATION_SCRIPT[0].content, 0);
      }, 1500);
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, conversationStep, messages.length]);

  const deliverAllyraMessage = useCallback(
    (content: string, _scriptIndex: number) => {
      setIsAllyraTyping(true);
      const thinkDelay = 1400 + Math.random() * 1000;
      setTimeout(() => {
        setIsAllyraTyping(false);
        setTypingMessageContent(content);
      }, thinkDelay);
    },
    []
  );

  const handleDocUpload = useCallback(
    (fileNames: string[]) => {
      const uploadMsg: ChatMessage = {
        id: `upload-${Date.now()}`,
        type: "user",
        content: `I've uploaded ${fileNames.length} document${fileNames.length !== 1 ? "s" : ""}:\n${fileNames.map((f) => `• ${f}`).join("\n")}`,
        timestamp: new Date(),
      };
      addMessage(uploadMsg);
      setShowDocUpload(false);

      setJourneyStage(2);
      setConversationStep(7);

      setTimeout(() => {
        const ackMsg: ChatMessage = {
          id: `ack-${Date.now()}`,
          type: "assistant",
          content: "Thank you — I've received your documents. Let me analyse everything now. This will take a moment.",
          timestamp: new Date(),
        };
        addMessage(ackMsg);

        setTimeout(() => {
          setAnalysisRunning(true);
        }, 1200);
      }, 800);
    },
    [addMessage, setJourneyStage, setConversationStep]
  );

  const handleTypingComplete = useCallback(() => {
    if (!typingMessageContent) return;

    const msg: ChatMessage = {
      id: `allyra-${Date.now()}`,
      type: "assistant",
      content: typingMessageContent,
      timestamp: new Date(),
    };
    addMessage(msg);

    const justTyped = typingMessageContent;
    setTypingMessageContent(null);

    // If this was the document request message, show the upload UI
    if (justTyped.includes("Could you please upload")) {
      setShowDocUpload(true);
      return;
    }

    // If in insight delivery mode, advance to next insight item
    if (insightIndex >= 0) {
      advanceInsightRef.current(insightIndex + 1);
      return;
    }

    // If in scripted conversation phase, auto-deliver next item
    if (conversationStep < CONVERSATION_SCRIPT.length) {
      const nextScriptIndex = conversationStep + 1;

      if (nextScriptIndex < CONVERSATION_SCRIPT.length) {
        const nextItem = CONVERSATION_SCRIPT[nextScriptIndex];
        setConversationStep(nextScriptIndex);

        setTimeout(() => {
          if (nextItem.role === "assistant") {
            deliverAllyraMessage(nextItem.content, nextScriptIndex);
          } else {
            // Auto-deliver user response
            const userMsg: ChatMessage = {
              id: `user-${Date.now()}`,
              type: "user",
              content: nextItem.content,
              timestamp: new Date(),
            };
            addMessage(userMsg);

            // After user message, continue to next script item
            const followingIndex = nextScriptIndex + 1;
            if (followingIndex < CONVERSATION_SCRIPT.length) {
              setConversationStep(followingIndex);
              setTimeout(() => {
                const followingItem = CONVERSATION_SCRIPT[followingIndex];
                if (followingItem.role === "assistant") {
                  deliverAllyraMessage(followingItem.content, followingIndex);
                }
              }, 1800);
            }
          }
        }, 1400);
      }
    }
  }, [typingMessageContent, addMessage, insightIndex, conversationStep, deliverAllyraMessage, setConversationStep, CONVERSATION_SCRIPT]);

  const handleSend = useCallback(() => {
    if (!input.trim() || phase !== "ready" || isAllyraTyping || typingMessageContent) return;
    if (showDocUpload || analysisRunning) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      type: "user",
      content: input,
      timestamp: new Date(),
    };
    addMessage(userMsg);
    setInput("");

    if (waitingForInsightReply) {
      setWaitingForInsightReply(false);
      const currentWaitIndex = insightIndex;
      setTimeout(() => {
        advanceInsightRef.current(currentWaitIndex + 1);
      }, 600);
      return;
    }

    if (conversationStep >= 20) {
      return;
    }

    const nextStep = conversationStep + 1;
    setConversationStep(nextStep);

    if (nextStep <= 5) {
      const scriptMsg = CONVERSATION_SCRIPT[nextStep];
      if (scriptMsg) {
        setTimeout(() => {
          deliverAllyraMessage(scriptMsg.content, nextStep);
        }, 600);
      }
    }
  }, [input, phase, isAllyraTyping, typingMessageContent, showDocUpload, analysisRunning, addMessage, conversationStep, setConversationStep, deliverAllyraMessage, waitingForInsightReply, insightIndex, CONVERSATION_SCRIPT]);

  // Safety net: deliver doc request if conversationStep somehow reaches 5 without auto-advance
  useEffect(() => {
    if (
      conversationStep === 5 &&
      !typingMessageContent &&
      !isAllyraTyping &&
      !showDocUpload &&
      messages.length > 0
    ) {
      const hasDocRequest = messages.some((m) =>
        m.content.includes("Could you please upload")
      );
      if (!hasDocRequest) {
        const timer = setTimeout(() => {
          deliverAllyraMessage(CONVERSATION_SCRIPT[CONVERSATION_SCRIPT.length - 1].content, CONVERSATION_SCRIPT.length - 1);
          setConversationStep(CONVERSATION_SCRIPT.length - 1);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [conversationStep, typingMessageContent, isAllyraTyping, showDocUpload, messages, deliverAllyraMessage, setConversationStep, CONVERSATION_SCRIPT]);

  // Auto-trigger document upload after document request appears
  useEffect(() => {
    if (showDocUpload && conversationStep === CONVERSATION_SCRIPT.length - 1) {
      const timer = setTimeout(() => {
        handleDocUpload(scenarioContent.uploadFileNames);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [showDocUpload, conversationStep, handleDocUpload, scenarioContent.uploadFileNames, CONVERSATION_SCRIPT.length]);

  const handleAnalysisComplete = useCallback(() => {
    setAnalysisRunning(false);

    const analysisMsg: ChatMessage = {
      id: `analysis-${Date.now()}`,
      type: "assistant",
      content: "__analysis_complete__",
      timestamp: new Date(),
      isAnalysis: true,
    };
    addMessage(analysisMsg);

    setJourneyStage(3);
    setConversationStep(8);

    // Set business profile from scenario content — name always comes from userProfile
    setBusinessProfile({
      name: userProfile?.businessName || scenarioContent.businessProfile.sector,
      sector: scenarioContent.businessProfile.sector,
      stage: scenarioContent.businessProfile.stage,
      employees: scenarioContent.businessProfile.employees,
      revenue: scenarioContent.businessProfile.revenue,
    });

    setTimeout(() => {
      if (!insightDeliveryRef.current) {
        insightDeliveryRef.current = true;
        advanceInsightRef.current(0);
      }
    }, 1500);
  }, [addMessage, setJourneyStage, setConversationStep, setBusinessProfile, userProfile, scenarioContent]);

  // Insight delivery engine
  const advanceInsightScript = useCallback((nextIndex: number) => {
    if (nextIndex >= GROWTH_INSIGHTS_SCRIPT.length) {
      setInsightIndex(-1);
      insightDeliveryRef.current = false;
      setConversationStep(20);

      setTimeout(() => {
        const userMsg: ChatMessage = {
          id: `user-insight-final-${Date.now()}`,
          type: "user",
          content: "Let's turn these into a growth plan.",
          timestamp: new Date(),
        };
        addMessage(userMsg);
      }, 1200);
      return;
    }

    const item = GROWTH_INSIGHTS_SCRIPT[nextIndex];
    setInsightIndex(nextIndex);

    if (item.type === "message") {
      setIsAllyraTyping(true);
      const delay = 1000 + Math.random() * 800;
      setTimeout(() => {
        setIsAllyraTyping(false);
        setTypingMessageContent(item.content);
      }, delay);
    } else if (item.type === "card") {
      setTimeout(() => {
        const cardMsg: ChatMessage = {
          id: `insight-card-${Date.now()}-${nextIndex}`,
          type: "assistant",
          content: "",
          timestamp: new Date(),
          insightCard: item.card,
        };
        addMessage(cardMsg);

        setTimeout(() => {
          advanceInsightScript(nextIndex + 1);
        }, 1800);
      }, 1200);
    } else if (item.type === "wait-for-user") {
      setTimeout(() => {
        const userMsg: ChatMessage = {
          id: `user-${Date.now()}`,
          type: "user",
          content: item.userResponse,
          timestamp: new Date(),
        };
        addMessage(userMsg);

        setTimeout(() => {
          advanceInsightScript(nextIndex + 1);
        }, 1800);
      }, 2200);
    }
  }, [addMessage, setConversationStep, GROWTH_INSIGHTS_SCRIPT]);

  advanceInsightRef.current = advanceInsightScript;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isGrowthPlanBuilding = growthPlanActive && !growthPlanWaiting && growthPlanStep < 6;

  const isInputDisabled =
    phase !== "ready" ||
    isAllyraTyping ||
    !!typingMessageContent ||
    showDocUpload ||
    analysisRunning ||
    (insightIndex >= 0 && !waitingForInsightReply) ||
    isGrowthPlanBuilding;

  const inputPlaceholder = (() => {
    if (phase !== "ready") return "Allyra is showing you around...";
    if (isAllyraTyping || typingMessageContent) return "Allyra is typing...";
    if (showDocUpload) return "Please upload your documents above...";
    if (analysisRunning) return "Allyra is analysing your business...";
    if (insightIndex >= 0 && !waitingForInsightReply) return "Allyra is sharing insights...";
    if (waitingForInsightReply) return "Share your thoughts...";
    if (growthPlanWaiting) return "Share your thoughts on the plan...";
    if (conversationStep >= 21 && !growthPlanWaiting) return "Allyra is building your growth plan...";
    if (conversationStep >= 20) return "Ready to build your growth plan — share your thoughts...";
    if (conversationStep >= 8) return "Ask Allyra about your growth insights...";
    return "Type your response...";
  })();

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Journey Tracker */}
      <JourneyTracker currentStage={journeyStage} />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className={`${compactMode ? "max-w-2xl" : "max-w-3xl"} mx-auto space-y-6`}>
          {allMessages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {/* Allyra Avatar */}
              {message.type === "assistant" && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full border border-[var(--allyra-neutral-300)] bg-white flex items-center justify-center">
                  <span className="text-[var(--allyra-green)] text-xs" style={{ fontWeight: 600 }}>
                    A
                  </span>
                </div>
              )}

              {/* Render based on message type */}
              {message.isAnalysis ? (
                <div className="max-w-xl w-full">
                  <AnalysisStatus onComplete={() => {}} isFinished={true} />
                </div>
              ) : message.insightCard ? (
                <div className="max-w-xl w-full">
                  <InsightCard {...message.insightCard} />
                </div>
              ) : (
                <div
                  className={`
                    max-w-xl rounded-2xl px-5 py-3.5
                    ${
                      message.type === "user"
                        ? "bg-[var(--allyra-neutral-100)] text-[var(--allyra-neutral-900)]"
                        : "bg-white border border-[var(--allyra-neutral-200)] text-[var(--allyra-neutral-900)]"
                    }
                  `}
                >
                  <p className="text-[15px] leading-relaxed whitespace-pre-line">
                    {message.content}
                    {message.isTyping && (
                      <span className="inline-block w-0.5 h-[18px] bg-[var(--allyra-green)] ml-0.5 align-text-bottom animate-pulse" />
                    )}
                  </p>
                  {!message.isTyping && (
                    <span className="text-xs mt-2 block text-[var(--allyra-neutral-500)]">
                      {message.timestamp.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </span>
                  )}
                </div>
              )}

              {/* User Avatar */}
              {message.type === "user" && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--allyra-neutral-200)] flex items-center justify-center">
                  <span className="text-sm text-[var(--allyra-neutral-700)]" style={{ fontWeight: 500 }}>
                    {userInitials}
                  </span>
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {isAllyraTyping && (
            <div className="flex gap-3 justify-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full border border-[var(--allyra-neutral-300)] bg-white flex items-center justify-center">
                <span className="text-[var(--allyra-green)] text-xs" style={{ fontWeight: 600 }}>
                  A
                </span>
              </div>
              <div className="bg-white border border-[var(--allyra-neutral-200)] rounded-2xl px-5 py-3.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[var(--allyra-neutral-300)] animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 rounded-full bg-[var(--allyra-neutral-300)] animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 rounded-full bg-[var(--allyra-neutral-300)] animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          {/* Currently typing Allyra message */}
          {typingMessageContent && (
            <div className="flex gap-3 justify-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full border border-[var(--allyra-neutral-300)] bg-white flex items-center justify-center">
                <span className="text-[var(--allyra-green)] text-xs" style={{ fontWeight: 600 }}>
                  A
                </span>
              </div>
              <div className="max-w-xl bg-white border border-[var(--allyra-neutral-200)] rounded-2xl px-5 py-3.5">
                <TypingMessage
                  key={typingMessageContent}
                  content={typingMessageContent}
                  onComplete={handleTypingComplete}
                  speed={18}
                />
              </div>
            </div>
          )}

          {/* Document Upload */}
          {showDocUpload && (
            <div className="flex gap-3 justify-start">
              <div className="flex-shrink-0 w-8 h-8" />
              <div className="max-w-xl w-full">
                <DocumentUpload onUpload={handleDocUpload} />
              </div>
            </div>
          )}

          {/* Analysis Status */}
          {analysisRunning && (
            <div className="flex gap-3 justify-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full border border-[var(--allyra-neutral-300)] bg-white flex items-center justify-center">
                <span className="text-[var(--allyra-green)] text-xs" style={{ fontWeight: 600 }}>
                  A
                </span>
              </div>
              <div className="max-w-xl w-full">
                <AnalysisStatus onComplete={handleAnalysisComplete} isFinished={false} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div
        id="chat-workspace"
        className="border-t border-[var(--allyra-neutral-200)] bg-white px-8 py-5"
      >
        <div className={`${compactMode ? "max-w-2xl" : "max-w-3xl"} mx-auto`}>
          <div className="relative flex items-start gap-2.5">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={inputPlaceholder}
                rows={1}
                disabled={isInputDisabled}
                className="w-full resize-none rounded-xl border border-[var(--allyra-neutral-300)] bg-white px-5 py-3.5 pr-24 text-[15px] leading-relaxed text-[var(--allyra-neutral-900)] placeholder:text-[var(--allyra-neutral-500)] focus:outline-none focus:border-[var(--allyra-green)] focus:ring-1 focus:ring-[var(--allyra-green)] transition-all disabled:bg-[var(--allyra-neutral-50)] disabled:cursor-not-allowed"
                style={{ minHeight: "52px", maxHeight: "200px" }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto";
                  target.style.height = target.scrollHeight + "px";
                }}
              />
              <div className="absolute right-3 bottom-3 flex items-center gap-1">
                <button
                  type="button"
                  disabled={isInputDisabled}
                  className="p-1.5 text-[var(--allyra-neutral-500)] hover:text-[var(--allyra-neutral-900)] transition-colors rounded-lg hover:bg-[var(--allyra-neutral-100)] disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Attach document"
                >
                  <Paperclip className="w-5 h-5" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  disabled={isInputDisabled}
                  className="p-1.5 text-[var(--allyra-neutral-500)] hover:text-[var(--allyra-green)] transition-colors rounded-lg hover:bg-[var(--allyra-green-light)] disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Voice input"
                >
                  <Mic className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isInputDisabled}
              className="flex-shrink-0 w-[52px] h-[52px] rounded-xl bg-[var(--allyra-green)] text-white flex items-center justify-center hover:bg-[var(--allyra-green-medium)] disabled:bg-[var(--allyra-neutral-300)] disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>
          <p className="text-xs text-[var(--allyra-neutral-500)] mt-3 text-center">
            Press Enter to send • Shift + Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
