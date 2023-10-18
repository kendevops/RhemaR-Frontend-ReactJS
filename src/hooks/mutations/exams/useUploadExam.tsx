import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

interface Data {
  exams: any[];
}

export default function useUploadExams() {
  const q = useQueryClient();
  const { exams, exam } = queryKeys;
  return useMutation((data: Data) => api.post("/exams/upload", data), {
    onSuccess: () => q.invalidateQueries([exams, exam]),
  });
}
