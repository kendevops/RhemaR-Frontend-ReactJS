import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useRejectApplication(id: string, level: string) {
  const q = useQueryClient();
  const { applications, users } = queryKeys;
  return useMutation(() => api.patch(`/applications/${level}/${id}/reject`), {
    onSuccess: () => q.invalidateQueries([applications, users]),
  });
}
