"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue } from "framer-motion";

export interface ModernCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  glowOnHover?: boolean;
  withCornerIcons?: boolean;
}

export function ModernCard({
  title,
  children,
  className,
  contentClassName,
  glowOnHover = true,
  withCornerIcons = false,
}: ModernCardProps) {
  const [isMounted, setIsMounted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mouse position values for the glow effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }

  // Reset mouse position when mouse leaves
  function onMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={glowOnHover ? onMouseMove : undefined}
      onMouseLeave={glowOnHover ? onMouseLeave : undefined}
      className={cn(
        "relative flex flex-col overflow-hidden rounded-xl border border-border/40 bg-card backdrop-blur-sm",
        "transition-all duration-300 ease-out hover:border-primary/20 hover:shadow-md",
        "group", // For group hover effects
        className,
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 20 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {/* Corner icons for decoration */}
      {withCornerIcons && (
        <>
          <div className="absolute h-2.5 w-2.5 -top-1.5 -left-1.5 rounded-full bg-primary/30" />
          <div className="absolute h-2.5 w-2.5 -top-1.5 -right-1.5 rounded-full bg-primary/30" />
          <div className="absolute h-2.5 w-2.5 -bottom-1.5 -left-1.5 rounded-full bg-primary/30" />
          <div className="absolute h-2.5 w-2.5 -bottom-1.5 -right-1.5 rounded-full bg-primary/30" />
        </>
      )}

      {/* Glow effect that follows mouse */}
      {glowOnHover && (
        <motion.div
          className="pointer-events-none absolute -inset-px z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle 200px at ${mouseX}px ${mouseY}px, var(--color-primary-foreground)/10, transparent)`,
          }}
        />
      )}

      {/* Card header with title */}
      <div className="flex items-center justify-between border-b border-border/10 bg-card/50 px-5 py-4">
        <h3 className="text-base font-medium text-card-foreground">{title}</h3>
      </div>

      {/* Card content */}
      <div className={cn("flex flex-1 flex-col px-5 py-5", contentClassName)}>
        {children}
      </div>
    </motion.div>
  );
} 