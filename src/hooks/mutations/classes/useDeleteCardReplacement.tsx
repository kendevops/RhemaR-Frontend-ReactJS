import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useDeleteCardReplacement(id: string) {
  const q = useQueryClient();

  return useMutation(() => api.delete(`/id-card-replacement-requests/${id}`), {
    onSuccess: () => q.invalidateQueries([queryKeys.card]),
  });
}
