import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";

type Data = any;
export default function useCreateExamQuestion() {
  const q = useQueryClient();
  const { exam, exams } = queryKeys;
  return useMutation((data: Data) => api.post(`/exams/questions`, data), {
    onSuccess: () => q.invalidateQueries([exam, exams]),
  });
}
