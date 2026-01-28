"use client"

import React from "react"

import { useState } from "react"
import { X, Eye, EyeOff, CheckCircle, Loader2 } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsLoading(false)
    setSuccess(true)
  }

  const handleClose = () => {
    setEmail("")
    setPassword("")
    setSuccess(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-border">
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80 text-muted-foreground transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>
        
        {success ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {"You're all set!"}
            </h2>
            <p className="text-muted-foreground mb-6">
              Check your email to confirm your account and start your free trial.
            </p>
            <Button
              onClick={handleClose}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
            >
              Got it
            </Button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="p-6 pb-0">
              <div className="flex items-center gap-3 mb-4">
                <Image 
                  src="/bidlock-logo.svg" 
                  alt="BidLock Logo" 
                  width={36} 
                  height={36}
                  className="w-9 h-9"
                />
                <span className="font-bold text-lg text-foreground">BidLock</span>
              </div>
              
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Start your free trial
              </h2>
              <p className="text-muted-foreground">
                7 days free, then $69/month. Cancel anytime.
              </p>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="mike@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 px-4 rounded-xl bg-muted border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-medium">
                  Create password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="h-12 px-4 pr-12 rounded-xl bg-muted border-border text-foreground placeholder:text-muted-foreground"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              
              <Button 
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl mt-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Start Free Trial"
                )}
              </Button>
              
              <p className="text-center text-xs text-muted-foreground">
                By signing up, you agree to our{" "}
                <a href="#" className="text-primary hover:underline">Terms of Service</a>
                {" "}and{" "}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
