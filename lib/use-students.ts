import { useQuery } from "@tanstack/react-query";

// Custom hook to fetch students
export const useStudents = () => {
  // useQuery must be used inside a hook or component, not in async functions
  return useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/students");

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      const { data: students } = await response.json();
      return students;
    },
  });
};
