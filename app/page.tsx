"use client"

import { useState } from "react"
import { Hero } from "@/components/hero"
import { BeforeAfter } from "@/components/before-after"
import { Benefits } from "@/components/benefits"
import { Pricing } from "@/components/pricing"
import { AppPreview } from "@/components/app-preview"
import { Testimonials } from "@/components/testimonials"
import { EmailCapture } from "@/components/email-capture"
import { SignupModal } from "@/components/signup-modal"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header 
        onCtaClick={() => {
          setShowSignIn(false)
          setIsModalOpen(true)
        }}
        onSignInClick={() => {
          setShowSignIn(true)
          setIsModalOpen(true)
        }}
      />
      
      <main>
        <Hero onCtaClick={() => setIsModalOpen(true)} />
        <BeforeAfter />
        <Benefits />
        <AppPreview />
        <Pricing onCtaClick={() => setIsModalOpen(true)} />
        <Testimonials />
        <EmailCapture />
      </main>
      
      <Footer />
      
      <SignupModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false)
          setShowSignIn(false)
        }}
        defaultToSignIn={showSignIn}
      />
    </div>
  )
}
