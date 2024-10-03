import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  const students = await db.student.findMany()
  if (students) {
    new NextResponse(JSON.stringify(students), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
