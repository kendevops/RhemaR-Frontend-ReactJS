import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";

export default function useUpdateCourseSection(sectionId: string) {
  const q = useQueryClient();
  const { course, courses, allCourses } = queryKeys;

  return useMutation(() => api.patch(`/courses/${sectionId}/sections/update`), {
    onSuccess: () => {
      q.invalidateQueries([course, allCourses, courses]);
    },
  });
}
