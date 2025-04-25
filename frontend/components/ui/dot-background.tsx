"use client";
import React from "react";

export function DotBackground({ children, className }: { children?: React.ReactNode, className?: string }) {
  return (
    <div className={`relative h-full w-full ${className || ''}`}
      style={{
        background: "linear-gradient(to bottom right, #f8f9fa, #f0f2f5, #e9ecef)",
      }}
    >
      {/* Radial gradient for the container to give a faded look */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{
          maskImage:
            "radial-gradient(ellipse at center, transparent 20%, black)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, transparent 20%, black)",
        }}
      ></div>
      {/* The actual dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, var(--color-primary, oklch(0.705 0.015 286.067 / 0.15)), transparent 1px), radial-gradient(circle at center, var(--color-primary, oklch(0.705 0.015 286.067 / 0.15)), transparent 1px)",
          backgroundSize: "40px 40px", // Adjust size of grid
          backgroundPosition: "0 0, 20px 20px", // Offset second layer for denser dots
        }}
      ></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
} 