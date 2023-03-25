import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

interface Data {
  submissions: any[];
}

export default function useSubmitExam(id: string) {
  const q = useQueryClient();
  const { exam, exams, courses } = queryKeys;

  return useMutation((data: Data) => api.post(`/exams/${id}/submit`, data), {
    onSuccess: () => q.invalidateQueries([exam, exams, courses, id]),
  });
}
