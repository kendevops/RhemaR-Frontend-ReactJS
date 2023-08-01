import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";

interface Data {
  sectionName: string;
  section: any;
}

export default function useUpdateCourseSection(sectionId: string) {
  const q = useQueryClient();
  const { course, courses, allCourses } = queryKeys;

  return useMutation(
    (data: Data) => api.patch(`/courses/${sectionId}/sections/update`, data),
    {
      onSuccess: () => {
        q.invalidateQueries([course, allCourses, courses]);
      },
    }
  );
}
