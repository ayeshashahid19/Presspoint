import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const [
      totalArticles,
      publishedArticles,
      draftArticles,
      totalAuthors,
      totalCategories,
      totalComments,
      totalViews
    ] = await Promise.all([
      prisma.article.count(),
      prisma.article.count({ where: { status: 'published' } }),
      prisma.article.count({ where: { status: 'draft' } }),
      prisma.author.count(),
      prisma.category.count(),
      prisma.comment.count(),
      prisma.article.aggregate({
        _sum: {
          views: true
        }
      })
    ])

    return NextResponse.json({
      stats: {
        totalArticles,
        publishedArticles,
        draftArticles,
        totalAuthors,
        totalCategories,
        totalComments,
        totalViews: totalViews._sum.views || 0
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}