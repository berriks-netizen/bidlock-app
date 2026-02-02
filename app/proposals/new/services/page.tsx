"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProposal } from "@/lib/proposal-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  X,
  Search,
  Plus,
  Check,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Service {
  id: string;
  name: string;
  description?: string;
  price: number;
  selected: boolean;
}

const initialServices: Service[] = [
  { id: "1", name: "Roof Shingle Replacement", price: 1600, selected: false },
  { id: "2", name: "Gutter Installation", price: 850, selected: false },
  { id: "3", name: "Roof Inspection", price: 200, selected: false },
  { id: "4", name: "Emergency Repairs", price: 500, selected: false },
  { id: "5", name: "Flashing Repair", price: 350, selected: false },
  { id: "6", name: "Skylight Installation", price: 1200, selected: false },
  { id: "7", name: "Ventilation Upgrade", price: 450, selected: false },
];

export default function ServicesPage() {
  const router = useRouter();
  const { proposalData, updateServices, getSubtotal } = useProposal();
  const [services, setServices] = useState<Service[]>(initialServices);
  const [searchQuery, setSearchQuery] = useState("");
  const [customServiceName, setCustomServiceName] = useState("");
  const [customServicePrice, setCustomServicePrice] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editingPrice, setEditingPrice] = useState("");

  // Load existing services from context on mount
  useEffect(() => {
    if (proposalData.services.length > 0) {
      const existingServiceNames = proposalData.services.map(s => s.name);
      
      // Mark pre-existing services as selected
      const updatedServices = services.map(s => ({
        ...s,
        selected: existingServiceNames.includes(s.name)
      }));
      
      // Add custom services from context
      const customServices = proposalData.services
        .filter(s => !initialServices.find(init => init.name === s.name))
        .map((s, index) => ({
          id: `custom-loaded-${index}`,
          name: s.name,
          description: s.description,
          price: s.price,
          selected: true
        }));
      
      setServices([...updatedServices, ...customServices]);
    }
  }, []);

  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return services;
    return services.filter((service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [services, searchQuery]);

  const selectedServices = services.filter((s) => s.selected);
  const subtotal = selectedServices.reduce((sum, s) => sum + s.price, 0);

  const toggleService = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, selected: !s.selected } : s))
    );
  };

  const handlePriceEdit = (id: string, currentPrice: number) => {
    setEditingServiceId(id);
    setEditingPrice(currentPrice.toString());
  };

  const savePriceEdit = () => {
    if (editingServiceId) {
      const newPrice = parseFloat(editingPrice) || 0;
      setServices((prev) =>
        prev.map((s) =>
          s.id === editingServiceId ? { ...s, price: newPrice } : s
        )
      );
      setEditingServiceId(null);
      setEditingPrice("");
    }
  };

  const removeService = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setServices((prev) => prev.filter(s => s.id !== id));
  };

  const addCustomService = () => {
    if (customServiceName.trim()) {
      const newService: Service = {
        id: `custom-${Date.now()}`,
        name: customServiceName.trim(),
        price: parseFloat(customServicePrice) || 0,
        selected: true,
      };
      setServices((prev) => [...prev, newService]);
      setCustomServiceName("");
      setCustomServicePrice("");
      setIsDialogOpen(false);
    }
  };

  const handleContinue = () => {
    // Save selected services to context
    const servicesToSave = selectedServices.map(s => ({
      name: s.name,
      description: s.description,
      price: s.price
    }));
    
    updateServices(servicesToSave);
    router.push("/proposals/new/review");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-semibold text-lg text-foreground">New Proposal</h1>
          <button
            onClick={() => router.push("/dashboard")}
            className="p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-2 mt-3">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`h-2 rounded-full transition-all ${
                step === 3
                  ? "w-8 bg-primary"
                  : step < 3
                    ? "w-2 bg-primary"
                    : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 pt-6 pb-48">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Select Services
        </h2>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-14 pl-12 pr-4 text-base bg-card border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>

        {/* Services List */}
        <div className="space-y-3">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              onClick={() => toggleService(service.id)}
              className={`relative flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                service.selected
                  ? "bg-card border-l-4 border-l-primary border border-border shadow-sm"
                  : "bg-muted/50 border border-transparent hover:bg-muted"
              }`}
              style={{ minHeight: "72px" }}
            >
              {/* Checkbox */}
              <div
                className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                  service.selected
                    ? "bg-primary border-primary"
                    : "border-muted-foreground/40 bg-background"
                }`}
              >
                {service.selected && (
                  <Check className="w-4 h-4 text-primary-foreground" />
                )}
              </div>

              {/* Service Name */}
              <span
                className={`flex-1 font-medium text-base ${
                  service.selected ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {service.name}
              </span>

              {/* Price */}
              {editingServiceId === service.id ? (
                <div
                  className="flex items-center gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      type="number"
                      value={editingPrice}
                      onChange={(e) => setEditingPrice(e.target.value)}
                      onBlur={savePriceEdit}
                      onKeyDown={(e) => e.key === "Enter" && savePriceEdit()}
                      className="w-24 h-10 pl-7 text-right font-semibold"
                      autoFocus
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePriceEdit(service.id, service.price);
                    }}
                    className={`flex items-center gap-1 font-semibold text-lg ${
                      service.selected ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {formatCurrency(service.price)}
                    <Pencil className="w-3.5 h-3.5 opacity-50" />
                  </button>
                  
                  {/* Delete button for custom services */}
                  {service.id.startsWith('custom') && (
                    <button
                      onClick={(e) => removeService(service.id, e)}
                      className="p-1 text-destructive hover:bg-destructive/10 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}

          {filteredServices.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No services found. Try a different search or add a custom service.
            </div>
          )}
        </div>
      </main>

      {/* Floating Add Button */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button
            className="fixed bottom-44 right-4 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors z-20"
            aria-label="Add custom service"
          >
            <Plus className="w-6 h-6" />
          </button>
        </DialogTrigger>
        <DialogContent className="mx-4 rounded-2xl">
          <DialogHeader>
            <DialogTitle>Add Custom Service</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="service-name">Service Name</Label>
              <Input
                id="service-name"
                placeholder="e.g., Chimney Repair"
                value={customServiceName}
                onChange={(e) => setCustomServiceName(e.target.value)}
                className="h-14 text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service-price">Price</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                  $
                </span>
                <Input
                  id="service-price"
                  type="number"
                  placeholder="0"
                  value={customServicePrice}
                  onChange={(e) => setCustomServicePrice(e.target.value)}
                  className="h-14 pl-8 text-base"
                />
              </div>
            </div>
            <Button
              onClick={addCustomService}
              disabled={!customServiceName.trim()}
              className="w-full h-14 text-base font-semibold mt-2"
            >
              Add Service
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sticky Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-background border-t border-border px-4 py-4 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-muted-foreground">
            {selectedServices.length} service
            {selectedServices.length !== 1 ? "s" : ""} selected
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">
              {formatCurrency(subtotal)}
            </span>
          </div>
        </div>
        <Button
          onClick={handleContinue}
          disabled={selectedServices.length === 0}
          className="w-full h-[60px] text-lg font-semibold rounded-xl"
        >
          Continue to Review
        </Button>
      </footer>
    </div>
  );
}
