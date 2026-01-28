"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  Home,
  Wind,
  Wrench,
  Zap,
  TreeDeciduous,
  HardHat,
  Check,
} from "lucide-react";

const trades = [
  {
    id: "roofing",
    name: "Roofing",
    icon: Home,
  },
  {
    id: "hvac",
    name: "HVAC",
    icon: Wind,
  },
  {
    id: "plumbing",
    name: "Plumbing",
    icon: Wrench,
  },
  {
    id: "electrical",
    name: "Electrical",
    icon: Zap,
  },
  {
    id: "landscaping",
    name: "Landscaping",
    icon: TreeDeciduous,
  },
  {
    id: "general",
    name: "General Contractor",
    icon: HardHat,
  },
];

export default function OnboardingStep2() {
  const router = useRouter();
  const [selectedTrade, setSelectedTrade] = useState<string | null>(null);
  const [otherTrade, setOtherTrade] = useState("");

  const isOtherSelected = selectedTrade === "other";
  const canContinue = selectedTrade && (selectedTrade !== "other" || otherTrade.trim());

  const handleContinue = () => {
    if (canContinue) {
      router.push("/onboarding/step-3");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => router.push("/onboarding")}
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>

          {/* Progress dots */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="w-2 h-2 rounded-full bg-border" />
          </div>

          <div className="w-14" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-5 py-8 flex flex-col">
        {/* Step indicator */}
        <p className="text-sm text-muted-foreground font-medium mb-2">
          Step 2 of 3
        </p>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-foreground mb-2 text-balance">
          {"What's Your Trade?"}
        </h1>
        <p className="text-muted-foreground mb-8">
          {"We'll pre-load common services for your industry"}
        </p>

        {/* Trade cards grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {trades.map((trade) => {
            const isSelected = selectedTrade === trade.id;
            const Icon = trade.icon;

            return (
              <button
                key={trade.id}
                onClick={() => setSelectedTrade(trade.id)}
                className={`relative flex flex-col items-center justify-center h-[120px] rounded-xl border-2 transition-all duration-200 ${
                  isSelected
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border bg-card hover:border-primary/40 hover:bg-muted/50"
                }`}
              >
                {/* Checkmark */}
                {isSelected && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                )}

                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    isSelected ? "bg-primary/10" : "bg-muted"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      isSelected ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                </div>

                <span
                  className={`text-sm font-medium text-center px-2 ${
                    isSelected ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {trade.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Other option */}
        <div className="mb-8">
          <button
            onClick={() => setSelectedTrade("other")}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 ${
              isOtherSelected
                ? "border-primary bg-primary/5"
                : "border-border bg-card hover:border-primary/40"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                isOtherSelected ? "border-primary bg-primary" : "border-muted-foreground"
              }`}
            >
              {isOtherSelected && (
                <Check className="w-3 h-3 text-primary-foreground" />
              )}
            </div>
            <span
              className={`font-medium ${
                isOtherSelected ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Other
            </span>
          </button>

          {/* Other text input */}
          {isOtherSelected && (
            <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-200">
              <Input
                type="text"
                placeholder="Enter your trade..."
                value={otherTrade}
                onChange={(e) => setOtherTrade(e.target.value)}
                className="h-14 text-base px-4 border-2 focus-visible:ring-primary"
                autoFocus
              />
            </div>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <button
            onClick={() => router.push("/onboarding")}
            className="text-muted-foreground hover:text-foreground font-medium transition-colors"
          >
            Back
          </button>

          <Button
            onClick={handleContinue}
            disabled={!canContinue}
            size="lg"
            className="h-14 px-8 text-base font-semibold rounded-xl disabled:opacity-50"
          >
            Continue
          </Button>
        </div>
      </main>
    </div>
  );
}
