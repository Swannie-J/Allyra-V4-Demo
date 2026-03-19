import { Upload, FileText, X, Check } from "lucide-react";
import { useState, useRef } from "react";

interface DocumentUploadProps {
  onUpload: (files: string[]) => void;
}

interface UploadedFile {
  name: string;
  size: string;
  type: string;
}

export function DocumentUpload({ onUpload }: DocumentUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const simulateFile = (fileName: string) => {
    const extensions: Record<string, string> = {
      pdf: "PDF Document",
      xlsx: "Excel Spreadsheet",
      docx: "Word Document",
      csv: "CSV File",
    };
    const ext = fileName.split(".").pop()?.toLowerCase() || "pdf";
    const sizes = ["1.2 MB", "2.4 MB", "856 KB", "3.1 MB", "1.8 MB"];
    return {
      name: fileName,
      size: sizes[Math.floor(Math.random() * sizes.length)],
      type: extensions[ext] || "Document",
    };
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    const newFiles = droppedFiles.map((f) => simulateFile(f.name));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      const newFiles = selected.map((f) => simulateFile(f.name));
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const addSampleFiles = () => {
    const sampleFiles = [
      simulateFile("Bank_Statements_Q4_2025.pdf"),
      simulateFile("Management_Accounts_2025.xlsx"),
      simulateFile("Sales_Contracts_Summary.pdf"),
    ];
    setFiles((prev) => [...prev, ...sampleFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSend = () => {
    if (files.length === 0) return;
    onUpload(files.map((f) => f.name));
  };

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          border-2 border-dashed rounded-xl px-6 py-5 text-center cursor-pointer transition-all duration-200
          ${
            isDragging
              ? "border-[var(--allyra-green)] bg-[var(--allyra-green-light)]"
              : "border-[var(--allyra-neutral-300)] hover:border-[var(--allyra-green)] hover:bg-[var(--allyra-green-light)]"
          }
        `}
      >
        <Upload
          className="w-6 h-6 mx-auto mb-2 text-[var(--allyra-neutral-400)]"
          strokeWidth={1.5}
        />
        <p className="text-sm text-[var(--allyra-neutral-600)]">
          Drop files here or <span className="text-[var(--allyra-green)]">browse</span>
        </p>
        <p className="text-xs text-[var(--allyra-neutral-400)] mt-1">
          PDF, Excel, Word, CSV
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.xlsx,.xls,.docx,.doc,.csv"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Demo helper */}
      {files.length === 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            addSampleFiles();
          }}
          className="w-full text-xs text-[var(--allyra-neutral-500)] hover:text-[var(--allyra-green)] transition-colors py-1"
        >
          For this demo, click here to add sample documents
        </button>
      )}

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center gap-3 px-3 py-2.5 bg-[var(--allyra-neutral-50)] rounded-lg border border-[var(--allyra-neutral-200)]"
            >
              <FileText
                className="w-4 h-4 text-[var(--allyra-green)] flex-shrink-0"
                strokeWidth={1.5}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[var(--allyra-neutral-800)] truncate">
                  {file.name}
                </p>
                <p className="text-xs text-[var(--allyra-neutral-400)]">
                  {file.type} • {file.size}
                </p>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="p-1 text-[var(--allyra-neutral-400)] hover:text-[var(--allyra-neutral-700)] transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {/* Send button */}
          <button
            onClick={handleSend}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--allyra-green)] text-white rounded-lg hover:bg-[var(--allyra-green-medium)] transition-colors text-sm"
          >
            <Check className="w-4 h-4" strokeWidth={2} />
            Send {files.length} document{files.length !== 1 ? "s" : ""} to Allyra
          </button>
        </div>
      )}
    </div>
  );
}
