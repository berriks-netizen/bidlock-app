"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  Camera,
  ClipboardList,
  Check,
  ChevronDown,
  Plus,
  Trash2,
  Sparkles,
} from "lucide-react";

type QuickOption = "scan" | "template" | null;

interface ServiceRow {
  id: string;
  name: string;
  price: string;
}

export default function OnboardingStep3() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<QuickOption>(null);
  const [manualExpanded, setManualExpanded] = useState(false);
  const [services, setServices] = useState<ServiceRow[]>([
    { id: "1", name: "", price: "" },
    { id: "2", name: "", price: "" },
    { id: "3", name: "", price: "" },
  ]);

  const userTrade = "Roofing"; // This would come from previous step in real app

  const handleOptionSelect = (option: QuickOption) => {
    setSelectedOption(option);
    setManualExpanded(false);
  };

  const handleManualToggle = () => {
    setManualExpanded(!manualExpanded);
    if (!manualExpanded) {
      setSelectedOption(null);
    }
  };

  const updateService = (id: string, field: "name" | "price", value: string) => {
    setServices(
      services.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const addServiceRow = () => {
    setServices([
      ...services,
      { id: Date.now().toString(), name: "", price: "" },
    ]);
  };

  const removeServiceRow = (id: string) => {
    if (services.length > 1) {
      setServices(services.filter((s) => s.id !== id));
    }
  };

  const hasManualEntries = services.some((s) => s.name.trim() || s.price.trim());
  const canContinue = selectedOption !== null || hasManualEntries;

  const handleFinish = () => {
    // In real app, would save data and redirect to dashboard
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 border-b border-border">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Progress Dots */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <div className="w-2 h-2 rounded-full bg-primary" />
          <div className="w-2 h-2 rounded-full bg-primary" />
        </div>

        <div className="w-16" />
      </header>

      {/* Content */}
      <main className="flex-1 px-5 py-6 overflow-y-auto">
        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-medium text-primary">
            Step 3 of 3
          </span>
          <span className="text-sm text-muted-foreground">- Almost Done!</span>
          <Sparkles className="w-4 h-4 text-primary" />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-foreground mb-2 text-balance">
          Add Your Services (Optional)
        </h1>
        <p className="text-muted-foreground mb-8">
          Speed up future proposals. You can skip this and add prices later.
        </p>

        {/* Quick Option Cards */}
        <div className="space-y-4 mb-6">
          {/* Scan Price Sheet Card */}
          <button
            onClick={() => handleOptionSelect("scan")}
            className={`relative w-full p-5 rounded-xl border-2 text-left transition-all ${
              selectedOption === "scan"
                ? "border-primary bg-primary/5 shadow-md"
                : "border-border bg-card hover:border-primary/40 hover:shadow-sm"
            }`}
          >
            {selectedOption === "scan" && (
              <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
            <div className="flex items-start gap-4">
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${
                  selectedOption === "scan"
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/10 text-primary"
                }`}
              >
                <Camera className="w-7 h-7" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-lg mb-1">
                  Scan Price Sheet
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Take a photo of your rate card - we'll extract prices automatically
                </p>
              </div>
            </div>
            {selectedOption === "scan" && (
              <div className="mt-4 pt-4 border-t border-primary/20">
                <div className="flex items-center gap-2 text-sm text-primary font-medium">
                  <Camera className="w-4 h-4" />
                  Camera will open when you tap Finish Setup
                </div>
              </div>
            )}
          </button>

          {/* Use Starter Template Card */}
          <button
            onClick={() => handleOptionSelect("template")}
            className={`relative w-full p-5 rounded-xl border-2 text-left transition-all ${
              selectedOption === "template"
                ? "border-primary bg-primary/5 shadow-md"
                : "border-border bg-card hover:border-primary/40 hover:shadow-sm"
            }`}
          >
            {selectedOption === "template" && (
              <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
            <div className="flex items-start gap-4">
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${
                  selectedOption === "template"
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/10 text-primary"
                }`}
              >
                <ClipboardList className="w-7 h-7" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-lg mb-1">
                  Use Starter Template
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We'll pre-fill common services for{" "}
                  <span className="font-medium text-foreground">{userTrade}</span>{" "}
                  with average prices
                </p>
              </div>
            </div>
            {selectedOption === "template" && (
              <div className="mt-4 pt-4 border-t border-primary/20">
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Includes:</span>{" "}
                  Roof inspection, Shingle repair, Flashing repair, Full replacement, Gutter cleaning, and more...
                </div>
              </div>
            )}
          </button>
        </div>

        {/* Manual Entry Collapsible */}
        <div className="border border-border rounded-xl overflow-hidden bg-card">
          <button
            onClick={handleManualToggle}
            className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
          >
            <span className="font-medium text-foreground">Manual Entry</span>
            <ChevronDown
              className={`w-5 h-5 text-muted-foreground transition-transform ${
                manualExpanded ? "rotate-180" : ""
              }`}
            />
          </button>

          {manualExpanded && (
            <div className="px-4 pb-4 border-t border-border">
              <p className="text-sm text-muted-foreground py-3">
                Add your services and prices one by one
              </p>

              <div className="space-y-3">
                {services.map((service, index) => (
                  <div key={service.id} className="flex items-center gap-2">
                    <div className="flex-1">
                      <Input
                        placeholder={`Service ${index + 1}`}
                        value={service.name}
                        onChange={(e) =>
                          updateService(service.id, "name", e.target.value)
                        }
                        className="h-12 text-base"
                      />
                    </div>
                    <div className="w-28 relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        $
                      </span>
                      <Input
                        placeholder="0.00"
                        value={service.price}
                        onChange={(e) =>
                          updateService(service.id, "price", e.target.value)
                        }
                        className="h-12 text-base pl-7"
                        type="number"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    {services.length > 1 && (
                      <button
                        onClick={() => removeServiceRow(service.id)}
                        className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={addServiceRow}
                className="mt-3 flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add another service
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <footer className="px-5 py-4 border-t border-border bg-card">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => router.push("/")}
            className="text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            Skip
          </button>
          <Button
            onClick={handleFinish}
            disabled={!canContinue}
            className="h-14 px-8 text-base font-semibold rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Finish Setup
          </Button>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-3">
          You can always update your services later in Settings
        </p>
      </footer>
    </div>
  );
}
