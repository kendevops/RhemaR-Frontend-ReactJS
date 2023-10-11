import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

interface Data {
  courses: any[];
}

export default function useUploadCourses() {
  const q = useQueryClient();
  const { courses } = queryKeys;
  return useMutation((data: Data) => api.post("/courses/upload", data), {
    onSuccess: () => q.invalidateQueries([courses]),
  });
}
