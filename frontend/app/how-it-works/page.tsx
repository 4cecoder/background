"use client";

import { motion } from "framer-motion";
import { FileImage, Image, Sparkles, Download } from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      title: "Upload Your Image",
      description: "Upload any JPG, PNG, or WebP image up to the size limit for your plan.",
      icon: <FileImage className="h-8 w-8" />,
    },
    {
      title: "AI Background Removal",
      description: "Our advanced AI processes your image and identifies the subject, separating it from the background.",
      icon: <Sparkles className="h-8 w-8" />,
    },
    {
      title: "Preview & Refine",
      description: "Preview the result and use our refinement tools to make any necessary adjustments.",
      icon: <Image className="h-8 w-8" />,
    },
    {
      title: "Download & Use",
      description: "Download your processed image with a transparent background in PNG format, ready for use anywhere.",
      icon: <Download className="h-8 w-8" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Our AI-powered background removal process is simple, fast, and produces high-quality results.
        </p>
      </div>

      {/* Steps section */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center p-6 bg-card/50 rounded-xl border border-border/40"
            variants={itemVariants}
          >
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-muted-foreground">{step.description}</p>
            <div className="mt-4 text-xs text-muted-foreground">
              Step {index + 1}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Technology section */}
      <div className="bg-card/30 rounded-xl border border-border/40 p-8 mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Our Technology</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            We use cutting-edge machine learning models to provide high-quality background removal.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card/50 p-6 rounded-xl border border-border/30">
            <h3 className="font-semibold mb-2 flex items-center">
              <span className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mr-2">1</span>
              Image Analysis
            </h3>
            <p className="text-sm text-muted-foreground">
              Our AI analyzes every pixel of your image, identifying edges, colors, and patterns to understand the content.
            </p>
          </div>
          
          <div className="bg-card/50 p-6 rounded-xl border border-border/30">
            <h3 className="font-semibold mb-2 flex items-center">
              <span className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mr-2">2</span>
              Subject Detection
            </h3>
            <p className="text-sm text-muted-foreground">
              Using advanced semantic segmentation, our model accurately identifies people, products, and other subjects.
            </p>
          </div>
          
          <div className="bg-card/50 p-6 rounded-xl border border-border/30">
            <h3 className="font-semibold mb-2 flex items-center">
              <span className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mr-2">3</span>
              Edge Refinement
            </h3>
            <p className="text-sm text-muted-foreground">
              Our proprietary algorithms ensure clean, precise edges, even with complicated subjects like hair and translucent materials.
            </p>
          </div>
        </div>
      </div>

      {/* Use cases section */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Popular Use Cases</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            BackgroundAI helps people across various industries create professional-looking images.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card/30 rounded-xl overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
              <span className="text-3xl">🛍️</span>
            </div>
            <div className="p-5">
              <h3 className="font-semibold mb-1">E-commerce</h3>
              <p className="text-sm text-muted-foreground">Create clean product photos with transparent backgrounds for your online store.</p>
            </div>
          </div>
          
          <div className="bg-card/30 rounded-xl overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center">
              <span className="text-3xl">👔</span>
            </div>
            <div className="p-5">
              <h3 className="font-semibold mb-1">Professional Profiles</h3>
              <p className="text-sm text-muted-foreground">Create professional headshots for LinkedIn and other professional networks.</p>
            </div>
          </div>
          
          <div className="bg-card/30 rounded-xl overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-primary/5 to-accent/15 flex items-center justify-center">
              <span className="text-3xl">🎨</span>
            </div>
            <div className="p-5">
              <h3 className="font-semibold mb-1">Graphic Design</h3>
              <p className="text-sm text-muted-foreground">Extract elements from images to use in compositions, collages, and designs.</p>
            </div>
          </div>
          
          <div className="bg-card/30 rounded-xl overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-accent/15 to-primary/5 flex items-center justify-center">
              <span className="text-3xl">📱</span>
            </div>
            <div className="p-5">
              <h3 className="font-semibold mb-1">Social Media</h3>
              <p className="text-sm text-muted-foreground">Create eye-catching social media posts with subjects on custom backgrounds.</p>
            </div>
          </div>
          
          <div className="bg-card/30 rounded-xl overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-primary/15 to-accent/5 flex items-center justify-center">
              <span className="text-3xl">📸</span>
            </div>
            <div className="p-5">
              <h3 className="font-semibold mb-1">Photography</h3>
              <p className="text-sm text-muted-foreground">Easily change backgrounds in portrait photography or product shoots.</p>
            </div>
          </div>
          
          <div className="bg-card/30 rounded-xl overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-accent/5 to-primary/15 flex items-center justify-center">
              <span className="text-3xl">🖥️</span>
            </div>
            <div className="p-5">
              <h3 className="font-semibold mb-1">Web Development</h3>
              <p className="text-sm text-muted-foreground">Create transparent PNGs for websites and web applications.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="text-center bg-gradient-to-b from-primary/5 to-background p-10 rounded-xl border border-border/20">
        <h2 className="text-2xl font-bold mb-4">Ready to Remove Backgrounds?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
          Start with our free plan to experience BackgroundAI's powerful technology.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href="/" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Try For Free
          </a>
          <a 
            href="/pricing" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-card border border-border hover:border-primary/20 transition-colors"
          >
            View Pricing
          </a>
        </div>
      </div>
    </div>
  );
} 