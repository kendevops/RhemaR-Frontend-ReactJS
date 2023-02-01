import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useCreateCourse() {
  const q = useQueryClient();
  const { course, courses, allCourses } = queryKeys;
  return useMutation((data: any) => api.post(`/courses/create`, data), {
    onSuccess: () => q?.invalidateQueries([course, courses, allCourses]),
  });
}
