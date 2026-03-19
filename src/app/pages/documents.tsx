import { FileText } from "lucide-react";

export function Documents() {
  return (
    <div className="h-full bg-white px-12 py-10 overflow-y-auto">
      <div className="max-w-5xl">
        <h1 className="text-3xl tracking-tight text-[var(--allyra-neutral-900)] mb-2">
          Document Vault
        </h1>
        <p className="text-[var(--allyra-neutral-600)] text-base mb-8">
          Securely store and manage your important business documents.
        </p>

        <div className="h-64 border border-dashed border-[var(--allyra-neutral-300)] rounded-xl flex flex-col items-center justify-center gap-3">
          <FileText className="w-8 h-8 text-[var(--allyra-neutral-300)]" strokeWidth={1.5} />
          <p className="text-[var(--allyra-neutral-500)] text-center max-w-sm">
            Your documents will be stored here as you share them with Allyra during your conversations.
          </p>
        </div>
      </div>
    </div>
  );
}
