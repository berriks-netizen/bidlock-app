"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Bell, 
  Menu, 
  Plus, 
  MapPin, 
  DollarSign, 
  Clock, 
  Home, 
  FileText, 
  Users, 
  Settings,
  ChevronRight 
} from "lucide-react"

const stats = [
  { label: "Sent", value: "5", color: "bg-primary/10 text-primary" },
  { label: "Pending", value: "$24,500", color: "bg-secondary/10 text-secondary" },
  { label: "Accepted", value: "3", color: "bg-emerald-500/10 text-emerald-600" },
]

const proposals = [
  {
    id: 1,
    customer: "Johnson Family",
    address: "1247 Oak Street, Austin, TX 78701",
    service: "Roof Replacement",
    amount: 12500,
    status: "sent",
    date: "2 days ago",
  },
  {
    id: 2,
    customer: "Martinez Residence",
    address: "892 Maple Ave, Round Rock, TX 78664",
    service: "Shingle Repair",
    amount: 2800,
    status: "accepted",
    date: "3 days ago",
  },
  {
    id: 3,
    customer: "Thompson Commercial",
    address: "4521 Industrial Blvd, Austin, TX 78745",
    service: "Full Roof Install",
    amount: 45000,
    status: "sent",
    date: "5 days ago",
  },
  {
    id: 4,
    customer: "Williams Home",
    address: "331 Cedar Lane, Georgetown, TX 78628",
    service: "Gutter Install",
    amount: 1850,
    status: "declined",
    date: "1 week ago",
  },
];

const navItems = [
  { icon: Home, label: "Home", active: true },
  { icon: FileText, label: "Proposals", active: false },
  { icon: Users, label: "Customers", active: false },
  { icon: Settings, label: "Settings", active: false },
];

function getStatusStyle(status: string) {
  switch (status) {
    case "sent":
      return "bg-primary/10 text-primary";
    case "accepted":
      return "bg-emerald-500/10 text-emerald-600";
    case "declined":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState("Home");
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

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-card border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">P</span>
            </div>
            <span className="font-semibold text-foreground">BidLock</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative h-10 w-10">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Menu className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Welcome Message */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Hey Mike! <span className="inline-block">👋</span>
          </h1>
          <p className="text-muted-foreground mt-1">Here&apos;s your business at a glance</p>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="p-3 text-center border border-border shadow-sm"
            >
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
              <span
                className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${stat.color}`}
              >
                {stat.label}
              </span>
            </Card>
          ))}
        </div>

        {/* New Proposal CTA */}
        <Button
          className="w-full h-[60px] text-lg font-semibold gap-2 shadow-lg"
          size="lg"
        >
          <Plus className="h-5 w-5" />
          New Proposal
        </Button>

        {/* Recent Proposals Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Recent Proposals</h2>
            <Button variant="ghost" size="sm" className="text-primary text-sm font-medium">
              View All
            </Button>
          </div>

          <div className="space-y-3">
            {proposals.map((proposal) => (
              <Card
                key={proposal.id}
                className="p-4 border border-border shadow-sm active:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground truncate">
                        {proposal.customer}
                      </h3>
                      <span
                        className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusStyle(
                          proposal.status
                        )}`}
                      >
                        {proposal.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate mb-2">
                      {proposal.address}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {proposal.service}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {proposal.date}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xl font-bold text-foreground">
                      {formatCurrency(proposal.amount)}
                    </span>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-2 py-2 z-50">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setActiveNav(item.label)}
                className={`flex flex-col items-center justify-center py-2 px-4 min-w-[64px] min-h-[56px] rounded-xl transition-colors ${
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className={`h-6 w-6 ${isActive ? "stroke-[2.5px]" : ""}`} />
                <span className={`text-xs mt-1 ${isActive ? "font-semibold" : "font-medium"}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
