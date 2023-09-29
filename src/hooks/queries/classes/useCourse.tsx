import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";

export default function useCourse(id: string) {
  return useQuery(
    [queryKeys.course, id],
    () => api.get(`/courses/${id}`).then((r) => r?.data?.data?.course),
    {
      enabled: !!id,
    }
  );
}
