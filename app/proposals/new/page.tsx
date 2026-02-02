"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProposal } from "@/lib/proposal-context";
import { X, MapPin, ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const existingCustomers = [
  { name: "John Martinez", phone: "(555) 234-5678", address: "142 Oak Street" },
  { name: "Johnson Family", phone: "(555) 345-6789", address: "89 Pine Ave" },
  { name: "Sarah Johnson", phone: "(555) 456-7890", address: "221 Maple Dr" },
];

export default function NewProposalPage() {
  const router = useRouter();
  const { proposalData, updateCustomerInfo } = useProposal();
  
  const [formData, setFormData] = useState({
    customerName: proposalData.customerName || "",
    phone: proposalData.customerPhone || "",
    email: proposalData.customerEmail || "",
    address: proposalData.customerAddress || "",
    propertyType: proposalData.propertyType || "",
  });
  
  const [suggestions, setSuggestions] = useState<typeof existingCustomers>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const isValid = formData.customerName.trim().length > 0;

  useEffect(() => {
    if (formData.customerName.length >= 2) {
      const matches = existingCustomers.filter((c) =>
        c.name.toLowerCase().includes(formData.customerName.toLowerCase())
      );
      setSuggestions(matches);
      setShowSuggestions(matches.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [formData.customerName]);

  const selectCustomer = (customer: (typeof existingCustomers)[0]) => {
    setFormData({
      ...formData,
      customerName: customer.name,
      phone: customer.phone,
      address: customer.address,
    });
    setShowSuggestions(false);
  };

  const handleClose = () => {
    router.push("/dashboard");
  };

  const handleNext = () => {
    // Save to context before navigating
    updateCustomerInfo({
      customerName: formData.customerName,
      customerPhone: formData.phone,
      customerEmail: formData.email,
      customerAddress: formData.address,
      propertyType: formData.propertyType,
    });
    
    router.push("/proposals/new/photos");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-10 bg-card border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="w-10" />
          <h1 className="text-lg font-semibold text-foreground">New Proposal</h1>
          <button
            onClick={handleClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </header>

      {/* Progress Dots */}
      <div className="px-4 py-4 bg-card border-b border-border">
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`h-2 rounded-full transition-all ${
                step === 1
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-2">
          Step 1 of 4
        </p>
      </div>

      {/* Form Content */}
      <div className="flex-1 px-4 py-6 overflow-auto">
        <h2 className="text-xl font-bold text-foreground mb-1">
          Customer Information
        </h2>
        <p className="text-muted-foreground text-sm mb-6">
          Enter your customer details to get started
        </p>

        <div className="space-y-5">
          {/* Customer Name */}
          <div className="relative">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Customer Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) =>
                setFormData({ ...formData, customerName: e.target.value })
              }
              onFocus={() => setFocusedField("customerName")}
              onBlur={() => setTimeout(() => setFocusedField(null), 200)}
              placeholder="Enter customer name"
              autoFocus
              className={`w-full h-14 px-4 rounded-xl border bg-card text-foreground placeholder:text-muted-foreground/60 transition-all outline-none ${
                focusedField === "customerName"
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border"
              }`}
            />

            {/* Existing Customer Suggestions */}
            {showSuggestions && focusedField === "customerName" && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-20">
                <div className="px-3 py-2 bg-muted/50 border-b border-border">
                  <p className="text-xs font-medium text-muted-foreground">
                    Use existing customer
                  </p>
                </div>
                {suggestions.map((customer, index) => (
                  <button
                    key={index}
                    onClick={() => selectCustomer(customer)}
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-muted/50 transition-colors text-left"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {customer.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {customer.address}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Phone Number{" "}
              <span className="font-normal text-muted-foreground/70">
                (optional)
              </span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              onFocus={() => setFocusedField("phone")}
              onBlur={() => setFocusedField(null)}
              placeholder="(555) 123-4567"
              className={`w-full h-14 px-4 rounded-xl border bg-card text-foreground placeholder:text-muted-foreground/60 transition-all outline-none ${
                focusedField === "phone"
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border"
              }`}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Email{" "}
              <span className="font-normal text-muted-foreground/70">
                (optional)
              </span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              placeholder="customer@email.com"
              className={`w-full h-14 px-4 rounded-xl border bg-card text-foreground placeholder:text-muted-foreground/60 transition-all outline-none ${
                focusedField === "email"
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border"
              }`}
            />
          </div>

          {/* Service Address */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Service Address{" "}
              <span className="font-normal text-muted-foreground/70">
                (optional)
              </span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/60" />
              <input
                type="text"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                onFocus={() => setFocusedField("address")}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter street address"
                className={`w-full h-14 pl-12 pr-4 rounded-xl border bg-card text-foreground placeholder:text-muted-foreground/60 transition-all outline-none ${
                  focusedField === "address"
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border"
                }`}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1.5 pl-1">
              Start typing for address suggestions
            </p>
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Property Type
            </label>
            <div className="relative">
              <select
                value={formData.propertyType}
                onChange={(e) =>
                  setFormData({ ...formData, propertyType: e.target.value })
                }
                onFocus={() => setFocusedField("propertyType")}
                onBlur={() => setFocusedField(null)}
                className={`w-full h-14 px-4 pr-12 rounded-xl border bg-card text-foreground appearance-none transition-all outline-none ${
                  focusedField === "propertyType"
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border"
                } ${!formData.propertyType ? "text-muted-foreground/60" : ""}`}
              >
                <option value="">Select property type</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="sticky bottom-0 px-4 py-4 bg-card border-t border-border">
        <Button
          onClick={handleNext}
          disabled={!isValid}
          className="w-full h-[60px] text-base font-semibold rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next: Add Photos
        </Button>
        <p className="text-center text-xs text-muted-foreground mt-3">
          You can save this as a draft anytime
        </p>
      </div>
    </div>
  );
}
