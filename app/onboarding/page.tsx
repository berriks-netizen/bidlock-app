"use client";

import { useState } from "react";
import { ArrowLeft, Camera, ImageIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type UploadOption = "photo" | "upload" | "skip" | null;

const uploadOptions = [
  {
    id: "photo" as const,
    icon: Camera,
    title: "Take Photo",
    description: "Snap your business card or truck logo",
  },
  {
    id: "upload" as const,
    icon: ImageIcon,
    title: "Upload Image",
    description: "Choose from your photos",
  },
  {
    id: "skip" as const,
    icon: ArrowRight,
    title: "Skip for Now",
    description: "Use text-based header instead",
  },
];

export default function OnboardingStep1() {
  const [selectedOption, setSelectedOption] = useState<UploadOption>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 safe-area-top">
        <Link
          href="/"
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors py-2 -ml-2 px-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </Link>
        <div className="text-sm font-medium text-muted-foreground">
          Step 1 of 3
        </div>
        <div className="w-16" /> {/* Spacer for centering */}
      </header>

      {/* Progress Dots */}
      <div className="flex items-center justify-center gap-2 px-4 pb-6">
        <div className="w-8 h-2 rounded-full bg-primary" />
        <div className="w-8 h-2 rounded-full bg-muted" />
        <div className="w-8 h-2 rounded-full bg-muted" />
      </div>

      {/* Main Content */}
      <main className="flex-1 px-6 pb-8 flex flex-col">
        {/* Heading Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-3 text-balance">
            Add Your Business Logo
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            {"We'll add this to every proposal"}
            <br />
            <span className="text-sm">(takes 30 seconds)</span>
          </p>
        </div>

        {/* Upload Options */}
        <div className="flex flex-col gap-3 flex-1">
          {uploadOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedOption === option.id;

            return (
              <button
                key={option.id}
                onClick={() => setSelectedOption(option.id)}
                className={`
                  w-full min-h-[80px] p-5 rounded-2xl border-2 transition-all duration-200
                  flex items-center gap-4 text-left
                  ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border bg-card hover:border-primary/50 hover:bg-muted/50"
                  }
                `}
              >
                <div
                  className={`
                  w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-colors
                  ${isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}
                `}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className={`font-semibold text-base mb-0.5 ${isSelected ? "text-primary" : "text-foreground"}`}
                  >
                    {option.title}
                  </div>
                  <div className="text-sm text-muted-foreground leading-snug">
                    {option.description}
                  </div>
                </div>
                {/* Selection Indicator */}
                <div
                  className={`
                  w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center transition-all
                  ${isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"}
                `}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 pt-4">
          <Button
            size="lg"
            disabled={!selectedOption}
            className={`
              w-full h-16 text-lg font-semibold rounded-2xl transition-all duration-200
              ${
                selectedOption
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }
            `}
          >
            Continue
          </Button>
          <p className="text-center text-xs text-muted-foreground mt-4">
            You can always change this later in settings
          </p>
        </div>
      </main>
    </div>
  );
}
