import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";

type Data = any;
export default function useEditExam(id: string) {
  const q = useQueryClient();
  const { exam, exams } = queryKeys;
  return useMutation((data: Data) => api.patch(`/exams/${id}`, data), {
    onSuccess: () => q.invalidateQueries([exam, exams]),
  });
}
