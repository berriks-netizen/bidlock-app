"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onCtaClick: () => void
}

export function Header({ onCtaClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image 
            src="/bidlock-logo.svg" 
            alt="BidLock Logo" 
            width={32} 
            height={32}
            className="w-8 h-8"
          />
          <span className="font-bold text-xl text-foreground">BidLock</span>
        </div>
        
        <Button 
          onClick={onCtaClick}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5 py-2.5 rounded-lg text-sm"
        >
          Start Free Trial
        </Button>
      </div>
    </header>
  )
}
