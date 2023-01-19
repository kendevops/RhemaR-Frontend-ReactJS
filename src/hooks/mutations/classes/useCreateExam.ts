import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";

type Data = any;
export default function useCreateExam() {
  const q = useQueryClient();
  const { exam, exams } = queryKeys;
  return useMutation((data: Data) => api.post(`/exams`, data), {
    onSuccess: () => q.invalidateQueries([exam, exams]),
  });
}
