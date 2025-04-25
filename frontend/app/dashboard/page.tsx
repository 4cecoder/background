"use client";

import { CreditsDisplay } from "@/components/dashboard/CreditsDisplay";
import { UserCreditsProvider } from "@/contexts/UserCreditsContext";
import { useState } from "react";
import { FileImage, ArrowDown, RotateCcw, Clock, LineChart } from "lucide-react";

export default function DashboardPage() {
  const [view, setView] = useState<"overview" | "history">("overview");
  
  // Mock usage history for demonstration
  const usageHistory = [
    { id: 1, date: "2023-11-10T14:30:00Z", filename: "product_image_1.jpg", size: "1.2MB", status: "success" },
    { id: 2, date: "2023-11-09T10:15:00Z", filename: "profile_photo.png", size: "3.5MB", status: "success" },
    { id: 3, date: "2023-11-08T17:45:00Z", filename: "team_photo.jpg", size: "4.8MB", status: "success" },
    { id: 4, date: "2023-11-07T09:20:00Z", filename: "banner_design.png", size: "2.7MB", status: "failed" },
    { id: 5, date: "2023-11-06T13:10:00Z", filename: "product_catalog.jpg", size: "3.1MB", status: "success" },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  return (
    <UserCreditsProvider>
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Manage your account and view your usage history
            </p>
          </div>
          <div className="inline-flex items-center rounded-md border border-border/40 p-1 bg-card/50">
            <button
              onClick={() => setView("overview")}
              className={`px-3 py-1.5 text-sm font-medium rounded-sm transition-colors ${
                view === "overview" 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-card/80"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setView("history")}
              className={`px-3 py-1.5 text-sm font-medium rounded-sm transition-colors ${
                view === "history" 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-card/80"
              }`}
            >
              Usage History
            </button>
          </div>
        </div>

        {view === "overview" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <CreditsDisplay />
            </div>
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-card rounded-xl border border-border/40 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Quick Stats</h3>
                  <LineChart className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-border/30">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <FileImage className="h-4 w-4 text-primary" />
                      </div>
                      <span>Processed Images</span>
                    </div>
                    <span className="font-semibold">5</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-border/30">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Clock className="h-4 w-4 text-primary" />
                      </div>
                      <span>Avg. Processing Time</span>
                    </div>
                    <span className="font-semibold">3.2s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <RotateCcw className="h-4 w-4 text-primary" />
                      </div>
                      <span>Success Rate</span>
                    </div>
                    <span className="font-semibold">98%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-xl border border-border/40 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Plan Details</h3>
                  <div className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    Free Plan
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  You're currently on the Free plan with basic features.
                  Upgrade for more credits and advanced features.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center text-sm">
                    <ArrowDown className="h-4 w-4 text-primary mr-2" />
                    <span>5MB file size limit</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <ArrowDown className="h-4 w-4 text-primary mr-2" />
                    <span>Basic refinement tools</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <ArrowDown className="h-4 w-4 text-primary mr-2" />
                    <span>5 credits per month</span>
                  </div>
                </div>
                <div className="mt-6">
                  <a 
                    href="/pricing" 
                    className="w-full inline-flex items-center justify-center px-4 py-2 rounded-lg border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    Upgrade Plan
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-card rounded-xl border border-border/40 overflow-hidden">
            <div className="p-6 border-b border-border/30">
              <h2 className="text-xl font-semibold">Recent Activity</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Your recent background removal history
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-card/50 border-b border-border/30">
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">File</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Size</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {usageHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-card/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {formatDate(item.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm flex items-center">
                        <FileImage className="h-4 w-4 text-muted-foreground mr-2" />
                        {item.filename}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {item.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span 
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            item.status === "success" 
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          }`}
                        >
                          {item.status === "success" ? "Completed" : "Failed"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {usageHistory.length === 0 && (
              <div className="p-8 text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <FileImage className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-1">No activity yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  You haven't processed any images yet. Start by removing backgrounds from your images.
                </p>
                <a 
                  href="/" 
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Remove Background
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </UserCreditsProvider>
  );
} 