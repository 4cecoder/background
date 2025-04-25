"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define types
type UserPlan = "free" | "pro" | "business";

interface UserCreditsData {
  available: number;
  used: number;
  planType: UserPlan;
  maxCredits: number;
  resetDate: string; // ISO date string
}

interface UserCreditsContextType {
  credits: UserCreditsData;
  useCredits: (amount: number) => Promise<boolean>;
  refreshCredits: () => Promise<void>;
  loading: boolean;
}

// Create the context with a default value
const UserCreditsContext = createContext<UserCreditsContextType | undefined>(undefined);

// Mock API call - in a real app, this would call your backend
const fetchUserCredits = async (): Promise<UserCreditsData> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock data - in a real app, this would come from your API
  const today = new Date();
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  
  // For demo purposes we're loading from localStorage if available
  const storedCredits = localStorage.getItem('userCredits');
  if (storedCredits) {
    return JSON.parse(storedCredits);
  }
  
  // Default starting values
  return {
    available: 5,
    used: 0,
    planType: "free" as UserPlan,
    maxCredits: 5,
    resetDate: nextMonth.toISOString(),
  };
};

// Mock API call to use credits
const apiUseCredits = async (amount: number): Promise<boolean> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Get current credits
  const storedCredits = localStorage.getItem('userCredits');
  let credits: UserCreditsData;
  
  if (storedCredits) {
    credits = JSON.parse(storedCredits);
  } else {
    credits = await fetchUserCredits();
  }
  
  // Check if enough credits are available
  if (credits.available < amount) {
    return false;
  }
  
  // Update credits
  credits.available -= amount;
  credits.used += amount;
  
  // Save updated credits
  localStorage.setItem('userCredits', JSON.stringify(credits));
  
  return true;
};

// Provider component
export function UserCreditsProvider({ children }: { children: ReactNode }) {
  const [credits, setCredits] = useState<UserCreditsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Load user credits on mount
  useEffect(() => {
    refreshCredits();
  }, []);

  // Refresh credits from API
  const refreshCredits = async () => {
    setLoading(true);
    try {
      const data = await fetchUserCredits();
      setCredits(data);
    } catch (error) {
      console.error("Failed to fetch user credits:", error);
    } finally {
      setLoading(false);
    }
  };

  // Use credits
  const useCredits = async (amount: number): Promise<boolean> => {
    if (!credits || credits.available < amount) {
      return false;
    }

    try {
      const success = await apiUseCredits(amount);
      if (success) {
        await refreshCredits(); // Refresh credits after successful usage
      }
      return success;
    } catch (error) {
      console.error("Failed to use credits:", error);
      return false;
    }
  };

  // Provide a loading state while initial data is being fetched
  if (loading && !credits) {
    return null; // Or a loading spinner
  }

  return (
    <UserCreditsContext.Provider 
      value={{ 
        credits: credits as UserCreditsData, 
        useCredits, 
        refreshCredits,
        loading
      }}
    >
      {children}
    </UserCreditsContext.Provider>
  );
}

// Custom hook to use the context
export function useUserCredits() {
  const context = useContext(UserCreditsContext);
  if (context === undefined) {
    throw new Error("useUserCredits must be used within a UserCreditsProvider");
  }
  return context;
} 