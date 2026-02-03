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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  ArrowLeft,
  Plus, 
  FileText,
  MapPin,
  DollarSign,
  Clock,
  Home,
  Users,
  Settings,
  ChevronRight
} from "lucide-react"

const navItems = [
  { icon: Home, label: "Home", path: "/dashboard" },
  { icon: FileText, label: "Proposals", path: "/proposals" },
  { icon: Users, label: "Customers", path: "/customers" },
  { icon: Settings, label: "Settings", path: "/settings" },
]

export default function ProposalsPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [activeNav, setActiveNav] = useState("Proposals")
  const [proposals, setProposals] = useState<any[]>([])
  const [allProposals, setAllProposals] = useState<any[]>([])
  const [sortBy, setSortBy] = useState<'recent' | 'oldest' | 'highest' | 'lowest'>('recent')
  const [showFilterDialog, setShowFilterDialog] = useState(false)
  const [dateRange, setDateRange] = useState<'all' | '7days' | '30days' | '90days'>('all')
  const [isExporting, setIsExporting] = useState(false)
  const [showExportDialog, setShowExportDialog] = useState(false)

  const exportToCSV = () => {
    // Filter only sent/accepted proposals
    const exportData = proposals.filter(p => p.status === 'sent' || p.status === 'accepted')
    
    if (exportData.length === 0) {
      alert('No proposals to export')
      return
    }

    // Create CSV content
    const headers = ['Date', 'Customer', 'Address', 'Phone', 'Email', 'Services', 'Subtotal', 'Tax', 'Total', 'Status']
    const rows = exportData.map(p => [
      new Date(p.created_at).toLocaleDateString(),
      p.customer_name || '',
      p.customer_address || '',
      p.customer_phone || '',
      p.customer_email || '',
      p.services?.length || 0,
      p.subtotal?.toFixed(2) || '0.00',
      ((p.subtotal * p.tax_rate) / 100).toFixed(2),
      p.total?.toFixed(2) || '0.00',
      p.status
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `bidlock-proposals-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
    
    setShowExportDialog(false)
  }

  const exportToPDF = async () => {
    setIsExporting(true)
    
    try {
      // Filter only sent/accepted proposals
      const exportData = proposals.filter(p => p.status === 'sent' || p.status === 'accepted')
      
      if (exportData.length === 0) {
        alert('No proposals to export')
        setIsExporting(false)
        return
      }

      // Create simple HTML report
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            h1 { color: #ea580c; margin-bottom: 30px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #f3f4f6; font-weight: bold; }
            tr:nth-child(even) { background-color: #f9fafb; }
            .total-row { font-weight: bold; background-color: #fef3c7 !important; }
          </style>
        </head>
        <body>
          <h1>BidLock Proposals Report</h1>
          <p><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
          <p><strong>Total Proposals:</strong> ${exportData.length}</p>
          <p><strong>Total Value:</strong> $${exportData.reduce((sum, p) => sum + (p.total || 0), 0).toFixed(2)}</p>
          
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Customer</th>
                <th>Services</th>
                <th>Subtotal</th>
                <th>Tax</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${exportData.map(p => `
                <tr>
                  <td>${new Date(p.created_at).toLocaleDateString()}</td>
                  <td>${p.customer_name || ''}</td>
                  <td>${p.services?.length || 0}</td>
                  <td>$${p.subtotal?.toFixed(2) || '0.00'}</td>
                  <td>$${((p.subtotal * p.tax_rate) / 100).toFixed(2)}</td>
                  <td>$${p.total?.toFixed(2) || '0.00'}</td>
                  <td>${p.status}</td>
                </tr>
              `).join('')}
              <tr class="total-row">
                <td colspan="5" style="text-align: right;">GRAND TOTAL:</td>
                <td>$${exportData.reduce((sum, p) => sum + (p.total || 0), 0).toFixed(2)}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </body>
        </html>
      `

      // Create blob and download
      const blob = new Blob([htmlContent], { type: 'text/html' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `bidlock-proposals-${new Date().toISOString().split('T')[0]}.html`
      a.click()
      window.URL.revokeObjectURL(url)
      
      alert('HTML report downloaded! Open it in your browser and print to PDF (Ctrl+P or Cmd+P)')
      setShowExportDialog(false)
    } catch (error) {
      console.error('Export error:', error)
      alert('Failed to export')
    } finally {
      setIsExporting(false)
    }
  }

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

    if (error) {
      console.error('Error fetching proposals:', error)
      return
    }

    setAllProposals(data || [])
    applyFilters(data || [], sortBy, dateRange)
  }

  const applyFilters = (data: any[], sort: typeof sortBy, range: typeof dateRange) => {
    let filtered = [...data]

    // Date range filter
    if (range !== 'all') {
      const now = new Date()
      const cutoff = new Date()
      
      switch (range) {
        case '7days':
          cutoff.setDate(now.getDate() - 7)
          break
        case '30days':
          cutoff.setDate(now.getDate() - 30)
          break
        case '90days':
          cutoff.setDate(now.getDate() - 90)
          break
      }
      
      filtered = filtered.filter(p => new Date(p.created_at) >= cutoff)
    }

    // Sort
    switch (sort) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case 'oldest':
        filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        break
      case 'highest':
        filtered.sort((a, b) => (b.total || 0) - (a.total || 0))
        break
      case 'lowest':
        filtered.sort((a, b) => (a.total || 0) - (b.total || 0))
        break
    }

    setProposals(filtered)
  }

  const handleSortChange = (newSort: typeof sortBy) => {
    setSortBy(newSort)
    applyFilters(allProposals, newSort, dateRange)
  }

  const handleDateRangeChange = (newRange: typeof dateRange) => {
    setDateRange(newRange)
    applyFilters(allProposals, sortBy, newRange)
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
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => router.push('/dashboard')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">All Proposals</h1>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              size="sm"
              onClick={() => setShowExportDialog(true)}
            >
              Export
            </Button>
            <Button 
              onClick={() => router.push('/proposals/new')}
              size="sm"
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              New
            </Button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="h-9 text-sm flex-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="highest">Highest Value</SelectItem>
              <SelectItem value="lowest">Lowest Value</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={dateRange} onValueChange={handleDateRangeChange}>
            <SelectTrigger className="h-9 text-sm flex-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      <main className="px-4 py-6">
        {proposals.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="text-muted-foreground mb-4">
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No proposals yet</h3>
              <p className="text-sm mb-6">Start creating proposals to grow your business</p>
            </div>
            <Button 
              onClick={() => router.push('/proposals/new')}
              size="lg"
              className="gap-2"
            >
              <Plus className="h-5 w-5" />
              Create Your First Proposal
            </Button>
          </Card>
        ) : (
          <div className="space-y-3">
            {proposals.map((proposal) => (
              <Card 
                key={proposal.id} 
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => router.push(`/proposals/${proposal.id}`)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">{proposal.customer_name}</h3>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{proposal.customer_address}</span>
                    </div>
                  </div>
                  <Badge>{proposal.status}</Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm mb-3">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-md">
                    <span className="font-medium">{proposal.services?.length || 0} services</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{new Date(proposal.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xl font-bold text-foreground">${proposal.total?.toFixed(2) || '0.00'}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-2 py-2 z-50">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = item.path === '/proposals'; // Always active on proposals page
            return (
              <button
                key={item.label}
                onClick={() => {
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
            )
          })}
        </div>
      </nav>
      {/* Export Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent className="mx-4 rounded-2xl">
          <DialogHeader>
            <DialogTitle>Export Proposals</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground pt-2">
            Export all sent and accepted proposals for tax purposes
          </p>
          <div className="space-y-3 pt-4">
            <Button
              variant="outline"
              className="w-full h-14 text-base font-semibold"
              onClick={exportToCSV}
            >
              Export to CSV (Excel)
            </Button>
            <Button
              variant="outline"
              className="w-full h-14 text-base font-semibold"
              onClick={exportToPDF}
              disabled={isExporting}
            >
              {isExporting ? 'Generating...' : 'Export to PDF'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
