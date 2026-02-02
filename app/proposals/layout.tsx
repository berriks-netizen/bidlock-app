"use client"

import { ProposalProvider } from "@/lib/proposal-context"

export default function ProposalsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProposalProvider>
      {children}
    </ProposalProvider>
  )
}
