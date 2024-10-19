import { NextResponse } from "next/server";
import db from "@/lib/db"; // Assuming this is the correct path for your Prisma client

export async function GET() {
  try {
    // Fetch the students from the database
    const students = await db.student.findMany();

    // Return the students in the response
    return NextResponse.json({ students }, { status: 200 });
  } catch (error) {
    // Log the error for debugging purposes (optional)
    console.error("Error fetching students:", error);

    // Return a more detailed error message
    return NextResponse.json(
      { message: "Failed to fetch students", error: error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // const {
    //   name,
    //   email,
    //   course,
    //   flied,
    //   studentId,
    //   phone,
    //   gender,
    //   parentPhone,
    //   parentName,
    // } = await request.json();

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

    // console.log({ body: body });
    // const existingStudent = await db.student.findUnique({
    //   where: {
    //     studentId: body.studentId,
    //   },
    // });
    // if (existingStudent)
    //   return NextResponse.json(
    //     { message: "student ID already take!" },
    //     { status: 404 }
    //   );

    const newStudent = await db.student.create({
      data: {
        ...body,
      },
    });
    // const newStudent = await db.student.create({
    //   data: {
    //     name,
    //     studentId,
    //     email,
    //     phone,
    //     gender,
    //     parentPhone,
    //     parentName,
    //     course,
    //     flied,
    //   },
    // });

    return NextResponse.json({ newStudent }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { messeage: "Failed to create student", error: error },
      { status: 500 }
    );
  }
}
