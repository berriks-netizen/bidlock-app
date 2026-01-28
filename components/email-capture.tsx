"use client"

import React from "react"

import { useState } from "react"
import { Mail, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function EmailCapture() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-xl">
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-7 h-7 text-primary" />
          </div>
          
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
            Get contractor tips & updates
          </h2>
          <p className="text-muted-foreground mb-6">
            Join our newsletter for tips on winning more jobs and running your business
          </p>
          
          {submitted ? (
            <div className="flex items-center justify-center gap-2 text-primary font-medium py-4">
              <CheckCircle className="w-5 h-5" />
              {"Thanks! You're on the list."}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-12 px-4 rounded-xl bg-muted border-border text-foreground placeholder:text-muted-foreground"
              />
              <Button 
                type="submit"
                className="h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 rounded-xl"
              >
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          )}
          
          <p className="text-xs text-muted-foreground mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  )
}
