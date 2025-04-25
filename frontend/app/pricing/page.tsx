"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const pricingPlans = [
    {
      name: "Free",
      description: "For casual users who need basic background removal",
      price: {
        monthly: 0,
        yearly: 0,
      },
      features: [
        "5 background removals per month",
        "720p max resolution",
        "Basic refinement tools",
        "No watermark",
        "5MB file size limit",
      ],
      cta: "Get Started",
      href: "/signup?plan=free",
      popular: false,
    },
    {
      name: "Pro",
      description: "For professionals who need more features and higher quality",
      price: {
        monthly: 9.99,
        yearly: 7.99, // Monthly equivalent when billed yearly
      },
      features: [
        "50 background removals per month",
        "4K max resolution",
        "Advanced refinement tools",
        "No watermark",
        "25MB file size limit",
        "Batch processing (up to 5 images)",
        "Priority support",
      ],
      cta: "Start Free Trial",
      href: "/signup?plan=pro",
      popular: true,
    },
    {
      name: "Business",
      description: "For teams and businesses with high-volume needs",
      price: {
        monthly: 29.99,
        yearly: 24.99, // Monthly equivalent when billed yearly
      },
      features: [
        "Unlimited background removals",
        "8K max resolution",
        "Advanced refinement tools",
        "No watermark",
        "50MB file size limit",
        "Batch processing (unlimited)",
        "API access",
        "Dedicated support",
        "Team collaboration",
      ],
      cta: "Contact Sales",
      href: "/contact",
      popular: false,
    },
  ];

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that works best for your needs. All plans include our
          high-quality AI background removal technology.
        </p>
        
        {/* Billing cycle toggle */}
        <div className="flex justify-center mt-8">
          <div className="relative inline-flex items-center p-1 rounded-full bg-card border border-border/40">
            <button
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                billingCycle === "monthly" 
                  ? "text-white font-semibold" 
                  : "text-foreground hover:text-primary"
              )}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
              {billingCycle === "monthly" && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary shadow-sm"
                  layoutId="billingCycle"
                  initial={false}
                  transition={{ duration: 0.2 }}
                  style={{ zIndex: -1 }}
                />
              )}
            </button>
            <button
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                billingCycle === "yearly" 
                  ? "text-white font-semibold" 
                  : "text-foreground hover:text-primary"
              )}
              onClick={() => setBillingCycle("yearly")}
            >
              Yearly
              {billingCycle === "yearly" && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary shadow-sm"
                  layoutId="billingCycle"
                  initial={false}
                  transition={{ duration: 0.2 }}
                  style={{ zIndex: -1 }}
                />
              )}
            </button>
          </div>
          {billingCycle === "yearly" && (
            <div className="ml-4 inline-flex items-center rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-xs font-medium">
              Save 20%
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={plan.name}
            className={cn(
              "relative flex flex-col rounded-xl overflow-hidden border bg-card backdrop-blur-sm",
              plan.popular ? "border-primary" : "border-border/40"
            )}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            transition={{ delay: index * 0.1 }}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0">
                <div className="text-xs font-semibold bg-primary text-primary-foreground py-1 px-3 rounded-bl-lg">
                  Most Popular
                </div>
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              <div className="mt-5">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">
                    {plan.price[billingCycle] === 0 ? "Free" : `$${plan.price[billingCycle]}`}
                  </span>
                  {plan.price[billingCycle] > 0 && (
                    <span className="ml-1 text-sm text-muted-foreground">/month</span>
                  )}
                </div>
                {billingCycle === "yearly" && plan.price.yearly > 0 && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Billed yearly (${plan.price.yearly * 12}/year)
                  </p>
                )}
              </div>
            </div>
            <div className="flex-1 p-6 bg-card/50 border-t border-border/30">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 border-t border-border/30">
              <Link href={plan.href}>
                <Button 
                  className={cn(
                    "w-full",
                    plan.popular ? "bg-primary hover:bg-primary/90" : "bg-card hover:bg-card/90 border border-border hover:border-primary/20"
                  )}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left mt-8">
          <div className="bg-card/50 p-6 rounded-xl border border-border/40">
            <h3 className="font-semibold mb-2">Can I upgrade or downgrade my plan?</h3>
            <p className="text-sm text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated difference. When downgrading, the new rate takes effect on your next billing cycle.</p>
          </div>
          <div className="bg-card/50 p-6 rounded-xl border border-border/40">
            <h3 className="font-semibold mb-2">How does the credit system work?</h3>
            <p className="text-sm text-muted-foreground">Each background removal uses 1 credit. Credits reset monthly or yearly depending on your billing cycle. Unused credits don't roll over to the next billing period.</p>
          </div>
          <div className="bg-card/50 p-6 rounded-xl border border-border/40">
            <h3 className="font-semibold mb-2">What happens if I use all my credits?</h3>
            <p className="text-sm text-muted-foreground">Once you've used all your allotted credits, you can purchase additional credits or upgrade to a higher tier plan with more credits.</p>
          </div>
          <div className="bg-card/50 p-6 rounded-xl border border-border/40">
            <h3 className="font-semibold mb-2">Is my payment information secure?</h3>
            <p className="text-sm text-muted-foreground">Yes, we use industry-standard security measures to protect your payment information. We partner with trusted payment processors and never store your full credit card details on our servers.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 