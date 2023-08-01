import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";

export default function useAddCourseSection(courseId: string) {
  const q = useQueryClient();
  const { course, courses, allCourses } = queryKeys;

  return useMutation(
    (data: any) =>
      api.post(`/courses/${courseId}/sections/create`, { section: data }),
    {
      onSuccess: () => {
        q.invalidateQueries([course, allCourses, courses]);
      },
    }
  );
}
