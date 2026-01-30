"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  Camera,
  ChevronRight,
  CreditCard,
  HelpCircle,
  FileText,
  Shield,
  Mail,
  LogOut,
  Trash2,
  User,
} from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()
  const { user, loading, signOut } = useAuth()
  
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

  const [selectedColor, setSelectedColor] = useState("#ea580c")
  const [showLogoDialog, setShowLogoDialog] = useState(false)
  const [showColorDialog, setShowColorDialog] = useState(false)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const [settings, setSettings] = useState({
    paymentTerms: "50-50",
    validDays: "30",
    taxRate: "8",
    currency: "USD",
    primaryColor: "#ea580c",
    template: "modern",
    notifications: true,
    autoSave: true,
  })

  const updateSetting = (key: string, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-muted/30 pb-8">
      {/* Top Bar */}
      <header className="sticky top-0 z-10 bg-card border-b border-border">
        <div className="flex items-center h-14 px-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="flex-1 text-center text-lg font-semibold text-foreground pr-10">
            Settings
          </h1>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Profile Section */}
        <section>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
            Profile
          </h2>
          <Card className="overflow-hidden">
            <button
              type="button"
              onClick={() => setShowLogoDialog(true)}
              className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                  {user?.user_metadata?.business_name?.substring(0, 2).toUpperCase() || 'BL'}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Camera className="w-3 h-3 text-primary-foreground" />
                </div>
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-foreground">
                  {user?.user_metadata?.business_name || 'Business Name'}
                </p>
                <p className="text-sm text-muted-foreground">
                  Tap to change logo
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </Card>
        </section>

        {/* Business Details */}
        <section>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
            Business Details
          </h2>
          <Card className="p-6 space-y-4">
            <div>
              <Label className="text-sm text-muted-foreground">Business Name</Label>
              <p className="text-base font-medium text-foreground mt-1">
                {user?.user_metadata?.business_name || 'Not set'}
              </p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Email</Label>
              <p className="text-base font-medium text-foreground mt-1">{user?.email}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Phone</Label>
              <p className="text-base font-medium text-foreground mt-1">Not set</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">License Number</Label>
              <p className="text-base font-medium text-foreground mt-1">Not set</p>
            </div>
            <Button variant="outline" className="w-full mt-2">
              Edit Business Info
            </Button>
          </Card>
        </section>

        {/* Proposal Defaults */}
        <section>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
            Proposal Defaults
          </h2>
          <Card className="overflow-hidden divide-y divide-border">
            <div className="p-4">
              <Label className="text-sm text-muted-foreground mb-2 block">
                Default Payment Terms
              </Label>
              <Select
                value={settings.paymentTerms}
                onValueChange={(value) => updateSetting("paymentTerms", value)}
              >
                <SelectTrigger className="h-12 text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="50-50">
                    50% upfront, 50% on completion
                  </SelectItem>
                  <SelectItem value="full-upfront">100% upfront</SelectItem>
                  <SelectItem value="full-completion">
                    100% on completion
                  </SelectItem>
                  <SelectItem value="thirds">
                    1/3 upfront, 1/3 midway, 1/3 completion
                  </SelectItem>
                  <SelectItem value="net-30">Net 30</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="p-4">
              <Label className="text-sm text-muted-foreground mb-2 block">
                Default Valid Until (days)
              </Label>
              <Input
                type="number"
                value={settings.validDays}
                onChange={(e) => updateSetting("validDays", e.target.value)}
                className="h-12 text-base"
              />
            </div>
            <div className="p-4">
              <Label className="text-sm text-muted-foreground mb-2 block">
                Tax Rate (%)
              </Label>
              <Input
                type="number"
                step="0.1"
                value={settings.taxRate}
                onChange={(e) => updateSetting("taxRate", e.target.value)}
                className="h-12 text-base"
              />
            </div>
            <div className="p-4">
              <Label className="text-sm text-muted-foreground mb-2 block">
                Currency
              </Label>
              <Select
                value={settings.currency}
                onValueChange={(value) => updateSetting("currency", value)}
              >
                <SelectTrigger className="h-12 text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="CAD">CAD ($)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
        </section>

        {/* Branding */}
        <section>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
            Branding
          </h2>
          <Card className="overflow-hidden divide-y divide-border">
            <button
              type="button"
              onClick={() => setShowLogoDialog(true)}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {user?.user_metadata?.business_name?.substring(0, 2).toUpperCase() || 'BL'}
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground">Business Logo</p>
                  <p className="text-sm text-muted-foreground">
                    Tap to change
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            <button
              type="button"
              onClick={() => setShowColorDialog(true)}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-lg border-2 border-border"
                  style={{ backgroundColor: settings.primaryColor }}
                />
                <div className="text-left">
                  <p className="font-medium text-foreground">Primary Color</p>
                  <p className="text-sm text-muted-foreground">
                    {settings.primaryColor}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="p-4">
              <Label className="text-sm text-muted-foreground mb-2 block">
                Proposal Template
              </Label>
              <Select
                value={settings.template}
                onValueChange={(value) => updateSetting("template", value)}
              >
                <SelectTrigger className="h-12 text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="classic">Classic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
        </section>

        {/* Account */}
        <section>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
            Account
          </h2>
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-foreground">Subscription</h3>
                <p className="text-sm text-muted-foreground mt-1">7-day free trial</p>
              </div>
              <Badge variant="secondary">Trial</Badge>
            </div>
            <Button 
  variant="outline" 
  className="w-full"
  onClick={() => {
    alert('Stripe integration coming soon! You\'ll be able to upgrade for $39/month.')
  }}
>
  Upgrade to Pro
</Button>
          </Card>
        </section>

        {/* App Settings */}
        <section>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
            App Settings
          </h2>
          <Card className="overflow-hidden divide-y divide-border">
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium text-foreground">Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Get alerts for proposal updates
                </p>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(checked) =>
                  updateSetting("notifications", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium text-foreground">Auto-save Drafts</p>
                <p className="text-sm text-muted-foreground">
                  Save progress automatically
                </p>
              </div>
              <Switch
                checked={settings.autoSave}
                onCheckedChange={(checked) => updateSetting("autoSave", checked)}
              />
            </div>
          </Card>
        </section>

        {/* Support & Legal */}
        <section>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
            Support & Legal
          </h2>
          <Card className="overflow-hidden divide-y divide-border">
            <button
              onClick={() => router.push('/help')}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-muted-foreground" />
                <p className="font-medium text-foreground">Help Center</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            <button
              onClick={() => router.push('/support')}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <p className="font-medium text-foreground">Contact Support</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            <button
              onClick={() => router.push('/privacy')}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-muted-foreground" />
                <p className="font-medium text-foreground">Privacy Policy</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            <button
              onClick={() => router.push('/terms')}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <p className="font-medium text-foreground">Terms of Service</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </Card>
        </section>

        {/* Danger Zone */}
        <section>
          <h2 className="text-xs font-semibold text-destructive uppercase tracking-wider mb-3 px-1">
            Danger Zone
          </h2>
          <Card className="overflow-hidden divide-y divide-border">
            <button
              type="button"
              onClick={() => setShowLogoutDialog(true)}
              className="w-full flex items-center gap-3 p-4 hover:bg-destructive/5 transition-colors"
            >
              <LogOut className="w-5 h-5 text-destructive" />
              <p className="font-medium text-destructive">Log Out</p>
            </button>
            <button
              type="button"
              onClick={() => setShowDeleteDialog(true)}
              className="w-full flex items-center gap-3 p-4 hover:bg-destructive/5 transition-colors"
            >
              <Trash2 className="w-5 h-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Delete Account</p>
            </button>
          </Card>
        </section>

        {/* App Version */}
        <p className="text-center text-sm text-muted-foreground pt-4">
          BidLock v1.0.0
        </p>
      </div>

      {/* Dialogs remain the same... */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Log Out?</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            Are you sure you want to log out of BidLock?
          </p>
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1 h-12"
              onClick={() => setShowLogoutDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="flex-1 h-12"
              onClick={async () => {
                await signOut()
                setShowLogoutDialog(false)
                router.push('/')
              }}
            >
              Log Out
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
