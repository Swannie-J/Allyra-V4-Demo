import { useNavigate } from "react-router";
import { ScenarioSelector, SCENARIOS } from "../components/scenario-selector";
import type { ScenarioId, UserProfile } from "../components/chat-context";
import { useChatContext } from "../components/chat-context";

export function ScenarioLanding() {
  const navigate = useNavigate();
  const { setSelectedScenario, setUserProfile, setPhase, resetTourState } = useChatContext();

  const handleSelectScenario = (scenarioId: ScenarioId) => {
    // Full reset so every demo starts fresh
    resetTourState();

    setSelectedScenario(scenarioId);

    // Find the scenario data to set the user profile
    const scenario = SCENARIOS.find((s) => s.id === scenarioId);
    if (scenario) {
      const [firstName, ...lastParts] = scenario.owner.split(" ");
      const lastName = lastParts.join(" ");
      const emailName = firstName.toLowerCase();
      const emailBiz = scenario.title.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 20);

      const userProfile: UserProfile = {
        firstName,
        lastName,
        email: `${emailName}@${emailBiz}.co.za`,
        businessName: scenario.title,
      };

      setUserProfile(userProfile);
    }

    // Set phase to welcome-typing to start the demo
    setPhase("welcome-typing");

    // Navigate to control room to start the demo
    navigate("/control-room");
  };

  return (
    <div className="h-screen w-full bg-[var(--allyra-neutral-50)] overflow-y-auto">
      <ScenarioSelector onSelectScenario={handleSelectScenario} />
    </div>
  );
}