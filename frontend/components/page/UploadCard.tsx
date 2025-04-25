"use client";

import { Loader2, RotateCcw, Upload, FileImage } from "lucide-react";
import { ModernCard } from "@/components/ui/modern-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UploadCardProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveBackground: () => Promise<void>;
  clearImages: () => void;
  originalImage: string | null;
  isLoading: boolean;
  error: string | null;
  creditsAvailable?: number;
}

export function UploadCard({
  handleFileChange,
  handleRemoveBackground,
  clearImages,
  originalImage,
  isLoading,
  error,
  creditsAvailable,
}: UploadCardProps) {
  const handleClear = () => {
    clearImages();
    const input = document.getElementById("picture") as HTMLInputElement;
    if (input) {
      input.value = "";
    }
  };

  return (
    <ModernCard 
      title="Upload Image" 
      withCornerIcons={true}
      className="md:col-span-1"
      contentClassName="gap-4"
    >
      {/* Custom file upload area */}
      <div className={cn(
        "relative flex flex-col items-center justify-center w-full min-h-[200px] rounded-lg",
        "border-2 border-dashed border-border/50 hover:border-primary/40 transition-colors",
        "bg-background/30 backdrop-blur-sm p-6"
      )}>
        <input
          id="picture"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isLoading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="flex flex-col items-center text-center mb-2">
          <FileImage className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-sm font-medium text-card-foreground">
            Drag & drop your image here
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            or click to browse
          </p>
        </div>
        
        <div className="mt-4 text-xs text-muted-foreground">
          Supports: JPG, PNG, WebP
        </div>
      </div>

      {/* Credits counter if available */}
      {typeof creditsAvailable === 'number' && (
        <div className="text-center text-xs text-muted-foreground">
          <span className={cn(
            creditsAvailable > 0 ? "text-primary" : "text-destructive"
          )}>
            {creditsAvailable} credits
          </span> available for background removal
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-2 mt-2">
        <Button
          onClick={handleRemoveBackground}
          disabled={!originalImage || isLoading || (typeof creditsAvailable === 'number' && creditsAvailable <= 0)}
          className={cn(
            "w-full relative overflow-hidden group",
            "bg-gradient-to-r from-primary/90 to-primary",
            "hover:from-primary hover:to-primary/90",
          )}
        >
          {/* Subtle shimmer effect on hover */}
          <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full group-hover:animate-shimmer" />
          
          {isLoading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
          ) : (
            <><Upload className="mr-2 h-4 w-4" /> Remove Background</>
          )}
        </Button>
        
        <Button
          variant="outline"
          onClick={handleClear}
          disabled={isLoading || !originalImage}
          className="w-full sm:w-auto border-border/50 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
          aria-label="Clear images"
        >
          <RotateCcw className="h-4 w-4 mr-1" /> Clear
        </Button>
      </div>
      
      {/* Error display */}
      {error && (
        <div className="mt-2 p-3 rounded-md border border-destructive/30 bg-destructive/10 text-sm text-destructive">
          <p className="flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor" 
              className="w-4 h-4 mr-2"
            >
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" 
                clipRule="evenodd" 
              />
            </svg>
            {error}
          </p>
        </div>
      )}
    </ModernCard>
  );
}