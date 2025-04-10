import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const term = searchParams.get("term")
  const media = searchParams.get("media") || "music"
  const entity = searchParams.get("entity") || "song"
  const limit = searchParams.get("limit") || "25"

  if (!term) {
    return NextResponse.json({ error: "Term parameter is required" }, { status: 400 })
  }

  try {
    const response = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=${media}&entity=${entity}&limit=${limit}`,
    )

    if (!response.ok) {
      throw new Error(`iTunes API responded with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching from iTunes API:", error)
    return NextResponse.json({ error: "Failed to fetch data from iTunes API" }, { status: 500 })
  }
}
