import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

interface Data {
  quizzes: any[];
}

export default function useUploadQuiz() {
  const q = useQueryClient();
  const { quizzes, quiz } = queryKeys;
  return useMutation((data: Data) => api.post("/quizzes/upload", data), {
    onSuccess: () => q.invalidateQueries([quizzes, quiz]),
  });
}
