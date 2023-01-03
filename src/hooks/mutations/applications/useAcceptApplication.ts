import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useAcceptApplication(id: string) {
  const q = useQueryClient();
  const { applications, users } = queryKeys;
  return useMutation(() => api.patch(`/applications/${id}/approve`), {
    onSuccess: () => q.invalidateQueries([applications, users]),
  });
}
