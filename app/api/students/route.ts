import { NextResponse } from "next/server"

export async function GET() {
  return new NextResponse("welcome system registrations:", { status: 200 })
}

export async function POST() {}
