"use client";

import { useUserCredits } from "@/contexts/UserCreditsContext";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Sparkles, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function CreditsDisplay() {
  const { credits, loading } = useUserCredits();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-primary/20 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-primary/10 rounded"></div>
              <div className="h-4 bg-primary/10 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  const percentUsed = Math.round((credits.used / credits.maxCredits) * 100);
  const isLow = credits.available <= Math.ceil(credits.maxCredits * 0.2);

  return (
    <Card className="p-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 h-16 w-16 -mt-8 -mr-8 bg-primary/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-0 left-0 h-20 w-20 -mb-10 -ml-10 bg-primary/5 rounded-full blur-xl"></div>
      
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">Your Credits</h3>
          <p className="text-sm text-muted-foreground">
            {credits.planType.charAt(0).toUpperCase() + credits.planType.slice(1)} Plan
          </p>
        </div>
        <div className="flex items-center text-primary">
          <Sparkles className="h-5 w-5" />
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">{credits.used} used</span>
          <span className="text-sm font-medium">{credits.maxCredits} total</span>
        </div>
        <Progress value={percentUsed} className="h-2" />
      </div>
      
      <div className="flex justify-between items-center">
        <div>
          <div className="text-2xl font-bold">{credits.available}</div>
          <div className="text-xs text-muted-foreground">Credits available</div>
          <div className="text-xs text-muted-foreground mt-1">
            Resets on {formatDate(credits.resetDate)}
          </div>
        </div>
        
        {isLow && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
              "flex items-center px-3 py-2 rounded-lg",
              "bg-destructive/10 text-destructive text-sm"
            )}
          >
            <AlertCircle className="h-4 w-4 mr-2" />
            <span>Low credits</span>
          </motion.div>
        )}
      </div>
      
      {isLow && (
        <div className="mt-4 pt-4 border-t border-border/40">
          <Link 
            href="/pricing" 
            className="text-sm font-medium text-primary hover:underline flex items-center"
          >
            Upgrade your plan
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 ml-1"
            >
              <path
                fillRule="evenodd"
                d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      )}
    </Card>
  );
} 