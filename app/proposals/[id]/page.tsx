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
  Calendar,
  DollarSign,
  FileText,
  Trash2,
  Edit,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

export default function ProposalDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { user, loading: authLoading } = useAuth()
  const [proposal, setProposal] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/')
      return
    }

    if (user && params.id) {
      fetchProposal()
    }
  }, [user, authLoading, params.id])

  const fetchProposal = async () => {
    const { data, error } = await supabase
      .from('proposals')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', user?.id)
      .single()

    if (error) {
      console.error('Error fetching proposal:', error)
      router.push('/proposals')
      return
    }

    setProposal(data)
    setLoading(false)
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this proposal?')) return

    const { error } = await supabase
      .from('proposals')
      .delete()
      .eq('id', params.id)

    if (error) {
      alert('Failed to delete proposal')
      return
    }

    router.push('/proposals')
  }

  const nextPhoto = () => {
    if (proposal?.photos?.length > 0) {
      setCurrentPhotoIndex((prev) => (prev + 1) % proposal.photos.length)
    }
  }

  const prevPhoto = () => {
    if (proposal?.photos?.length > 0) {
      setCurrentPhotoIndex(
        (prev) => (prev - 1 + proposal.photos.length) % proposal.photos.length
      )
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading proposal...</p>
        </div>
      </div>
    )
  }

  if (!proposal) return null

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
          <h1 className="text-lg font-semibold">Proposal Details</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Status Badge */}
        <div className="flex items-center justify-between">
          <Badge variant={proposal.status === 'sent' ? 'secondary' : 'default'}>
            {proposal.status}
          </Badge>
          <p className="text-sm text-muted-foreground">
            Created {new Date(proposal.created_at).toLocaleDateString()}
          </p>
        </div>

        {/* Customer Info */}
        <Card className="p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Customer Information
          </h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{proposal.customer_name}</p>
            </div>
            {proposal.customer_phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <p>{proposal.customer_phone}</p>
              </div>
            )}
            {proposal.customer_email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <p>{proposal.customer_email}</p>
              </div>
            )}
            {proposal.customer_address && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <p>{proposal.customer_address}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Photos */}
        {proposal.photos && proposal.photos.length > 0 && (
          <Card className="p-6">
            <h2 className="font-semibold mb-4">Project Photos</h2>
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                <img
                  src={proposal.photos[currentPhotoIndex]}
                  alt={`Photo ${currentPhotoIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {proposal.photos.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-card/90 rounded-full flex items-center justify-center shadow-md"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-card/90 rounded-full flex items-center justify-center shadow-md"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="flex justify-center gap-1.5 mt-3">
                    {proposal.photos.map((_: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentPhotoIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          idx === currentPhotoIndex
                            ? "bg-primary"
                            : "bg-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </Card>
        )}

        {/* Services */}
        <Card className="p-6">
          <h2 className="font-semibold mb-4">Services</h2>
          <div className="space-y-3">
            {proposal.services?.map((service: any, idx: number) => (
              <div
                key={idx}
                className="flex justify-between items-center py-2 border-b border-border last:border-0"
              >
                <span>{service.name}</span>
                <span className="font-semibold">
                  ${service.price.toLocaleString()}.00
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="mt-6 pt-4 border-t space-y-2">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>${proposal.subtotal?.toLocaleString()}.00</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tax ({proposal.tax_rate}%)</span>
              <span>${((proposal.subtotal * proposal.tax_rate) / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t">
              <span className="text-xl font-bold">Total</span>
              <span className="text-2xl font-bold text-primary">
                ${proposal.total?.toFixed(2)}
              </span>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 h-12"
            onClick={() => router.push(`/proposals/${proposal.id}/edit`)}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="destructive"
            className="flex-1 h-12"
            onClick={handleDelete}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </main>
    </div>
  )
}
