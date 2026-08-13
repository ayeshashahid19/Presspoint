import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Fetch single author
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params; // ← MUST AWAIT

    const author = await prisma.author.findUnique({
      where: { id: parseInt(id) },
      include: {
        articles: true,
      },
    });

    if (!author) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }

    return NextResponse.json(author);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch author" },
      { status: 500 },
    );
  }
}

// PUT - Update author
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params; // ← MUST AWAIT
    const body = await request.json();

    const existingAuthor = await prisma.author.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingAuthor) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }

    const author = await prisma.author.update({
      where: { id: parseInt(id) },
      data: {
        name: body.name,
        bio: body.bio,
        avatar: body.avatar,
        expertise: body.expertise,
        facebook: body.facebook,
        twitter: body.twitter,
        instagram: body.instagram,
        linkedin: body.linkedin,
      },
    });

    return NextResponse.json(author);
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      {
        error: "Failed to update author",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

// DELETE - Delete author
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params; // ← MUST AWAIT

    await prisma.author.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(
      { message: "Author deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { error: "Failed to delete author" },
      { status: 500 },
    );
  }
}
