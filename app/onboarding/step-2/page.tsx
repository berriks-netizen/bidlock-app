"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  ArrowRight, 
  ArrowLeft,
  Home,
  Wind,
  Droplets,
  Zap,
  Trees,
  Hammer
} from "lucide-react"

const trades = [
  { id: "roofing", name: "Roofing", icon: Home },
  { id: "hvac", name: "HVAC", icon: Wind },
  { id: "plumbing", name: "Plumbing", icon: Droplets },
  { id: "electrical", name: "Electrical", icon: Zap },
  { id: "landscaping", name: "Landscaping", icon: Trees },
  { id: "general", name: "General Contractor", icon: Hammer },
]

export default function OnboardingStep2() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [selectedTrade, setSelectedTrade] = useState<string>("")
  const [otherTrade, setOtherTrade] = useState("")
  const [saving, setSaving] = useState(false)

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

  const handleContinue = async () => {
    if (!selectedTrade && !otherTrade) return

    setSaving(true)
    
    try {
      const tradeValue = selectedTrade === "other" ? otherTrade : selectedTrade
      
      // Save trade to profiles table
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          trade: tradeValue,
          updated_at: new Date().toISOString()
        })

      if (error) {
        console.error('Error saving trade:', error)
      }

      router.push('/onboarding/step-3')
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleSkip = () => {
    router.push('/onboarding/step-3')
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => router.push('/onboarding')}
            className="p-2 hover:bg-muted rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold flex-1 text-center">Select Your Trade</h1>
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
          <div className="h-1 flex-1 bg-muted rounded-full" />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-8">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-2">What's your trade?</h2>
          <p className="text-muted-foreground mb-8">
            This helps us customize proposals for your industry.
          </p>

          {/* Trade Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {trades.map((trade) => {
              const Icon = trade.icon
              const isSelected = selectedTrade === trade.id
              
              return (
                <Card
                  key={trade.id}
                  onClick={() => setSelectedTrade(trade.id)}
                  className={`p-6 cursor-pointer transition-all hover:shadow-md ${
                    isSelected 
                      ? 'border-primary bg-primary/5 shadow-md' 
                      : 'border-border'
                  }`}
                >
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isSelected 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`font-medium ${
                      isSelected ? 'text-primary' : 'text-foreground'
                    }`}>
                      {trade.name}
                    </span>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Other Trade Input */}
          <Card className="p-4">
            <Label className="text-sm font-medium mb-2 block">
              Other Trade
            </Label>
            <Input
              placeholder="Enter your trade..."
              value={selectedTrade === "other" ? otherTrade : ""}
              onChange={(e) => {
                setSelectedTrade("other")
                setOtherTrade(e.target.value)
              }}
              onFocus={() => setSelectedTrade("other")}
            />
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 py-6 border-t">
        <div className="max-w-md mx-auto flex gap-3">
          <Button 
            variant="outline" 
            onClick={handleSkip}
            className="flex-1"
          >
            Skip for Now
          </Button>
          <Button 
            onClick={handleContinue}
            disabled={!selectedTrade && !otherTrade}
            className="flex-1"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </footer>
    </div>
  )
}
