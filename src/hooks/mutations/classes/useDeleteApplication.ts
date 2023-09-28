import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useDeleteApplication(id: string) {
  const q = useQueryClient();

  return useMutation(() => api.delete(`/applications/${id}`), {
    onSuccess: () => q.invalidateQueries([queryKeys.applications]),
  });
}
