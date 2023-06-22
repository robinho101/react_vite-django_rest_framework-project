import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { deleteStudent } from "../services/requests";

export const UseDeleteStudent = () => {
  const client = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      document
        .querySelector(`[data-pk='${localStorage.getItem("deletedElem")}']`)
        .querySelectorAll(".studentData")
        .forEach((elem) => {
          elem.style.textDecoration = "line-through";
        });

      document
        .querySelector(`[data-pk='${localStorage.getItem("deletedElem")}']`)
        .querySelectorAll("button")
        .forEach((elem) => {
          elem.disabled = true;
        });

      client.invalidateQueries({
        queryKey: ["fetchStudents"],
      });
    },
  });

  return { mutateAsync };
};
