import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className, ...props }: InputProps) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-sm text-ink-secondary">{label}</label>}
      <input
        className={cn(
          "w-full bg-white/5 border border-border rounded-xl px-3 py-2 text-ink-primary text-sm",
          "focus:outline-none focus:border-accent-purple/50 focus:bg-white/[0.07]",
          "placeholder:text-ink-muted transition-colors",
          className
        )}
        {...props}
      />
    </div>
  );
}