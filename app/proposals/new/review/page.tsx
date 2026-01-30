"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  X,
  Pencil,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";

const mockPhotos = [
  "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop",
];

const mockServices = [
  { name: "Roof Inspection", price: 150 },
  { name: "Shingle Replacement (20 sq ft)", price: 1850 },
  { name: "Gutter Cleaning & Repair", price: 450 },
];

export default function ReviewProposalPage() {
  const router = useRouter();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [taxRate, setTaxRate] = useState("8");
  const [paymentTerms, setPaymentTerms] = useState("50-50");
  const [validDays, setValidDays] = useState("30");
  const [showSendModal, setShowSendModal] = useState(false);
  const [sendViaEmail, setSendViaEmail] = useState(true);
  const [sendViaSMS, setSendViaSMS] = useState(false);
  const [requestSignature, setRequestSignature] = useState(true);
  const [customMessage, setCustomMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const [editingTax, setEditingTax] = useState(false);
  const [editingTerms, setEditingTerms] = useState(false);
  const [editingValid, setEditingValid] = useState(false);

  const subtotal = mockServices.reduce((sum, s) => sum + s.price, 0);
  const tax = subtotal * (parseFloat(taxRate) / 100);
  const total = subtotal + tax;

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % mockPhotos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex(
      (prev) => (prev - 1 + mockPhotos.length) % mockPhotos.length
    );
  };

  const handleSend = async () => {
    setIsSending(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        alert('You must be logged in to send proposals')
        return
      }

      // Save proposal to database
      const { error } = await supabase
        .from('proposals')
        .insert({
          user_id: user.id,
          customer_name: "John & Sarah Martinez",
          customer_address: "1847 Oak Valley Drive, Austin, TX 78745",
          services: mockServices,
          photos: mockPhotos,
          subtotal: subtotal,
          tax_rate: parseFloat(taxRate),
          total: total,
          status: 'sent',
          created_at: new Date().toISOString()
        })

      if (error) {
        console.error('Error saving proposal:', error)
        alert('Failed to save proposal')
        return
      }

      setSent(true)
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred')
    } finally {
      setIsSending(false)
    }
  };

  const paymentTermsText: Record<string, string> = {
    "50-50": "50% upfront, 50% on completion",
    "full-upfront": "100% upfront",
    "full-completion": "100% on completion",
    "thirds": "1/3 upfront, 1/3 midway, 1/3 on completion",
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-10 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="font-semibold text-lg text-foreground">
          Review Proposal
        </h1>
        <button
          onClick={() => router.push("/dashboard")}
          className="p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
      </header>

      {/* Progress Dots */}
      <div className="flex items-center justify-center gap-2 py-4 bg-card border-b border-border">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className="w-2.5 h-2.5 rounded-full bg-primary"
            aria-label={`Step ${step} complete`}
          />
        ))}
        <span className="ml-3 text-sm text-muted-foreground">Step 4 of 4</span>
      </div>

      {/* Scrollable PDF Preview */}
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="max-w-lg mx-auto p-4">
          {/* PDF Document Preview */}
          <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
            {/* Document Header */}
            <div className="bg-primary/5 border-b border-border p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <span className="text-primary font-bold text-xl">PP</span>
              </div>
              <p className="text-sm text-muted-foreground">BidLock User</p>
              <h2 className="text-2xl font-bold text-foreground mt-4 tracking-wide">
                PROPOSAL
              </h2>
            </div>

            {/* Customer Info */}
            <div className="p-6 border-b border-border">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Prepared for:
                  </p>
                  <p className="font-semibold text-foreground">
                    John & Sarah Martinez
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    1847 Oak Valley Drive
                    <br />
                    Austin, TX 78745
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">Date:</p>
                  <p className="font-medium text-foreground">
                    January 27, 2026
                  </p>
                </div>
              </div>
            </div>

            {/* Photo Gallery */}
            <div className="p-6 border-b border-border">
              <h3 className="font-semibold text-foreground mb-4">
                Project Photos
              </h3>
              <div className="relative">
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                  <img
                    src={mockPhotos[currentPhotoIndex] || "/placeholder.svg"}
                    alt={`Project photo ${currentPhotoIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={prevPhoto}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-card/90 rounded-full flex items-center justify-center shadow-md hover:bg-card transition-colors"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5 text-foreground" />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-card/90 rounded-full flex items-center justify-center shadow-md hover:bg-card transition-colors"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 h-5 text-foreground" />
                </button>
              </div>
              {/* Dots Indicator */}
              <div className="flex justify-center gap-1.5 mt-3">
                {mockPhotos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPhotoIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      idx === currentPhotoIndex
                        ? "bg-primary"
                        : "bg-muted-foreground/30"
                    }`}
                    aria-label={`Go to photo ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Services Table */}
            <div className="p-6 border-b border-border">
              <h3 className="font-semibold text-foreground mb-4">Services</h3>
              <div className="space-y-3">
                {mockServices.map((service, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center py-2 border-b border-border/50 last:border-0"
                  >
                    <span className="text-foreground">{service.name}</span>
                    <span className="font-semibold text-foreground">
                      ${service.price.toLocaleString()}.00
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="mt-6 pt-4 border-t-2 border-border space-y-2">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}.00</span>
                </div>
                <div className="flex justify-between items-center text-muted-foreground">
                  <button
                    onClick={() => setEditingTax(true)}
                    className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                  >
                    <span>Tax ({taxRate}%)</span>
                    <Pencil className="w-3 h-3" />
                  </button>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-border">
                  <span className="text-xl font-bold text-foreground">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="p-6 border-b border-border space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Payment Terms</span>
                <button
                  onClick={() => setEditingTerms(true)}
                  className="flex items-center gap-1.5 font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>{paymentTermsText[paymentTerms]}</span>
                  <Pencil className="w-3 h-3" />
                </button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Valid For</span>
                <button
                  onClick={() => setEditingValid(true)}
                  className="flex items-center gap-1.5 font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>{validDays} days</span>
                  <Pencil className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Signature Line */}
            <div className="p-6">
              <p className="text-sm text-muted-foreground mb-4">
                Customer Signature
              </p>
              <div className="border-b-2 border-dashed border-muted-foreground/30 h-12 flex items-end pb-2">
                <span className="text-xs text-muted-foreground/50">
                  Sign here
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                By signing, customer agrees to the terms and pricing above.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-lg">
        <div className="max-w-lg mx-auto flex gap-3">
          <Button
            variant="outline"
            className="flex-1 h-14 text-base font-medium border-2 bg-transparent"
            onClick={() => router.push("/dashboard")}
          >
            Save as Draft
          </Button>
          <Button
            className="flex-1 h-14 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => setShowSendModal(true)}
          >
            Send Proposal
          </Button>
        </div>
      </div>

      {/* Edit Tax Modal */}
      <Dialog open={editingTax} onOpenChange={setEditingTax}>
        <DialogContent className="max-w-sm mx-4">
          <DialogHeader>
            <DialogTitle>Edit Tax Rate</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <Label htmlFor="tax-rate">Tax Percentage</Label>
              <div className="relative mt-2">
                <Input
                  id="tax-rate"
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  className="h-14 text-lg pr-8"
                  min="0"
                  max="100"
                  step="0.5"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  %
                </span>
              </div>
            </div>
            <Button
              className="w-full h-12 bg-primary hover:bg-primary/90"
              onClick={() => setEditingTax(false)}
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Payment Terms Modal */}
      <Dialog open={editingTerms} onOpenChange={setEditingTerms}>
        <DialogContent className="max-w-sm mx-4">
          <DialogHeader>
            <DialogTitle>Payment Terms</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <Select value={paymentTerms} onValueChange={setPaymentTerms}>
              <SelectTrigger className="h-14 text-base">
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
                  1/3 upfront, 1/3 midway, 1/3 on completion
                </SelectItem>
              </SelectContent>
            </Select>
            <Button
              className="w-full h-12 bg-primary hover:bg-primary/90"
              onClick={() => setEditingTerms(false)}
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Valid Days Modal */}
      <Dialog open={editingValid} onOpenChange={setEditingValid}>
        <DialogContent className="max-w-sm mx-4">
          <DialogHeader>
            <DialogTitle>Proposal Valid For</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <Select value={validDays} onValueChange={setValidDays}>
              <SelectTrigger className="h-14 text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="14">14 days</SelectItem>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="60">60 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button
              className="w-full h-12 bg-primary hover:bg-primary/90"
              onClick={() => setEditingValid(false)}
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Send Proposal Modal */}
      <Dialog open={showSendModal} onOpenChange={setShowSendModal}>
        <DialogContent className="max-w-sm mx-4">
          <DialogHeader>
            <DialogTitle>{sent ? "Proposal Sent!" : "Send Proposal"}</DialogTitle>
          </DialogHeader>

          {sent ? (
            <div className="py-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-muted-foreground">
                Your proposal has been sent successfully.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Redirecting to dashboard...
              </p>
            </div>
          ) : (
            <div className="space-y-5 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Send via Email</p>
                  <p className="text-sm text-muted-foreground">
                    john.martinez@email.com
                  </p>
                </div>
                <Switch checked={sendViaEmail} onCheckedChange={setSendViaEmail} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Send via SMS</p>
                  <p className="text-sm text-muted-foreground">(512) 555-0147</p>
                </div>
                <Switch checked={sendViaSMS} onCheckedChange={setSendViaSMS} />
              </div>

              <div className="flex items-center justify-between py-3 border-t border-b border-border">
                <div>
                  <p className="font-medium text-foreground">
                    Request e-Signature
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Customer can sign digitally
                  </p>
                </div>
                <Switch
                  checked={requestSignature}
                  onCheckedChange={setRequestSignature}
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-muted-foreground">
                  Add a personal message (optional)
                </Label>
                <Textarea
                  id="message"
                  placeholder="Thanks for the opportunity to work with you..."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="mt-2 min-h-[80px] resize-none"
                />
              </div>

              <Button
                className="w-full h-14 text-base font-semibold bg-primary hover:bg-primary/90"
                onClick={handleSend}
                disabled={isSending || (!sendViaEmail && !sendViaSMS)}
              >
                {isSending ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Now"
                )}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
