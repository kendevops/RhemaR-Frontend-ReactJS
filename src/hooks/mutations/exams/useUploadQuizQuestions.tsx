import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

interface Data {
  questions: any[];
}

export default function useUploadQuizQuestions() {
  const q = useQueryClient();
  const { quizzes, quiz } = queryKeys;
  return useMutation(
    (data: Data) => api.post("/quizzes/questions/upload", data),
    {
      onSuccess: () => q.invalidateQueries([quizzes, quiz]),
    }
  );
}
