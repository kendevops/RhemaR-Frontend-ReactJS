import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useDeferApplication(id: string, level: string) {
  const q = useQueryClient();
  const { applications, users } = queryKeys;
  return useMutation(
    (data) => api.patch(`/applications/${level}/${id}/defer`, data),
    {
      onSuccess: () => q.invalidateQueries([applications, users]),
    }
  );
}
