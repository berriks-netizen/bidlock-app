import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const { proposalId, customerEmail, customerName, businessName } = await request.json()

    if (!customerEmail) {
      return NextResponse.json({ error: 'Customer email required' }, { status: 400 })
    }

    // Generate signing link
    const signingLink = `${process.env.NEXT_PUBLIC_APP_URL}/sign/${proposalId}`

    // Send email using Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'BidLock <onboarding@resend.dev>', // Resend's test email
        to: customerEmail,
        subject: `New Proposal from ${businessName}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #ea580c; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
              .button { display: inline-block; background-color: #ea580c; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
              .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Proposal</h1>
              </div>
              <div class="content">
                <p>Hi ${customerName},</p>
                <p><strong>${businessName}</strong> has sent you a proposal.</p>
                <p>Click the button below to review and sign your proposal:</p>
                <a href="${signingLink}" class="button">Review & Sign Proposal</a>
                <p style="color: #6b7280; font-size: 14px;">Or copy this link: ${signingLink}</p>
              </div>
              <div class="footer">
                <p>Sent via BidLock - Professional Proposal Software</p>
              </div>
            </div>
          </body>
          </html>
        `
      })
    })

    const resendData = await resendResponse.json()

    if (!resendResponse.ok) {
      console.error('Resend error:', resendData)
      return NextResponse.json({ error: 'Failed to send email', details: resendData }, { status: 500 })
    }

    // Update proposal status
    await supabase
      .from('proposals')
      .update({ 
        status: 'sent',
        sent_at: new Date().toISOString()
      })
      .eq('id', proposalId)

    return NextResponse.json({ success: true, emailId: resendData.id })
  } catch (error) {
    console.error('Send proposal error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
