import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// POST - Send contact message
export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json()
    
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email and message are required' },
        { status: 400 }
      )
    }
    
    const contact = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || '',
        message,
        status: 'new'
      }
    })
    
    return NextResponse.json(
      { success: true, message: 'Message sent successfully!', data: contact },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}

// GET - Fetch all contact messages (for admin panel)
export async function GET() {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(messages)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}