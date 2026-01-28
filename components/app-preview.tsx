"use client"

import { Plus, Send, ChevronRight, FileText, User, DollarSign } from "lucide-react"

export function AppPreview() {
  return (
    <section className="py-16 px-4 bg-secondary">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-secondary-foreground mb-4">
          Simple enough for the job site
        </h2>
        <p className="text-center text-secondary-foreground/80 mb-12 max-w-xl mx-auto">
          Create professional proposals in minutes, not hours
        </p>
        
        <div className="flex justify-center">
          {/* Phone Mockup */}
          <div className="relative w-[280px] md:w-[320px]">
            {/* Phone Frame */}
            <div className="relative bg-foreground rounded-[3rem] p-3 shadow-2xl">
              {/* Screen */}
              <div className="bg-card rounded-[2.5rem] overflow-hidden">
                {/* Status Bar */}
                <div className="bg-card px-6 py-3 flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground">9:41</span>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-2 bg-foreground/60 rounded-sm" />
                    <div className="w-4 h-2 bg-foreground/60 rounded-sm" />
                    <div className="w-6 h-3 bg-foreground rounded-sm" />
                  </div>
                </div>
                
                {/* App Content */}
                <div className="px-4 pb-6">
                  {/* Header */}
                  <div className="flex items-center justify-between py-4">
                    <h3 className="font-bold text-lg text-foreground">New Proposal</h3>
                    <button className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Plus className="w-5 h-5 text-primary-foreground" />
                    </button>
                  </div>
                  
                  {/* Customer Info */}
                  <div className="bg-muted rounded-xl p-4 mb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-secondary-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">John Patterson</p>
                        <p className="text-xs text-muted-foreground">123 Oak Street</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Line Items */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">Roof Inspection</span>
                      </div>
                      <span className="text-sm font-semibold text-foreground">$150</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">Shingle Repair</span>
                      </div>
                      <span className="text-sm font-semibold text-foreground">$850</span>
                    </div>
                    
                    <button className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-border rounded-lg text-muted-foreground text-sm">
                      <Plus className="w-4 h-4" />
                      Add line item
                    </button>
                  </div>
                  
                  {/* Total */}
                  <div className="flex items-center justify-between p-4 bg-primary/10 rounded-xl mb-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-foreground">Total</span>
                    </div>
                    <span className="text-xl font-bold text-primary">$1,000</span>
                  </div>
                  
                  {/* Send Button */}
                  <button className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-xl flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" />
                    Send Proposal
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Home Indicator */}
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-card/50 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
