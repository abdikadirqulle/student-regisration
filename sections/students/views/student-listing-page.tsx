import { Breadcrumbs } from "@/components/breadcrumbs";

import { buttonVariants } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import { Students } from "@/constants/data";

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import PageContainer from "@/components/PageContainer";
import { searchParamsCache } from "@/lib/searchparams";
import StudentTable from "../student-tables";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Student", link: "/dashboard/student" },
];

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TStudentListingPage = {
  id: string;
  studentId: string;
  name: string;
  email: string | null;
  createdAt: Date;
  gender: string;
  parentName: string;
  phone: number;
  parentPhone: number;
};

export default async function StudentsListingPage({
  students,
}: {
  students: Students[] | null;
}) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get("page");
  const search = searchParamsCache.get("q");
  const gender = searchParamsCache.get("gender");
  const pageLimit = searchParamsCache.get("limit");

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(gender && { genders: gender }),
  };

  // mock api call

  // //   Use React Query to fetch data
  //       const { data, isLoading, error } = useQuery(
  //           ["students", filters], // Query key
  //           () => fetchStudents(filters) // Fetch function
  //         );

  // //   Assuming the API returns similar structure with users and total_users
  //        const totalUsers = data?.total_users;
  //        const students: Students[] = data?.users;

  const safeStudents = students || [];
  const totalUsers = safeStudents.length;
  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{`Student (${totalUsers})`}</h2>
            <p className="text-sm text-muted-foreground">
              Manage student (Server side table functionalities.)
            </p>
          </div>
          <Link
            href={"/dashboard/students/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <StudentTable data={safeStudents} totalData={totalUsers} />
      </div>
    </PageContainer>
  );
}
