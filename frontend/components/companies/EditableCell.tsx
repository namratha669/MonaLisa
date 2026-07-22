"use client";

import { useState, useRef, useEffect } from "react";

interface EditableCellProps {
  value: string | number;
  onSave: (newValue: string) => Promise<void>;
  type?: "text" | "number";
  align?: "left" | "right";
}

export function EditableCell({ value, onSave, type = "text", align = "left" }: EditableCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(String(value));
  const [saving, setSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // When we enter edit mode, immediately focus and select the input's text,
  // so the user can start typing right away without an extra click.
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  async function handleSave() {
    // Don't bother calling the API if nothing actually changed.
    if (draft === String(value)) {
      setIsEditing(false);
      return;
    }
    setSaving(true);
    try {
      await onSave(draft);
    } finally {
      setSaving(false);
      setIsEditing(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      handleSave();
    }
    if (e.key === "Escape") {
      setDraft(String(value));   // discard changes
      setIsEditing(false);
    }
  }

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type={type}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        disabled={saving}
        className={`w-full bg-white/10 border border-accent-purple/40 rounded-md px-2 py-1 text-ink-primary outline-none ${
          align === "right" ? "text-right" : "text-left"
        }`}
      />
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className={`cursor-text px-2 py-1 rounded-md hover:bg-white/5 transition-colors ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {type === "number" ? `₹${Number(value).toLocaleString("en-IN")}` : value}
    </div>
  );
}