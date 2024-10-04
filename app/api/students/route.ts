import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const students = await db.student.findMany();

    return NextResponse.json({ result: students }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { messeage: "Failed to fetch student", error: error },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, studentId, phone, gender, parentPhone, parentName } =
      await request.json();

    // Find the max studentId to ensure the next student gets the next available ID
    // const lastStudent = await db.student.findFirst({
    //   orderBy: {
    //     studentId: "desc", // Get the student with the highest studentId
    //   },
    // })

    // let nextStudentId = 2000 // Start at 2000 by default

    // if (lastStudent && lastStudent.studentId < 3000) {
    //   nextStudentId = lastStudent.studentId + 1 // Increment from the last studentId
    // } else if (lastStudent && lastStudent.studentId >= 3000) {
    //   return NextResponse.json(
    //     { error: "Maximum number of student IDs reached" },
    //     {
    //       status: 400,
    //     }
    //   )
    // }

    const student = await db.student.findUnique({
      where: {
        studentId,
      },
    });
    if (student)
      return NextResponse.json(
        { message: "student ID already take!" },
        { status: 404 },
      );

    const newStudent = await db.student.create({
      data: {
        name,
        studentId,
        // email,
        phone,
        gender,
        parentPhone,
        parentName,
      },
    });

    return NextResponse.json({ newStudent }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { messeage: "Failed to create student", error: error },
      { status: 500 },
    );
  }
}
