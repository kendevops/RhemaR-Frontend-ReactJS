import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useDeleteTuition(id: string) {
  const q = useQueryClient();

  return useMutation(() => api.delete(`/campuses/tuitions/${id}`), {
    onSuccess: () => q.invalidateQueries([queryKeys.campus]),
  });
}
