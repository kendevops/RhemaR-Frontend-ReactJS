import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";

export default function useAllCourseProjects(courseId: string) {
  return useQuery([queryKeys.courses, "projects"], () =>
    api.get(`/courses/${courseId}/projects`).then((r) => r.data?.data)
  );
}
