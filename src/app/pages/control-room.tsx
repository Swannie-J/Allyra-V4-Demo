import { useCallback, useEffect, useRef } from "react";
import { ChatWorkspace } from "../components/chat-workspace";
import { IntroTour } from "../components/intro-tour";
import { GrowthPlanCanvas } from "../components/growth-plan-canvas";
import { useChatContext } from "../components/chat-context";
import { getScenarioContent } from "../data/scenario-content";

export function ControlRoom() {
  const {
    phase,
    setPhase,
    markTourCompleted,
    conversationStep,
    setConversationStep,
    messages,
    addMessage,
    growthPlanActive,
    setGrowthPlanActive,
    growthPlanStep,
    setGrowthPlanStep,
    setGrowthPlanInitiatives,
    growthPlanWaiting,
    setGrowthPlanWaiting,
    setJourneyStage,
    setNavBadge,
    selectedScenario,
  } = useChatContext();

  // Derive all scenario-specific content
  const scenarioContent = getScenarioContent(selectedScenario);
  const INITIATIVES = scenarioContent.initiatives;
  const GP_STEP_SCRIPTS = scenarioContent.gpStepScripts;

  const tourTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gpStartedRef = useRef(false);
  const gpTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const buildStepRef = useRef<(stepIndex: number) => void>(() => {});

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (tourTimerRef.current) {
        clearTimeout(tourTimerRef.current);
        tourTimerRef.current = null;
      }
      if (gpTimerRef.current) {
        clearTimeout(gpTimerRef.current);
        gpTimerRef.current = null;
      }
    };
  }, []);

  const handleWelcomeTyped = useCallback(() => {
    setPhase("waiting-for-tour");
    if (tourTimerRef.current) {
      clearTimeout(tourTimerRef.current);
    }
    tourTimerRef.current = setTimeout(() => {
      tourTimerRef.current = null;
      setPhase("touring");
    }, 2000);
  }, [setPhase]);

  const handleTourComplete = useCallback(() => {
    markTourCompleted();
    setPhase("post-tour-typing");
  }, [setPhase, markTourCompleted]);

  const handlePostTourTyped = useCallback(() => {
    setPhase("ready");
  }, [setPhase]);

  // Deliver a sequence of chat messages with delays, then optionally add canvas content
  const deliverBuildStep = useCallback(
    (stepIndex: number) => {
      if (stepIndex >= GP_STEP_SCRIPTS.length) {
        // All steps complete — deliver conclusion
        gpTimerRef.current = setTimeout(() => {
          setNavBadge("training", true);
          setNavBadge("funding", true);

          const conclusionMsg1 = {
            id: `gp-conclusion1-${Date.now()}`,
            type: "assistant" as const,
            content:
              "I've also identified some practical resources and a few possible support options that match this plan.",
            timestamp: new Date(),
          };
          addMessage(conclusionMsg1);

          gpTimerRef.current = setTimeout(() => {
            const conclusionMsg2 = {
              id: `gp-conclusion2-${Date.now()}`,
              type: "assistant" as const,
              content:
                "At this stage, the strongest next move is to improve control and consistency first.\n\nOnce that is in place, the business will be in a stronger position to decide whether a small equipment or working capital solution would genuinely help.\n\nYour growth plan is now live. You'll be able to update progress, track actions, and build from here.",
              timestamp: new Date(),
            };
            addMessage(conclusionMsg2);
            setConversationStep(30);
            setGrowthPlanStep(6);
            setJourneyStage(5);
          }, 2000);
        }, 1500);
        return;
      }

      const script = GP_STEP_SCRIPTS[stepIndex];
      let msgIndex = 0;

      const deliverNextMsg = () => {
        if (msgIndex < script.messages.length) {
          const content = script.messages[msgIndex];
          msgIndex++;

          gpTimerRef.current = setTimeout(() => {
            const msg = {
              id: `gp-step${stepIndex}-msg${msgIndex}-${Date.now()}`,
              type: "assistant" as const,
              content,
              timestamp: new Date(),
            };
            addMessage(msg);

            // Continue delivering remaining messages
            gpTimerRef.current = setTimeout(() => {
              deliverNextMsg();
            }, 1800); // Increased from 1200ms
          }, 1400); // Increased from 800ms
        } else {
          // All messages delivered — update canvas
          gpTimerRef.current = setTimeout(() => {
            const newStep = stepIndex + 1;
            setGrowthPlanStep(newStep);

            // Add initiative if this is step 1+ (step 0 is Growth Focus)
            if (stepIndex >= 1) {
              const initiativeIndex = stepIndex - 1;
              if (initiativeIndex < INITIATIVES.length) {
                setGrowthPlanInitiatives(
                  INITIATIVES.slice(0, initiativeIndex + 1)
                );
              }
            }

            // Deliver follow-up question if any, then auto-respond
            if (script.question && script.userResponse) {
              gpTimerRef.current = setTimeout(() => {
                const questionMsg = {
                  id: `gp-step${stepIndex}-q-${Date.now()}`,
                  type: "assistant" as const,
                  content: script.question!,
                  timestamp: new Date(),
                };
                addMessage(questionMsg);

                // Auto-deliver user response after a pause
                gpTimerRef.current = setTimeout(() => {
                  const userMsg = {
                    id: `gp-step${stepIndex}-user-${Date.now()}`,
                    type: "user" as const,
                    content: script.userResponse!,
                    timestamp: new Date(),
                  };
                  addMessage(userMsg);

                  // Continue to next step
                  gpTimerRef.current = setTimeout(() => {
                    setGrowthPlanWaiting(false);
                    buildStepRef.current(stepIndex + 1);
                  }, 1800); // Increased from 1200ms
                }, 2500); // Increased from 1800ms
              }, 2000); // Increased from 1500ms
            } else {
              // No question — brief pause then auto-advance if stepIndex <= 3, otherwise wait
              if (stepIndex < GP_STEP_SCRIPTS.length - 1) {
                gpTimerRef.current = setTimeout(() => {
                  buildStepRef.current(stepIndex + 1);
                }, 1800); // Increased from 1200ms
              } else {
                // Last step (init 4), brief pause then conclude
                gpTimerRef.current = setTimeout(() => {
                  buildStepRef.current(stepIndex + 1);
                }, 2500); // Increased from 2000ms
              }
            }
          }, 1800); // Increased from 1200ms
        }
      };

      deliverNextMsg();
    },
    [
      addMessage,
      setGrowthPlanStep,
      setGrowthPlanInitiatives,
      setGrowthPlanWaiting,
      setNavBadge,
      setConversationStep,
      setJourneyStage,
    ]
  );

  // Keep ref updated
  buildStepRef.current = deliverBuildStep;

  // Watch for user responses during growth plan waiting
  useEffect(() => {
    if (!growthPlanActive || !growthPlanWaiting) return;
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.type === "user") {
      setGrowthPlanWaiting(false);
      // Determine which build step to advance to based on current growthPlanStep
      // growthPlanStep 1 = focus shown → deliver init 1 (buildStep 1)
      // growthPlanStep 2 = init 1 shown → deliver init 2 (buildStep 2)
      // etc.
      const nextBuildStep = growthPlanStep;
      gpTimerRef.current = setTimeout(() => {
        buildStepRef.current(nextBuildStep);
      }, 600);
    }
  }, [
    growthPlanActive,
    growthPlanWaiting,
    messages,
    growthPlanStep,
    setGrowthPlanWaiting,
  ]);

  // Watch for insight completion (conversationStep === 20) and user response to trigger growth plan
  useEffect(() => {
    if (
      conversationStep === 20 &&
      !growthPlanActive &&
      !gpStartedRef.current
    ) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg?.type === "user") {
        gpStartedRef.current = true;

        setTimeout(() => {
          const gpIntroMsg = {
            id: `gp-intro-${Date.now()}`,
            type: "assistant" as const,
            content:
              "Let's now turn these insights into a practical growth plan for your business.\n\nI'm going to build this out step by step. You'll see the plan take shape on the right side of your screen.",
            timestamp: new Date(),
          };
          addMessage(gpIntroMsg);

          setTimeout(() => {
            setGrowthPlanActive(true);
            setGrowthPlanStep(0);
            setJourneyStage(4);
            setConversationStep(21);

            // Start the conversational build — step 0 delivers growth focus
            gpTimerRef.current = setTimeout(() => {
              buildStepRef.current(0);
            }, 1500);
          }, 2500);
        }, 1200);
      }
    }
  }, [
    conversationStep,
    growthPlanActive,
    messages,
    addMessage,
    setGrowthPlanActive,
    setGrowthPlanStep,
    setJourneyStage,
    setConversationStep,
  ]);

  return (
    <div className="h-full flex">
      {/* Chat - takes full width normally, half when canvas is active */}
      {phase !== "scenario-select" && (
        <>
          <div
            className={`h-full ${
              growthPlanActive ? "w-1/2" : "w-full"
            } transition-all duration-500`}
          >
            <ChatWorkspace
              phase={phase}
              onWelcomeTyped={handleWelcomeTyped}
              onPostTourTyped={handlePostTourTyped}
              compactMode={growthPlanActive}
            />
          </div>

          {/* Growth Plan Canvas - appears on the right */}
          {growthPlanActive && (
            <div className="h-full w-1/2">
              <GrowthPlanCanvas />
            </div>
          )}

          {phase === "touring" && <IntroTour onComplete={handleTourComplete} />}
        </>
      )}
    </div>
  );
}