"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Camera, Upload, ArrowRight, Image as ImageIcon } from "lucide-react"

export default function OnboardingStep1() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogoFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleContinue = () => {
    // For now, just skip to next step
    // We'll implement actual upload later
    router.push('/onboarding/step-2')
  }

  const handleSkip = () => {
    router.push('/onboarding/step-2')
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Set Up Your Business</h1>
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
          <div className="h-1 flex-1 bg-muted rounded-full" />
          <div className="h-1 flex-1 bg-muted rounded-full" />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-8">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-2">Upload Your Logo</h2>
          <p className="text-muted-foreground mb-8">
            Add your business logo to make proposals look professional. You can always change this later.
          </p>

          {/* Logo Preview */}
          <Card className="p-8 mb-6">
            <div className="flex flex-col items-center">
              {logoPreview ? (
                <div className="w-32 h-32 rounded-lg overflow-hidden mb-4 border-2 border-border">
                  <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-32 h-32 rounded-lg bg-muted flex items-center justify-center mb-4">
                  <ImageIcon className="w-12 h-12 text-muted-foreground opacity-50" />
                </div>
              )}
              
              <div className="flex gap-3 w-full">
                <label className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button variant="outline" className="w-full" asChild>
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </span>
                  </Button>
                </label>
                
                <label className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button variant="outline" className="w-full" asChild>
                    <span>
                      <Camera className="w-4 h-4 mr-2" />
                      Take Photo
                    </span>
                  </Button>
                </label>
              </div>
            </div>
          </Card>

          <p className="text-sm text-muted-foreground text-center mb-8">
            Recommended: Square image, at least 500x500px
          </p>
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
            className="flex-1"
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </footer>
    </div>
  )
}
