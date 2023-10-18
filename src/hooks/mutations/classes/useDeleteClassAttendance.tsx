import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useDeleteClassAttendance(id: string) {
  const q = useQueryClient();

  return useMutation(() => api.delete(`/classes/attendances/${id}`), {
    onSuccess: () => q.invalidateQueries([queryKeys.classes]),
  });
}
