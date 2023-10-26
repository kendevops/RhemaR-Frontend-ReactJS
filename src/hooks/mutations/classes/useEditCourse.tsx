import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useEditCourse(id: string) {
  const q = useQueryClient();
  const { course, courses, allCourses } = queryKeys;
  return useMutation((data: any) => api.patch(`/courses/${id}`, data), {
    onSuccess: () => q?.invalidateQueries([course, courses, allCourses]),
  });
}
