"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

type ProposalData = {
  // Step 1: Customer Info
  customerName: string
  customerPhone: string
  customerEmail: string
  customerAddress: string
  propertyType: string
  
  // Step 2: Photos
  photos: string[] // Will store base64 or URLs
  
  // Step 3: Services
  services: Array<{
    name: string
    description?: string
    price: number
  }>
  
  // Review settings
  taxRate: number
  paymentTerms: string
  validDays: string
}

type ProposalContextType = {
  proposalData: ProposalData
  updateCustomerInfo: (data: Partial<ProposalData>) => void
  addPhoto: (photo: string) => void
  removePhoto: (index: number) => void
  updateServices: (services: ProposalData['services']) => void
  updateReviewSettings: (settings: Partial<ProposalData>) => void
  resetProposal: () => void
  getSubtotal: () => number
  getTotal: () => number
}

const defaultProposalData: ProposalData = {
  customerName: '',
  customerPhone: '',
  customerEmail: '',
  customerAddress: '',
  propertyType: '',
  photos: [],
  services: [],
  taxRate: 8,
  paymentTerms: '50-50',
  validDays: '30'
}

const ProposalContext = createContext<ProposalContextType | undefined>(undefined)

export function ProposalProvider({ children }: { children: ReactNode }) {
  const [proposalData, setProposalData] = useState<ProposalData>(defaultProposalData)

  const updateCustomerInfo = (data: Partial<ProposalData>) => {
    setProposalData(prev => ({ ...prev, ...data }))
  }

  const addPhoto = (photo: string) => {
    setProposalData(prev => ({
      ...prev,
      photos: [...prev.photos, photo]
    }))
  }

  const removePhoto = (index: number) => {
    setProposalData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }))
  }

  const updateServices = (services: ProposalData['services']) => {
    setProposalData(prev => ({ ...prev, services }))
  }

  const updateReviewSettings = (settings: Partial<ProposalData>) => {
    setProposalData(prev => ({ ...prev, ...settings }))
  }

  const resetProposal = () => {
    setProposalData(defaultProposalData)
  }

  const getSubtotal = () => {
    return proposalData.services.reduce((sum, service) => sum + service.price, 0)
  }

  const getTotal = () => {
    const subtotal = getSubtotal()
    const tax = subtotal * (proposalData.taxRate / 100)
    return subtotal + tax
  }

  return (
    <ProposalContext.Provider
      value={{
        proposalData,
        updateCustomerInfo,
        addPhoto,
        removePhoto,
        updateServices,
        updateReviewSettings,
        resetProposal,
        getSubtotal,
        getTotal
      }}
    >
      {children}
    </ProposalContext.Provider>
  )
}

export function useProposal() {
  const context = useContext(ProposalContext)
  if (context === undefined) {
    throw new Error('useProposal must be used within a ProposalProvider')
  }
  return context
}
