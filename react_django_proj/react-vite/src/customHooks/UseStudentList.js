import { useQuery } from "@tanstack/react-query";
import { fetchStudents } from "../services/requests";

export const UseStudentList = (page, studentsPerPage) => {
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryFn: () => fetchStudents(page, studentsPerPage),
    queryKey: ["fetchStudents", page, studentsPerPage],
    keepPreviousData: true,
  });

  return { data, isLoading, isSuccess, isError };
};
