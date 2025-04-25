"use client";

import { cn } from "@/lib/utils";

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedGradientText({
  children,
  className,
}: AnimatedGradientTextProps) {
  return (
    <div
      className={cn(
        "group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-2xl px-4 py-1.5 text-sm font-medium backdrop-blur-sm transition-shadow duration-500 ease-out [--bg-size:300%]",
        "bg-[linear-gradient(110deg,hsl(var(--muted)),45%,hsl(var(--primary)),55%,hsl(var(--muted)))] bg-[length:var(--bg-size)_100%]",
        "dark:bg-[linear-gradient(110deg,hsl(var(--muted)),45%,hsl(var(--primary)),55%,hsl(var(--muted)))]", // Keep same gradient for dark mode or adjust if needed
        "animate-gradient", // Add animation class
        className,
      )}
    >
      {/* Optional: Glow effect */}
      <div className="absolute -inset-3 rounded-lg bg-gradient-to-b from-primary/30 to-primary/50 opacity-10 blur-lg transition-opacity duration-500 group-hover:opacity-30" />
      {children}
    </div>
  );
}

// Add the animation keyframes to globals.css or a relevant CSS file:
/*
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient {
  animation: gradient 8s linear infinite; 
}
*/ 