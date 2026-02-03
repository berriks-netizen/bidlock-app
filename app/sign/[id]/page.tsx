"use client"

import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"
import SignatureCanvas from 'react-signature-canvas'

export default function SignProposalPage() {
  const params = useParams()
  const [proposal, setProposal] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isSigning, setIsSigning] = useState(false)
  const [signed, setSigned] = useState(false)
  const sigCanvas = useRef<any>(null)

  useEffect(() => {
    fetchProposal()
  }, [params.id])

  const fetchProposal = async () => {
    const { data, error } = await supabase
      .from('proposals')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error || !data) {
      alert('Proposal not found')
      return
    }

    setProposal(data)
    setLoading(false)
  }

  const handleSign = async () => {
    if (!sigCanvas.current || sigCanvas.current.isEmpty()) {
      alert('Please provide a signature')
      return
    }

    setIsSigning(true)

    try {
      const signatureData = sigCanvas.current.toDataURL()

      // Save signature and update status
      const { error } = await supabase
        .from('proposals')
        .update({
          status: 'accepted',
          signature: signatureData,
          signed_at: new Date().toISOString()
        })
        .eq('id', params.id)

      if (error) {
        alert('Failed to save signature')
        return
      }

      setSigned(true)
    } catch (error) {
      console.error('Signing error:', error)
      alert('An error occurred')
    } finally {
      setIsSigning(false)
    }
  }

  const clearSignature = () => {
    sigCanvas.current?.clear()
  }

  if (loading) {
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

  if (signed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="p-12 text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Proposal Accepted!</h1>
          <p className="text-muted-foreground mb-6">
            Thank you for accepting the proposal. We'll be in touch soon!
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-4">
        <h1 className="text-xl font-bold text-center">Review Proposal</h1>
      </header>

      <main className="px-4 py-6 max-w-2xl mx-auto space-y-6">
        {/* Customer Info */}
        <Card className="p-6">
          <h2 className="font-semibold mb-4">Proposal Details</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Customer:</span>
              <span className="font-medium">{proposal.customer_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span className="font-medium">
                {new Date(proposal.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </Card>

        {/* Services */}
        <Card className="p-6">
          <h2 className="font-semibold mb-4">Services</h2>
          <div className="space-y-3">
            {proposal.services?.map((service: any, idx: number) => (
              <div key={idx} className="flex justify-between">
                <span>{service.name}</span>
                <span className="font-semibold">${service.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t space-y-2">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>${proposal.subtotal?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tax ({proposal.tax_rate}%)</span>
              <span>${((proposal.subtotal * proposal.tax_rate) / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold pt-2 border-t">
              <span>Total</span>
              <span className="text-primary">${proposal.total?.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        {/* Signature */}
        <Card className="p-6">
          <h2 className="font-semibold mb-4">Sign to Accept</h2>
          <div className="border-2 border-dashed border-border rounded-lg overflow-hidden mb-4">
            <SignatureCanvas
              ref={sigCanvas}
              canvasProps={{
                className: 'w-full h-48 cursor-crosshair bg-white',
                style: { touchAction: 'none' }
              }}
            />
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={clearSignature}
              className="flex-1"
            >
              Clear
            </Button>
            <Button
              onClick={handleSign}
              disabled={isSigning}
              className="flex-1"
            >
              {isSigning ? 'Saving...' : 'Accept & Sign'}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4">
            By signing, you agree to the terms and pricing above
          </p>
        </Card>
      </main>
    </div>
  )
}
