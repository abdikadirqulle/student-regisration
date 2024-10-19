import axios from "axios";

import db from "@/lib/db";
import { toast } from "sonner";
import { Students } from "@/constants/data";
import { z } from "zod";
import { formSchema } from "@/sections/students/student-form";
import { redirect } from "next/navigation";

export const getStudents = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/students");

    if (!response.ok) {
      return null;
      //   throw new Error(`Failed to fetch students. Status: ${response.status}`);
    }

    const { data: students } = await response.json();

    return students;
  } catch {
    return null;
  }
};

export const usecreateStudent = async (data: z.infer<typeof formSchema>) => {
  try {
    await fetch("http://localhost:3000/api/students", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.log(res.error);
          toast.error(res.error.message);
          toast.error("faild to added new student");
        } else {
          toast.success("student has been added.");
          redirect("dashboard/students");
        }
      });
  } catch (error) {
    console.log(error);
  }
};
