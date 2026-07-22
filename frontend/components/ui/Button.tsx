import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// Extending ButtonHTMLAttributes means our component accepts every normal
// button prop (onClick, disabled, type, etc.) automatically — we don't
// have to manually re-declare them.
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
}

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary:
      "bg-accent-purple text-white hover:bg-accent-purple/90 hover:shadow-lg hover:shadow-accent-purple/20",
    secondary:
      "bg-background-surface text-ink-primary border border-border hover:bg-white/5",
    ghost:
      "text-ink-secondary hover:text-ink-primary hover:bg-white/5",
    danger:
      "bg-accent-red/10 text-accent-red border border-accent-red/20 hover:bg-accent-red/20",
  };

  return (
    <button className={cn(baseStyles, variantStyles[variant], className)} {...props}>
      {children}
    </button>
  );
}