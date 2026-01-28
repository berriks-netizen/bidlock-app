"use client"

import { Star, Quote } from "lucide-react"

export function Testimonials() {
  return (
    <section className="py-16 px-4 bg-muted/50">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            Join 200+ contractors
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Trusted by contractors like you
          </h2>
        </div>
        
        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-lg border border-border relative">
          <Quote className="absolute top-6 left-6 w-10 h-10 text-primary/20" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            
            <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-6">
              {"\"I used to write estimates on the back of business cards. Now I send professional proposals before I even leave the driveway. Closed 3 extra jobs last month just because customers said my quote looked more professional than the competition.\""}
            </blockquote>
            
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-xl font-bold text-secondary-foreground">M</span>
              </div>
              <div>
                <p className="font-bold text-foreground">Mike Thompson</p>
                <p className="text-muted-foreground">Roofing Contractor, Denver CO</p>
              </div>
            </div>
          </div>
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
