import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import { cn } from "@/lib/utils";

export function TitleSection() {
  return (
    <div className="z-10 flex min-h-[8rem] items-center justify-center mb-8">
      <AnimatedGradientText className="px-6 py-2">
        <span
          className={cn(
            `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
            "text-2xl md:text-3xl font-bold transition-colors", // Larger text size
          )}
        >
          Background Remover AI
        </span>
      </AnimatedGradientText>
    </div>
  );
} 