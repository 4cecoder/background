"use client";

import { Loader2, Sparkles } from "lucide-react";
import { ModernCard } from "@/components/ui/modern-card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProcessedImageCardProps {
  originalImage: string | null;
  processedImage: string | null;
  isLoading: boolean;
}

export function ProcessedImageCard({
  originalImage,
  processedImage,
  isLoading,
}: ProcessedImageCardProps) {
  return (
    <ModernCard 
      title="Processed Image" 
      className="md:col-span-1"
      withCornerIcons={true}
    >
      <div className="relative flex items-center justify-center w-full aspect-square rounded-lg overflow-hidden bg-background/30 backdrop-blur-sm">
        {isLoading && !processedImage && (
          <div className="flex flex-col items-center justify-center text-center space-y-4 p-6">
            <div className="relative">
              {/* Spinner ring */}
              <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent opacity-75 animate-spin w-16 h-16" />
              <div className="rounded-full bg-background/80 p-3">
                <Loader2 className="h-8 w-8 text-primary animate-pulse" />
              </div>
            </div>
            <p className="text-sm font-medium text-primary">Processing your image...</p>
          </div>
        )}

        {!isLoading && processedImage && (
          <div className="relative w-full h-full">
            {/* Shimmer effect behind for processing result */}
            <div className="absolute inset-0 z-0 rounded-lg bg-gradient-to-tr from-primary/20 via-accent/5 to-primary/20 animate-gradient opacity-70" />
            
            {/* Image with entrance animation */}
            <motion.div 
              className="relative z-10 w-full h-full overflow-hidden rounded-md m-[2px] backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute top-3 right-3 z-20 rounded-full bg-background/70 p-1.5 backdrop-blur-sm border border-border/40">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <img
                src={processedImage}
                alt="Processed Image"
                className="rounded-md object-contain w-full h-full p-2 bg-card/50"
              />
            </motion.div>
          </div>
        )}

        {!isLoading && !processedImage && (
          <div className="flex flex-col items-center justify-center text-center space-y-3 p-4">
            <div className="relative h-14 w-14 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-muted/20 animate-ping opacity-50" />
              <div className="absolute inset-1 rounded-full bg-muted/30" />
              <Sparkles className="relative z-10 h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              {originalImage
                ? "Click 'Remove Background' to process."
                : "Upload an image first."}
            </p>
          </div>
        )}
      </div>
    </ModernCard>
  );
} 