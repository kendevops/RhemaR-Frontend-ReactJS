import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useDeleteTuition(tuitionId: any) {
  const q = useQueryClient();

  return useMutation(() => api.delete(`/campuses/tuitions/${tuitionId}`), {
    onSuccess: () => q.invalidateQueries([queryKeys.campus]),
  });
}
