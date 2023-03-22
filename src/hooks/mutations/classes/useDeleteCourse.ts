import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";

export default function useDeleteCourseSection(sectionId: string) {
  const q = useQueryClient();
  const { course, courses, allCourses } = queryKeys;

  return useMutation(
    () => api.delete(`/courses/${sectionId}/sections/delete`),
    {
      onSuccess: () => {
        q.invalidateQueries([course, allCourses, courses]);
      },
    }
  );
}
