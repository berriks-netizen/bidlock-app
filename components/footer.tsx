"use client"

import Image from "next/image"

export function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-border bg-muted/30">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image 
              src="/bidlock-logo.svg" 
              alt="BidLock Logo" 
              width={28} 
              height={28}
              className="w-7 h-7"
            />
            <span className="font-bold text-foreground">BidLock</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Support
            </a>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © 2026 BidLock. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
