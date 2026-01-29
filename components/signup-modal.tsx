"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { X, Eye, EyeOff, CheckCircle, Loader2 } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
  defaultToSignIn?: boolean
}

export function SignupModal({ isOpen, onClose, defaultToSignIn = false }: SignupModalProps) {
  const router = useRouter()
  const { signUp, signIn } = useAuth()
  const [isLogin, setIsLogin] = useState(defaultToSignIn)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    password: "",
  })

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (isLogin) {
        // Login
        const result = await signIn(formData.email, formData.password)
        if (result.error) {
          setError(result.error)
        } else {
          setSuccess(true)
          setTimeout(() => {
            router.push('/dashboard')
            onClose()
          }, 1000)
        }
      } else {
        // Sign up
        const result = await signUp(formData.email, formData.password, formData.businessName)
        if (result.error) {
          setError(result.error)
        } else {
          setSuccess(true)
          setTimeout(() => {
            router.push('/onboarding')
            onClose()
          }, 1000)
        }
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-background rounded-2xl shadow-2xl w-full max-w-md relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {success ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {isLogin ? "Welcome back!" : "Account created!"}
            </h2>
            <p className="text-muted-foreground">
              {isLogin ? "Redirecting to dashboard..." : "Redirecting to setup..."}
            </p>
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
                {isLogin ? "Welcome back" : "Start your free trial"}
              </h2>
              <p className="text-muted-foreground">
                {isLogin ? "Sign in to your account" : "7 days free, then $39/month. Cancel anytime."}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                {!isLogin && (
                  <div>
                    <Label htmlFor="businessName" className="text-sm font-medium text-foreground">
                      Business Name
                    </Label>
                    <Input
                      id="businessName"
                      type="text"
                      placeholder="John's Roofing"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      required={!isLogin}
                      className="mt-1.5"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">
                    Password
                  </Label>
                  <div className="relative mt-1.5">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {isLogin ? "Signing in..." : "Creating account..."}
                  </>
                ) : (
                  isLogin ? "Sign In" : "Start Free Trial"
                )}
              </Button>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin)
                    setError("")
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isLogin ? (
                    <>Don't have an account? <span className="text-primary font-medium">Sign up</span></>
                  ) : (
                    <>Already have an account? <span className="text-primary font-medium">Sign in</span></>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
