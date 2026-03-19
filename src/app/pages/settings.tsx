import { useState } from "react";
import {
  User,
  Building2,
  Bell,
  Shield,
  Check,
} from "lucide-react";
import { useChatContext } from "../components/chat-context";

function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

function SettingsSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <h2
        className="text-[16px] text-[var(--allyra-neutral-900)] mb-0.5"
        style={{ fontWeight: 600 }}
      >
        {title}
      </h2>
      <p className="text-[13px] text-[var(--allyra-neutral-500)] mb-4">
        {description}
      </p>
      <div className="bg-white rounded-xl border border-[var(--allyra-neutral-200)] divide-y divide-[var(--allyra-neutral-100)]">
        {children}
      </div>
    </div>
  );
}

function FieldRow({
  label,
  value,
  editable = false,
}: {
  label: string;
  value: string;
  editable?: boolean;
}) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5">
      <div>
        <span
          className="text-[12px] text-[var(--allyra-neutral-500)] block mb-0.5"
          style={{ fontWeight: 500 }}
        >
          {label}
        </span>
        <span className="text-[14px] text-[var(--allyra-neutral-800)]">
          {value}
        </span>
      </div>
      {editable && (
        <button
          className="text-[12px] text-[var(--allyra-green)] hover:underline cursor-pointer"
          style={{ fontWeight: 500 }}
        >
          Edit
        </button>
      )}
    </div>
  );
}

function ToggleRow({
  label,
  description,
  defaultOn = false,
}: {
  label: string;
  description: string;
  defaultOn?: boolean;
}) {
  const [isOn, setIsOn] = useState(defaultOn);

  return (
    <div className="flex items-center justify-between px-5 py-3.5">
      <div className="flex-1 mr-4">
        <span
          className="text-[14px] text-[var(--allyra-neutral-800)] block"
          style={{ fontWeight: 500 }}
        >
          {label}
        </span>
        <span className="text-[12px] text-[var(--allyra-neutral-500)]">
          {description}
        </span>
      </div>
      <button
        onClick={() => setIsOn(!isOn)}
        className={`relative w-10 h-[22px] rounded-full transition-colors duration-200 cursor-pointer flex-shrink-0 ${
          isOn ? "bg-[var(--allyra-green)]" : "bg-[var(--allyra-neutral-300)]"
        }`}
      >
        <div
          className={`absolute top-[3px] w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            isOn ? "translate-x-[22px]" : "translate-x-[3px]"
          }`}
        />
      </button>
    </div>
  );
}

export function Settings() {
  const { userProfile } = useChatContext();
  const [saved, setSaved] = useState(false);

  // Fallback to default values
  const displayName = userProfile 
    ? `${userProfile.firstName} ${userProfile.lastName}`
    : "Thandi Molefe";
  const businessName = userProfile?.businessName || "Lowveld Harvest Foods";
  const email = userProfile?.email || "thandi@lowveldharvest.co.za";
  const initials = userProfile 
    ? getInitials(userProfile.firstName, userProfile.lastName)
    : "TM";

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="h-full bg-[var(--allyra-neutral-50)] px-12 py-10 overflow-y-auto">
      <div className="max-w-3xl">
        <h1 className="text-3xl tracking-tight text-[var(--allyra-neutral-900)] mb-1">
          Settings
        </h1>
        <p className="text-[var(--allyra-neutral-600)] text-base mb-8">
          Manage your account and preferences.
        </p>

        {/* Profile */}
        <SettingsSection
          title="Profile"
          description="Your personal details associated with this account."
        >
          <div className="flex items-center gap-4 px-5 py-4">
            <div className="w-14 h-14 rounded-full bg-[var(--allyra-green-light)] border border-[var(--allyra-green-muted)] flex items-center justify-center">
              <span
                className="text-[18px] text-[var(--allyra-green)]"
                style={{ fontWeight: 600 }}
              >
                {initials}
              </span>
            </div>
            <div>
              <p
                className="text-[15px] text-[var(--allyra-neutral-900)]"
                style={{ fontWeight: 600 }}
              >
                {displayName}
              </p>
              <p className="text-[13px] text-[var(--allyra-neutral-500)]">
                Founder & Managing Director
              </p>
            </div>
          </div>
          <FieldRow label="Email" value={email} editable />
          <FieldRow label="Phone" value="+27 82 345 6789" editable />
          <FieldRow label="Location" value="Limpopo, South Africa" />
        </SettingsSection>

        {/* Business */}
        <SettingsSection
          title="Business Details"
          description="Information about your business used for analysis and recommendations."
        >
          <FieldRow
            label="Business Name"
            value={businessName}
            editable
          />
          <FieldRow label="Sector" value="Agri-processing — Dried Fruit & Natural Snacks" />
          <FieldRow label="Business Stage" value="Growth stage (3–5 years trading)" />
          <FieldRow label="Employees" value="8 full-time, 4 seasonal" />
          <FieldRow
            label="Annual Revenue"
            value="R1–2M"
          />
          <FieldRow label="Registration" value="CIPC Registered (Pty) Ltd" />
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection
          title="Notifications"
          description="Control how Allyra communicates with you."
        >
          <ToggleRow
            label="Growth plan reminders"
            description="Receive reminders about upcoming action deadlines."
            defaultOn={true}
          />
          <ToggleRow
            label="New funding opportunities"
            description="Get notified when new funding options match your profile."
            defaultOn={true}
          />
          <ToggleRow
            label="Training recommendations"
            description="Alerts when new resources are added based on your plan."
            defaultOn={false}
          />
          <ToggleRow
            label="Email digest"
            description="Weekly summary of your growth plan progress."
            defaultOn={false}
          />
        </SettingsSection>

        {/* Data & Privacy */}
        <SettingsSection
          title="Data & Privacy"
          description="How your information is stored and used."
        >
          <div className="px-5 py-4">
            <div className="flex items-start gap-3 mb-3">
              <Shield
                className="w-5 h-5 text-[var(--allyra-green)] flex-shrink-0 mt-0.5"
                strokeWidth={1.5}
              />
              <div>
                <p
                  className="text-[14px] text-[var(--allyra-neutral-800)] mb-1"
                  style={{ fontWeight: 500 }}
                >
                  Your data is yours
                </p>
                <p className="text-[13px] text-[var(--allyra-neutral-500)] leading-relaxed">
                  Allyra uses your business information only to generate
                  personalised insights and recommendations. Your data is never
                  shared with third parties or used for purposes beyond your
                  growth journey.
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-3">
              <button
                className="text-[12px] text-[var(--allyra-green)] hover:underline cursor-pointer"
                style={{ fontWeight: 500 }}
              >
                Download my data
              </button>
              <span className="text-[var(--allyra-neutral-300)]">|</span>
              <button
                className="text-[12px] text-red-500 hover:underline cursor-pointer"
                style={{ fontWeight: 500 }}
              >
                Delete my account
              </button>
            </div>
          </div>
        </SettingsSection>

        {/* Save */}
        <div className="flex items-center gap-3 pt-2 pb-12">
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-lg bg-[var(--allyra-green)] text-white text-[13px] hover:opacity-90 transition-opacity cursor-pointer"
            style={{ fontWeight: 500 }}
          >
            Save Changes
          </button>
          {saved && (
            <span className="flex items-center gap-1 text-[13px] text-[var(--allyra-green)]">
              <Check className="w-4 h-4" strokeWidth={2.5} />
              Saved
            </span>
          )}
        </div>
      </div>
    </div>
  );
}