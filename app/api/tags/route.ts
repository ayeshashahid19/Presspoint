import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET - Fetch all tags
export async function GET() {
  try {
    const tags = await prisma.tag.findMany()
    return NextResponse.json(tags)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tags' },
      { status: 500 }
    )
  }
}

// POST - Create new tag
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    if (!body.name) {
      return NextResponse.json(
        { error: 'Tag name is required' },
        { status: 400 }
      )
    }
    
    const tag = await prisma.tag.create({
      data: {
        name: body.name,
        slug: body.slug || body.name.toLowerCase().replace(/\s/g, '-'),
        description: body.description
      }
    })
    
    return NextResponse.json(tag, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create tag' },
      { status: 500 }
    )
  }
}