"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  ArrowLeft,
  Check,
  Camera,
  FileText,
  Edit3
} from "lucide-react"

export default function OnboardingStep3() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  const handleFinish = () => {
    // Onboarding complete - go to dashboard
    router.push('/dashboard')
  }

  const handleSkip = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => router.push('/onboarding/step-2')}
            className="p-2 hover:bg-muted rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold flex-1 text-center">Price Setup</h1>
          <button 
            onClick={handleSkip}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Skip
          </button>
        </div>
        
        {/* Progress */}
        <div className="flex gap-2">
          <div className="h-1 flex-1 bg-primary rounded-full" />
          <div className="h-1 flex-1 bg-primary rounded-full" />
          <div className="h-1 flex-1 bg-primary rounded-full" />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-8">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-2">Add Your Pricing</h2>
          <p className="text-muted-foreground mb-8">
            Set up your service prices to create proposals faster. You can add these anytime.
          </p>

          {/* Price Setup Options */}
          <div className="space-y-3 mb-8">
            <Card className="p-6 hover:shadow-md transition-shadow cursor-not-allowed opacity-60">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <Camera className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Scan Price Sheet</h3>
                  <p className="text-sm text-muted-foreground">
                    Take a photo of your existing price list (Coming Soon)
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-md transition-shadow cursor-not-allowed opacity-60">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Use Starter Template</h3>
                  <p className="text-sm text-muted-foreground">
                    Start with common services for your trade (Coming Soon)
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-md transition-shadow cursor-not-allowed opacity-60">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <Edit3 className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Manual Entry</h3>
                  <p className="text-sm text-muted-foreground">
                    Add services one by one (Coming Soon)
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="bg-muted/30 rounded-lg p-4 border border-border">
            <p className="text-sm text-muted-foreground text-center">
              💡 <strong>Tip:</strong> You can add prices later when creating your first proposal
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 py-6 border-t">
        <div className="max-w-md mx-auto">
          <Button 
            onClick={handleFinish}
            className="w-full h-12 text-base"
            size="lg"
          >
            <Check className="w-5 h-5 mr-2" />
            Finish Setup
          </Button>
          <p className="text-center text-sm text-muted-foreground mt-4">
            You can always change these settings later
          </p>
        </div>
      </footer>
    </div>
  )
}
