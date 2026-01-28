"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
} from "lucide-react";

export default function SettingsPage() {
  const [showLogoDialog, setShowLogoDialog] = useState(false);
  const [showColorDialog, setShowColorDialog] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [settings, setSettings] = useState({
    businessName: "Thompson Roofing Co.",
    phone: "(555) 123-4567",
    email: "mike@thompsonroofing.com",
    licenseNumber: "ROC-12345",
    paymentTerms: "50-50",
    validDays: "30",
    taxRate: "8",
    currency: "USD",
    primaryColor: "#ea580c",
    template: "modern",
    notifications: true,
    autoSave: true,
  });

  const updateSetting = (key: string, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-muted/30 pb-8">
      {/* Top Bar */}
      <header className="sticky top-0 z-10 bg-card border-b border-border">
        <div className="flex items-center h-14 px-4">
          <Link
            href="/dashboard"
            className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </Link>
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
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            {/* Logo */}
            <button
              type="button"
              onClick={() => setShowLogoDialog(true)}
              className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                  TR
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Camera className="w-3 h-3 text-primary-foreground" />
                </div>
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-foreground">
                  {settings.businessName}
                </p>
                <p className="text-sm text-muted-foreground">
                  Tap to change logo
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </section>

        {/* Business Details */}
        <section>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
            Business Details
          </h2>
          <div className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
            <div className="p-4">
              <Label className="text-sm text-muted-foreground mb-2 block">
                Business Name
              </Label>
              <Input
                value={settings.businessName}
                onChange={(e) => updateSetting("businessName", e.target.value)}
                className="h-12 text-base border-input focus:border-primary focus:ring-primary"
              />
            </div>
            <div className="p-4">
              <Label className="text-sm text-muted-foreground mb-2 block">
                Phone Number
              </Label>
              <Input
                type="tel"
                value={settings.phone}
                onChange={(e) => updateSetting("phone", e.target.value)}
                className="h-12 text-base border-input focus:border-primary focus:ring-primary"
              />
            </div>
            <div className="p-4">
              <Label className="text-sm text-muted-foreground mb-2 block">
                Email
              </Label>
              <Input
                type="email"
                value={settings.email}
                onChange={(e) => updateSetting("email", e.target.value)}
                className="h-12 text-base border-input focus:border-primary focus:ring-primary"
              />
            </div>
            <div className="p-4">
              <Label className="text-sm text-muted-foreground mb-2 block">
                License Number{" "}
                <span className="text-muted-foreground/60">(optional)</span>
              </Label>
              <Input
                value={settings.licenseNumber}
                onChange={(e) => updateSetting("licenseNumber", e.target.value)}
                className="h-12 text-base border-input focus:border-primary focus:ring-primary"
              />
            </div>
          </div>
        </section>

        {/* Proposal Defaults */}
        <section>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
            Proposal Defaults
          </h2>
          <div className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
            <div className="p-4">
              <Label className="text-sm text-muted-foreground mb-2 block">
                Default Payment Terms
              </Label>
              <Select
                value={settings.paymentTerms}
                onValueChange={(value) => updateSetting("paymentTerms", value)}
              >
                <SelectTrigger className="h-12 text-base border-input focus:border-primary focus:ring-primary">
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
                className="h-12 text-base border-input focus:border-primary focus:ring-primary"
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
                className="h-12 text-base border-input focus:border-primary focus:ring-primary"
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
                <SelectTrigger className="h-12 text-base border-input focus:border-primary focus:ring-primary">
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
          </div>
        </section>

        {/* Branding */}
        <section>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
            Branding
          </h2>
          <div className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
            <button
              type="button"
              onClick={() => setShowLogoDialog(true)}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  TR
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
                <SelectTrigger className="h-12 text-base border-input focus:border-primary focus:ring-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="classic">Classic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Account */}
        <section>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
            Account
          </h2>
          <div className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Pro Plan</p>
                  <p className="text-sm text-muted-foreground">$69/month</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="h-9 bg-transparent">
                Manage
              </Button>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Payment Method</p>
                  <p className="text-sm text-muted-foreground">
                    Visa ending in 4242
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="h-9 bg-transparent">
                Update
              </Button>
            </div>
            <Link
              href="/settings/billing"
              className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                </div>
                <p className="font-medium text-foreground">Billing History</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
          </div>
        </section>

        {/* App Settings */}
        <section>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
            App Settings
          </h2>
          <div className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
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
                className="data-[state=checked]:bg-primary"
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
                className="data-[state=checked]:bg-primary"
              />
            </div>
          </div>
        </section>

        {/* Support & Legal */}
        <section>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
            Support & Legal
          </h2>
          <div className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
            <Link
              href="/help"
              className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-muted-foreground" />
                <p className="font-medium text-foreground">Help Center</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
            <Link
              href="/support"
              className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <p className="font-medium text-foreground">Contact Support</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
            <Link
              href="/privacy"
              className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-muted-foreground" />
                <p className="font-medium text-foreground">Privacy Policy</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
            <Link
              href="/terms"
              className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <p className="font-medium text-foreground">Terms of Service</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
          </div>
        </section>

        {/* Danger Zone */}
        <section>
          <h2 className="text-xs font-semibold text-destructive uppercase tracking-wider mb-3 px-1">
            Danger Zone
          </h2>
          <div className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
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
          </div>
        </section>

        {/* App Version */}
        <p className="text-center text-sm text-muted-foreground pt-4">
          BidLock v1.0.0
        </p>
      </div>

      {/* Logo Upload Dialog */}
      <Dialog open={showLogoDialog} onOpenChange={setShowLogoDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change Business Logo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-3xl">
                TR
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-12 bg-transparent">
                <Camera className="w-4 h-4 mr-2" />
                Take Photo
              </Button>
              <Button variant="outline" className="h-12 bg-transparent">
                Choose File
              </Button>
            </div>
            <Button
              variant="ghost"
              className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              Remove Logo
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Color Picker Dialog */}
      <Dialog open={showColorDialog} onOpenChange={setShowColorDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Primary Color</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-6 gap-3">
              {[
                "#ea580c",
                "#dc2626",
                "#16a34a",
                "#2563eb",
                "#7c3aed",
                "#db2777",
                "#0891b2",
                "#ca8a04",
                "#4b5563",
                "#0f172a",
                "#059669",
                "#6366f1",
              ].map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => {
                    updateSetting("primaryColor", color);
                    setShowColorDialog(false);
                  }}
                  className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${
                    settings.primaryColor === color
                      ? "border-foreground ring-2 ring-offset-2 ring-foreground"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Label className="text-sm text-muted-foreground">Custom:</Label>
              <Input
                type="color"
                value={settings.primaryColor}
                onChange={(e) => updateSetting("primaryColor", e.target.value)}
                className="w-12 h-10 p-1 cursor-pointer"
              />
              <Input
                value={settings.primaryColor}
                onChange={(e) => updateSetting("primaryColor", e.target.value)}
                className="flex-1 h-10 uppercase"
                placeholder="#000000"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Logout Confirmation Dialog */}
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
              className="flex-1 h-12 bg-transparent"
              onClick={() => setShowLogoutDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="flex-1 h-12"
              onClick={() => {
                setShowLogoutDialog(false);
                window.location.href = "/";
              }}
            >
              Log Out
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-destructive">
              Delete Account?
            </DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            This action cannot be undone. All your data, proposals, and customer
            information will be permanently deleted.
          </p>
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1 h-12 bg-transparent"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" className="flex-1 h-12">
              Delete Account
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
