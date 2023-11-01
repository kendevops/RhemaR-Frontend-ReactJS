import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

interface Data {
  submissions: any[];
}

export default function useSubmitQuiz(id: string) {
  const q = useQueryClient();
  const { quiz, quizzes, courses } = queryKeys;
  return useMutation((data: Data) => api.post(`quizzes/${id}/submit`, data), {
    onSuccess: () => q.invalidateQueries([quiz, quizzes, courses, id]),
  });
}
