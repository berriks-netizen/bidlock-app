"use client"

import { Star, Quote } from "lucide-react"

export function Testimonials() {
  return (
    <section className="py-16 px-4 bg-muted/50">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            Lock in More Wins!
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Trusted by contractors like you
          </h2>
        </div>
        
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary">200+</p>
            <p className="text-sm text-muted-foreground">Contractors</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary">15k+</p>
            <p className="text-sm text-muted-foreground">Proposals Sent</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary">$2.4M</p>
            <p className="text-sm text-muted-foreground">Jobs Won</p>
          </div>
        </div>
      </div>
    </section>
  )
}
