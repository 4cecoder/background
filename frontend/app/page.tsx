"use client"; // Mark as client component

import { useBackgroundRemoval } from "@/hooks/useBackgroundRemoval";
import { TitleSection } from "@/components/page/TitleSection";
import { UploadCard } from "@/components/page/UploadCard";
import { OriginalImageCard } from "@/components/page/OriginalImageCard";
import { ProcessedImageCard } from "@/components/page/ProcessedImageCard";
import { UserCreditsProvider, useUserCredits } from "@/contexts/UserCreditsContext";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";

function HomeContent() {
  const { credits, useCredits } = useUserCredits();
  
  const {
    originalImage,
    processedImage,
    isLoading,
    error,
    handleFileChange,
    handleRemoveBackground: originalHandleRemoveBackground,
    clearImages,
  } = useBackgroundRemoval();

  // Wrap the original handleRemoveBackground to check credits first
  const handleRemoveBackground = async () => {
    if (credits.available < 1) {
      toast.error("You've used all your credits. Upgrade your plan to get more credits.");
      return;
    }
    
    // Try to use 1 credit
    const success = await useCredits(1);
    if (!success) {
      toast.error("Failed to use credits. Please try again.");
      return;
    }
    
    // If credit usage was successful, proceed with background removal
    await originalHandleRemoveBackground();
  };

  // Staggered animation for cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 font-[family-name:var(--font-geist-sans)]">
      {/* Credits display for logged in users */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-sm">
          <span className="font-medium">{credits.available} credits remaining</span>
          <Link 
            href="/dashboard" 
            className="ml-2 text-primary hover:underline text-xs"
          >
            View Dashboard
          </Link>
        </div>
      </div>
      
      {/* Enhanced title with a decorative line underneath */}
      <div className="relative pb-8 mb-6 text-center">
        <TitleSection />
        <div className="absolute left-1/2 bottom-0 h-1 w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent transform -translate-x-1/2"></div>
      </div>

      {/* Brief description */}
      <div className="text-center mb-12">
        <p className="text-base text-muted-foreground max-w-2xl mx-auto">
          Upload your image and our AI will magically remove the background, 
          giving you a clean, transparent result in seconds.
        </p>
      </div>

      {/* Cards grid with animation */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={cardVariants}>
          <UploadCard
            handleFileChange={handleFileChange}
            handleRemoveBackground={handleRemoveBackground}
            clearImages={clearImages}
            originalImage={originalImage}
            isLoading={isLoading}
            error={error}
            creditsAvailable={credits.available}
          />
        </motion.div>

        <motion.div variants={cardVariants}>
          <OriginalImageCard originalImage={originalImage} />
        </motion.div>

        <motion.div variants={cardVariants}>
          <ProcessedImageCard
            originalImage={originalImage}
            processedImage={processedImage}
            isLoading={isLoading}
          />
        </motion.div>
      </motion.div>
      
      {/* Call to action for upgrading */}
      <div className="mt-16 text-center">
        <h2 className="text-xl font-bold mb-3">Need more processing power?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
          Upgrade to a Pro or Business plan for more credits, higher resolution support, and advanced features.
        </p>
        <Link 
          href="/pricing" 
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          View Plans
        </Link>
      </div>
      
      {/* Footer with tech details */}
      <div className="mt-16 pt-6 border-t border-border/20 text-center">
        <p className="text-xs text-muted-foreground">
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-primary/5 text-primary/70 text-xs font-medium mr-2">
            Client-side AI
          </span>
          Powered by <a href="https://github.com/imgly/background-removal-js" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">@imgly/background-removal</a>
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <UserCreditsProvider>
      <HomeContent />
    </UserCreditsProvider>
  );
}
