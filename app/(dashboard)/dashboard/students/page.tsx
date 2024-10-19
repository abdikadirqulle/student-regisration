import { auth } from "@/auth";
import { getStudents } from "@/data/user";
import { searchParamsCache } from "@/lib/searchparams";
import StudentsListingPage from "@/sections/students/views/student-listing-page";

import { SearchParams } from "nuqs/parsers";
import React from "react";

type pageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: "Dashboard : Students",
};

export default async function Page({ searchParams }: pageProps) {
  const session = await auth();
  const students = await getStudents();

  console.log(session);
  //   console.log({ students: students });
  //   console.log("access token", session?.accessToken);
  //   const token =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndsYWFsZGFhZGFhMzNAZ21haWwuY29tIiwiaWQiOiI2NzBhM2JlNjY2MTY1MjRiMDIyMDM2ZDMiLCJpYXQiOjE3Mjg3Mjg4MzIsImV4cCI6MTcyODczMjQzMn0.UHTZugLri6SpqM716xZWwwnI4uvO4wd_eu5tLoDADjQ"

  //   const response = await fetch("http://localhost:3000/api/students", {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //   })
  //   if (!response.ok) {
  //     console.log("error is here")
  //     throw new Error("Failed to fetch students")
  //   }

  //   const data = await response.json()
  //   console.log("posts :", { data })

  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  return <StudentsListingPage students={students} />;
}
