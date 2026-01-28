"use client"

import { Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PricingProps {
  onCtaClick: () => void
}

const features = [
  "Unlimited proposals",
  "Custom branding & logo",
  "Offline mode",
  "Accept payments",
  "Email & SMS delivery",
  "Customer signatures",
  "Export to PDF",
  "Priority support"
]

export function Pricing({ onCtaClick }: PricingProps) {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-4">
          Simple, honest pricing
        </h2>
        <p className="text-center text-muted-foreground mb-10">
          One plan. Everything included. No surprises.
        </p>
        
        <div className="bg-card border-2 border-primary rounded-2xl p-6 md:p-8 shadow-xl shadow-primary/10">
          <div className="text-center mb-6">
            <div className="flex items-baseline justify-center gap-1 mb-2">
              <span className="text-5xl md:text-6xl font-bold text-foreground">$69</span>
              <span className="text-xl text-muted-foreground">/month</span>
            </div>
            <p className="text-muted-foreground font-medium">
              No contracts, cancel anytime
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground text-sm">{feature}</span>
              </div>
            ))}
          </div>
          
          <Button 
            size="lg"
            onClick={onCtaClick}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 text-lg rounded-xl shadow-lg shadow-primary/25"
          >
            Start Free 7-Day Trial
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <p className="text-center text-sm text-muted-foreground mt-4">
            No credit card required to start
          </p>
        </div>
      </div>
    </section>
  )
}
