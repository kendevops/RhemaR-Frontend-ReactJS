import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

interface Data {
  questions: any[];
}

export default function useUploadExamQuestions() {
  const q = useQueryClient();
  const { exams, exam } = queryKeys;
  return useMutation(
    (data: Data) => api.post("/exams/questions/upload", data),
    {
      onSuccess: () => q.invalidateQueries([exams, exam]),
    }
  );
}
