import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useDeleteCourses(id: string) {
  const q = useQueryClient();

  return useMutation(() => api.delete(`/courses/${id}`), {
    onSuccess: () => q.invalidateQueries([queryKeys.courses]),
  });
}
