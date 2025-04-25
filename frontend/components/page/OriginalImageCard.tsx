"use client";

import { Image as ImageIcon } from "lucide-react";
import { ModernCard } from "@/components/ui/modern-card";
import { cn } from "@/lib/utils";

interface OriginalImageCardProps {
  originalImage: string | null;
}

export function OriginalImageCard({ originalImage }: OriginalImageCardProps) {
  return (
    <ModernCard 
      title="Original Image" 
      className="md:col-span-1"
      withCornerIcons={true}
    >
      <div className="relative flex items-center justify-center w-full aspect-square rounded-lg overflow-hidden bg-background/30 backdrop-blur-sm">
        {originalImage ? (
          <div className="relative w-full h-full">
            {/* Subtle border gradient animation */}
            <div className="absolute inset-0 z-0 rounded-lg bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 [mask-image:linear-gradient(black,transparent)] animate-gradient" />
            
            {/* Image with animation */}
            <div className="relative z-10 w-full h-full overflow-hidden rounded-md m-[2px]">
              <img
                src={originalImage}
                alt="Original Upload"
                className="rounded-md object-contain w-full h-full bg-card/30 p-2 transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center space-y-3 p-4">
            <div className="h-14 w-14 rounded-full bg-muted/30 flex items-center justify-center">
              <ImageIcon className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Upload an image to see the original.
            </p>
          </div>
        )}
      </div>
    </ModernCard>
  );
} 