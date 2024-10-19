import db from "@/lib/db";

export const getAdminByEmail = async (email: string) => {
  try {
    const admin = await db.admin.findUnique({ where: { email } });

    return admin;
  } catch {
    return null;
  }
};

export const getAdminById = async (id: string) => {
  try {
    const admin = await db.admin.findUnique({ where: { id } });

    return admin;
  } catch {
    return null;
  }
};

export const getStudents = async () => {
  try {
    const students = await db.student.findMany();
    return students;
  } catch {
    return null;
  }
};
