import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// clsx lets us conditionally include classes: cn("p-4", isActive && "bg-accent-purple")
// twMerge resolves conflicts when the same CSS property is set twice
// (e.g. "p-4 p-2" would keep only p-2, the one meant to "win").
// Together, this is the standard way professional Tailwind codebases
// build components with dynamic, conditional styling.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}