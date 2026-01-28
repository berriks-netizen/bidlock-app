"use client"

import { X, Check, FileText, Download } from "lucide-react"

export function BeforeAfter() {
  return (
    <section className="py-16 px-4 bg-muted/50">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-4">
          Which quote would <span className="text-primary">you</span> choose?
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
          Your customers judge your professionalism before you even start the job
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Before - Messy handwritten */}
          <div className="relative">
            <div className="absolute -top-3 left-4 px-3 py-1 bg-destructive text-white text-xs font-bold rounded-full">
              BEFORE
            </div>
            <div className="bg-card border-2 border-destructive/30 rounded-2xl p-6 shadow-lg">
              <div className="bg-[#fef9e7] rounded-lg p-4 font-mono text-sm leading-relaxed min-h-[280px]">
                <div className="mb-3 border-b border-amber-200 pb-2">
                  <span className="italic text-muted-foreground/70" style={{ fontFamily: "cursive" }}>
                    ESTIMATE
                  </span>
                </div>
                <div className="space-y-2 text-foreground/70" style={{ fontFamily: "cursive" }}>
                  <p className="line-through">Roof repair - $2500</p>
                  <p>Roof repair - $2,800</p>
                  <p>Materials ~$1200</p>
                  <p>Labor - ???</p>
                  <p className="mt-4">Call me back</p>
                  <p>- Mike</p>
                  <p className="text-xs mt-4">(555) 123-????</p>
                </div>
              </div>
              
              <div className="mt-4 flex items-center gap-2 text-destructive">
                <X className="w-5 h-5" />
                <span className="text-sm font-medium">Looks unprofessional</span>
              </div>
            </div>
          </div>
          
          {/* After - Professional PDF */}
          <div className="relative">
            <div className="absolute -top-3 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
              AFTER
            </div>
            <div className="bg-card border-2 border-primary/30 rounded-2xl p-6 shadow-lg">
              <div className="bg-card border border-border rounded-lg p-4 min-h-[280px]">
                <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center">
                      <FileText className="w-4 h-4 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-foreground">SMITH ROOFING CO.</p>
                      <p className="text-xs text-muted-foreground">Licensed & Insured</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">Proposal #1024</span>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Roof Shingle Replacement</span>
                    <span className="font-semibold text-foreground">$1,600.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Materials (Premium Grade)</span>
                    <span className="font-semibold text-foreground">$1,200.00</span>
                  </div>
                  <div className="border-t border-border pt-2 mt-2 flex justify-between">
                    <span className="font-bold text-foreground">Total</span>
                    <span className="font-bold text-primary">$2,800.00</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground">Valid for 30 days | Payment terms: 50% deposit</p>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">Wins more jobs</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <Download className="w-4 h-4" />
                  PDF Ready
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
