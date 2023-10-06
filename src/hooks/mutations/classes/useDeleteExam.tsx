import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useDeleteExam(id: string) {
  const q = useQueryClient();

  return useMutation(() => api.delete(`/exams/${id}`), {
    onSuccess: () => q.invalidateQueries([queryKeys.exam]),
  });
}
