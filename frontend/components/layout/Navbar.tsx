"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Pricing", href: "/pricing" },
    { name: "How it Works", href: "/how-it-works" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="container flex h-16 items-center">
        <div className="flex items-center space-x-4 mr-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-8 w-8">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-primary"
              >
                <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.2" />
                <rect x="8" y="8" width="8" height="8" rx="1" fill="white" stroke="currentColor" />
                <path d="M14.5 13.5 16 12l2 2" stroke="currentColor" />
                <path d="m6 14 2 2" stroke="currentColor" />
                <path d="m14 6-2 2" stroke="currentColor" />
                <path d="m8 16 2-2 2 2" stroke="currentColor" />
              </svg>
            </div>
            <span className="font-semibold text-xl">BackgroundAI</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex flex-1 items-center justify-center">
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className={cn(
                    "text-sm font-medium transition-colors relative py-2 px-1",
                    pathname === link.href 
                      ? "text-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.name}
                  {pathname === link.href && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"
                      layoutId="navbar-indicator"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="flex items-center space-x-2 ml-auto">
          <Link href="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
          <Link href="/pricing">
            <Button className="bg-primary hover:bg-primary/90">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
} 