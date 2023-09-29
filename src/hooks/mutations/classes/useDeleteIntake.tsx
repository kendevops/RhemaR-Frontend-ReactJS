import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useDeleteIntake(id: string) {
  const q = useQueryClient();

  return useMutation(() => api.delete(`/intakes/${id}`), {
    onSuccess: () => q.invalidateQueries([queryKeys.intakes]),
  });
}
