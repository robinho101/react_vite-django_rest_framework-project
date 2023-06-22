import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { createStudent, editStudent } from "../services/requests";

export const UseCreateOrEditForm = (createOrEdit, studentsPerPage, page) => {
  const client = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: createOrEdit === "edit" ? editStudent : createStudent,
    onSuccess: () => {
      if (createOrEdit === "create") {
        document.querySelector(".createAlert").style.display = "block";
        setTimeout(() => {
          document.querySelector(".createAlert").style.display = "none";
        }, 5000);
      } else if (createOrEdit === "edit") {
        document.querySelector(".editAlert").style.display = "block";
        setTimeout(() => {
          document.querySelector(".editAlert").style.display = "none";
        }, 5000);
      }
      client.invalidateQueries({
        queryKey: ["fetchStudents", page, studentsPerPage],
      });
    },
  });

  return { mutateAsync };
};
