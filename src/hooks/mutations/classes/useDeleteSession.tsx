import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useDeleteSession(id: string) {
  const q = useQueryClient();

  return useMutation(() => api.delete(`/sessions/${id}`), {
    onSuccess: () => q.invalidateQueries([queryKeys.academicSession]),
  });
}
