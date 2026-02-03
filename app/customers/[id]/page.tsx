"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  FileText,
  Trash2,
  DollarSign,
} from "lucide-react"

export default function CustomerDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { user, loading: authLoading } = useAuth()
  const [customer, setCustomer] = useState<any>(null)
  const [proposals, setProposals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/')
      return
    }

    if (user && params.id) {
      fetchCustomerData()
    }
  }, [user, authLoading, params.id])

  const fetchCustomerData = async () => {
    // Fetch all proposals for this customer
    const { data, error } = await supabase
      .from('proposals')
      .select('*')
      .eq('user_id', user?.id)
      .eq('customer_name', decodeURIComponent(params.id as string))
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching customer data:', error)
      router.push('/customers')
      return
    }

    if (data && data.length > 0) {
      // Use first proposal for customer details
      setCustomer({
        name: data[0].customer_name,
        phone: data[0].customer_phone,
        email: data[0].customer_email,
        address: data[0].customer_address,
      })
      setProposals(data)
    }

    setLoading(false)
  }

  const handleDeleteCustomer = async () => {
    if (!confirm(`Delete all proposals for ${customer.name}? This cannot be undone.`)) return

    // Delete all proposals for this customer
    const { error } = await supabase
      .from('proposals')
      .delete()
      .eq('user_id', user?.id)
      .eq('customer_name', customer.name)

    if (error) {
      alert('Failed to delete customer')
      return
    }

    router.push('/customers')
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading customer...</p>
        </div>
      </div>
    )
  }

  if (!customer) return null

  const totalSpent = proposals.reduce((sum, p) => sum + (p.total || 0), 0)

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Customer Details</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Customer Info Card */}
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">{customer.name}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {proposals.length} proposal{proposals.length !== 1 ? 's' : ''}
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteCustomer}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>

          <div className="space-y-3">
            {customer.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <a href={`tel:${customer.phone}`} className="text-primary hover:underline">
                  {customer.phone}
                </a>
              </div>
            )}
            {customer.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <a href={`mailto:${customer.email}`} className="text-primary hover:underline">
                  {customer.email}
                </a>
              </div>
            )}
            {customer.address && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <p>{customer.address}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Stats Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Value</p>
              <p className="text-3xl font-bold text-primary">${totalSpent.toFixed(2)}</p>
            </div>
            <DollarSign className="w-12 h-12 text-muted-foreground opacity-20" />
          </div>
        </Card>

        {/* Proposals List */}
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Proposals
          </h3>
          <div className="space-y-3">
            {proposals.map((proposal) => (
              <Card
                key={proposal.id}
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => router.push(`/proposals/${proposal.id}`)}
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={proposal.status === 'sent' ? 'secondary' : 'default'}>
                    {proposal.status}
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    {new Date(proposal.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {proposal.services?.length || 0} services
                  </p>
                  <p className="text-xl font-bold text-primary">
                    ${proposal.total?.toFixed(2)}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
