import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";

type Data = any;
export default function useCreateQuizQuestion() {
  const q = useQueryClient();
  const { quiz, quizzes } = queryKeys;
  return useMutation(
    (data: Data) => api.post(`/quizzes/questions/upload`, data),
    {
      onSuccess: () => q.invalidateQueries([quiz, quizzes]),
    }
  );
}
