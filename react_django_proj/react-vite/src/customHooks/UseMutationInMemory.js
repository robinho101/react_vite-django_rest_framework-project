import { useMutation } from "@tanstack/react-query";
import { putRequestToInMemoryDatabase } from "../services/requests";
import { useQueryClient } from "@tanstack/react-query";

export const UseMutationInMemory = (set) => {
  const client = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: putRequestToInMemoryDatabase,
    onSuccess: (data) => {
      console.log(`data - ${data}, ${typeof data}`);
      set(data);
    },
  });
  return { mutateAsync };
};
