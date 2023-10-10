import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useDeleteClearance(level: string, id: string) {
  const q = useQueryClient();

  return useMutation(
    () => api.delete(`/clearance-applications/${level}/${id}`),
    {
      onSuccess: () => q.invalidateQueries([queryKeys.clearance]),
    }
  );
}
