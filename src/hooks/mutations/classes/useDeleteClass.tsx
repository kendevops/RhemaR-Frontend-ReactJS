import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useDeleteClass(id: string) {
  const q = useQueryClient();

  return useMutation(() => api.delete(`/classes/${id}`), {
    onSuccess: () => q.invalidateQueries([queryKeys.classes]),
  });
}
