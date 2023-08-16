import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useDeleteCampus(id: string) {
  const q = useQueryClient();

  return useMutation(() => api.delete(`/campuses/${id}`), {
    onSuccess: () => q.invalidateQueries([queryKeys.campus]),
  });
}
