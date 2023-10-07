import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";

type Data = any;
export default function useCreateQuiz() {
  const q = useQueryClient();
  const { quiz, exam, exams } = queryKeys;
  return useMutation((data: Data) => api.post(`/quizzes`, data), {
    onSuccess: () => q.invalidateQueries([quiz, exam, exams]),
  });
}
