"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import Image from "next/image"
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
  { label: "Sent", value: "0", color: "bg-primary/10 text-primary" },
  { label: "Pending", value: "$0", color: "bg-secondary/10 text-secondary" },
  { label: "Accepted", value: "0", color: "bg-emerald-500/10 text-emerald-600" },
]

const navItems = [
  { icon: Home, label: "Home", active: true, path: "/dashboard" },
  { icon: FileText, label: "Proposals", active: false, path: "/proposals" },
  { icon: Users, label: "Customers", active: false, path: "/customers" },
  { icon: Settings, label: "Settings", active: false, path: "/settings" },
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
  const [proposals, setProposals] = useState<any[]>([])
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
    
    // Fetch proposals from database
    if (user) {
      fetchProposals()
    }
  }, [user, loading, router])

  const fetchProposals = async () => {
    if (!user) return
    
    const { data, error } = await supabase
      .from('proposals')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5)

    if (error) {
      console.error('Error fetching proposals:', error)
      return
    }

    setProposals(data || [])
  }

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
            <Image 
              src="/bidlock-logo.svg" 
              alt="BidLock Logo" 
              width={28} 
              height={28}
              className="w-7 h-7"
            />
            <span className="font-semibold text-foreground">BidLock</span>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative h-10 w-10"
              onClick={() => {
                alert('No new notifications')
              }}
            >
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-10 w-10"
              onClick={() => router.push('/settings')}
            >
              <Menu className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Welcome Message */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
          Hey {user?.user_metadata?.business_name || 'there'}! 👋
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
          onClick={() => router.push('/proposals/new')}
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
            <Button 
              onClick={() => router.push('/proposals')}
              variant="ghost" 
              size="sm" 
              className="text-primary text-sm font-medium"
            >
              View All
            </Button>
          </div>

          <div className="space-y-3">
            {proposals.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="text-muted-foreground mb-4">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <h3 className="text-lg font-semibold mb-1">No proposals yet</h3>
              <p className="text-sm">Create your first proposal to get started</p>
            </div>
            <Button 
              onClick={() => router.push('/proposals/new')}
              className="mt-4"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Proposal
            </Button>
          </Card>
        ) : (
        
          {proposals.map((proposal) => (
          <Card key={proposal.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-foreground text-lg">{proposal.customer_name}</h3>

                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{proposal.customer_address}</span>
                  </div>
                </div>
                <Badge variant={proposal.status === "Accepted" ? "default" : proposal.status === "Sent" ? "secondary" : "outline"}>
                  {proposal.status}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-md">
                  <span className="font-medium">{proposal.services?.length || 0} services</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{new Date(proposal.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xl font-bold text-foreground">${proposal.total?.toFixed(2) || '0.00'}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Card>
          ))
        )}
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
                onClick={() => {
                  setActiveNav(item.label)
                  router.push(item.path)
                }}
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
