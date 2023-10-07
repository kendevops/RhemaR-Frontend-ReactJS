import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useDeleteQuiz(id: string) {
  const q = useQueryClient();

  return useMutation(() => api.delete(`/quizzes/${id}`), {
    onSuccess: () => q.invalidateQueries([queryKeys.quiz]),
  });
}
