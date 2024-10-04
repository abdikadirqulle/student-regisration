import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { studentId: string } },
) {
  const studentId = params.studentId;

  try {
    const student = await db.student.findUnique({
      where: {
        studentId,
      },
    });
    if (!student)
      return NextResponse.json(
        { message: "student not found" },
        { status: 404 },
      );

    return NextResponse.json(
      { result: student },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { studentId: string } },
) {
  try {
    const { name, phone, gender, parentPhone, parentName } =
      await request.json();
    const studentId = params.studentId;

    const student = await db.student.findUnique({
      where: {
        studentId,
      },
    });
    if (!student)
      return NextResponse.json(
        { message: "student not found" },
        { status: 404 },
      );

    const updatedStudent = await db.student.update({
      where: {
        studentId,
      },
      data: {
        name,
        phone,
        gender,
        parentPhone,
        parentName,
      },
    });
    if (!updatedStudent)
      return NextResponse.json(
        { message: "student not updated" },
        { status: 404 },
      );

    return NextResponse.json(
      { message: "student has been updated", result: updatedStudent },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Fail to update student", error: error },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { studentId: string } },
) {
  try {
    const studentId = params.studentId;

    const student = await db.student.findUnique({
      where: {
        studentId,
      },
    });
    if (!student)
      return NextResponse.json(
        { message: "student not found" },
        { status: 404 },
      );

    await db.student.delete({
      where: {
        studentId,
      },
    });

    return NextResponse.json(
      { message: "successfully deleted student" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Fail to update student", error: error },
      { status: 500 },
    );
  }
}
