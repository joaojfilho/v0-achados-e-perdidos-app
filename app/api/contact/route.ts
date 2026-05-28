import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getContactEmail } from '@/lib/email-templates'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { itemId, itemTitle, itemType, ownerEmail, senderName, senderEmail, message } = body

    if (!itemTitle || !senderName || !senderEmail || !message) {
      return NextResponse.json(
        { error: 'Campos obrigatórios faltando' },
        { status: 400 }
      )
    }

    const itemUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/${itemType === 'lost' ? 'perdidos' : 'encontrados'}/${itemId}`

    const emailHtml = getContactEmail({
      itemTitle,
      senderName,
      senderEmail,
      message,
      itemUrl,
    })

    // If we have the owner's email, send to them; otherwise use a fallback
    const toEmail = ownerEmail || process.env.CONTACT_EMAIL || 'contato@exemplo.com'

    const { error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Achados e Perdidos <noreply@resend.dev>',
      to: toEmail,
      replyTo: senderEmail,
      subject: `Nova mensagem sobre: ${itemTitle}`,
      html: emailHtml,
    })

    if (error) {
      console.error('Error sending email:', error)
      return NextResponse.json(
        { error: 'Erro ao enviar email' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in contact API:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
