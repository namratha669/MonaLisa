import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-card border border-border bg-white/5 backdrop-blur-sm p-6",
        "shadow-lg shadow-black/20",
        "transition-all duration-200 hover:border-white/15",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}