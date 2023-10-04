import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";

type Data = any;
export default function useCreateCourseSection(courseId: string) {
  const q = useQueryClient();
  const { course, courses, allCourses } = queryKeys;
  return useMutation(
    (data: Data) => api.post(`/courses/${courseId}/sections`, data),
    {
      onSuccess: () => q.invalidateQueries([course, courses, allCourses]),
    }
  );
}
