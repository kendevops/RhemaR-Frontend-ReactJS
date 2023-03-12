import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useDeleteResources(id: string) {
  const q = useQueryClient();

  return useMutation(() => api.delete(`/resources/${id}`), {
    onSuccess: () => q.invalidateQueries([queryKeys.resources]),
  });
}
