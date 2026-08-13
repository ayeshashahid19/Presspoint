import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Fetch all authors
export async function GET() {
  try {
    const authors = await prisma.author.findMany();
    return NextResponse.json(authors);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch authors" },
      { status: 500 }
    );
  }
}

// POST - Create new author
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name) {
      return NextResponse.json(
        { error: "Author name is required" },
        { status: 400 }
      );
    }

    const author = await prisma.author.create({
      data: {
        name: body.name,
        bio: body.bio || "",
        avatar: body.avatar || "",
        expertise: body.expertise || "",
        facebook: body.facebook || "",
        twitter: body.twitter || "",
        instagram: body.instagram || "",
        linkedin: body.linkedin || "",
      },
    });

    return NextResponse.json(author, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: "Failed to create author" },
      { status: 500 }
    );
  }
}