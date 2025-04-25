"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming utils.ts exists from shadcn setup

export const BackgroundBeams = ({
  className,
}: {
  className?: string;
}) => {
  const numberOfBeams = Math.floor(Math.random() * (15 - 7 + 1)) + 7; // Random number between 7 and 15
  const delays = Array.from({ length: numberOfBeams }).map(() => Math.random() * 5); // Random delays up to 5s
  const durations = Array.from({ length: numberOfBeams }).map(() => Math.random() * (15 - 5 + 1) + 5); // Random durations between 5s and 15s

  return (
    <div
      className={cn(
        "pointer-events-none absolute left-1/2 top-0 -translate-x-1/2",
        "h-[30rem] w-[50rem] overflow-hidden", // Adjust size as needed
        className
      )}
      style={{
        maskImage: "radial-gradient(ellipse at center, white 10%, transparent 70%)", // Softer fade
        WebkitMaskImage: "radial-gradient(ellipse at center, white 10%, transparent 70%)",
      }}
    >
      <svg
        className="absolute inset-0 h-full w-full text-muted-foreground/10" // Use theme color with low opacity
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Define multiple gradients if needed, or use one */}
          <radialGradient
            id="radial-gradient-beams"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Static grid background */}
        <rect width="100%" height="100%" fill="url(#radial-gradient-beams)" />
      </svg>

      {/* Animated Beams */}
      {Array.from({ length: numberOfBeams }).map((_, i) => (
        <motion.div
          key={`beam-${i}`}
          className="absolute top-0 left-1/2 h-full w-[1px] bg-gradient-to-b from-transparent via-primary/50 to-transparent"
          initial={{
            y: "-100%",
            rotate: `${Math.random() * 360}deg`, // Start at random rotation
          }}
          animate={{
            y: ["-100%", "100%"],
            rotate: `${Math.random() * 360}deg`, // End at random rotation
          }}
          transition={{
            duration: durations[i],
            delay: delays[i],
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          style={{
            transformOrigin: "center center", // Rotate around center
            left: `${Math.random() * 100}%`, // Random horizontal position
          }}
        />
      ))}
    </div>
  );
}; 