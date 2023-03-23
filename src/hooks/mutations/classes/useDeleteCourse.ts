import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";

export default function useDeleteCourseSection(sectionId: string) {
  const q = useQueryClient();
  const { course, courses, allCourses } = queryKeys;

  return useMutation(
    (sectionName: string) =>
      api.delete(`/courses/${sectionId}/sections/delete`, {
        data: {
          sectionName,
        },
      }),
    {
      onSuccess: () => {
        q.invalidateQueries([course, allCourses, courses]);
      },
    }
  );
}
