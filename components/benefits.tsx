"use client"

import { Clock, WifiOff, DollarSign } from "lucide-react"

const benefits = [
  {
    icon: Clock,
    title: "5-Minute Setup",
    description: "Add your logo, set your rates, and start creating professional proposals immediately. No training required."
  },
  {
    icon: WifiOff,
    title: "Works Offline",
    description: "Create and save proposals on-site, even in basements or remote areas. Sync automatically when you're back online."
  },
  {
    icon: DollarSign,
    title: "Get Paid Faster",
    description: "Accept deposits on the spot with integrated payments. Customers can sign and pay right from the proposal."
  }
]

export function Benefits() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-4">
          Built for <span className="text-primary">busy contractors</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
          Everything you need to close more jobs without the paperwork headache
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <div 
              key={benefit.title}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-3">
                {benefit.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
