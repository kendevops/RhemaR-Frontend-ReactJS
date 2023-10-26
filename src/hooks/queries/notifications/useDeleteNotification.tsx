import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useDeleteNotification(id: string) {
  const q = useQueryClient();

  return useMutation(() => api.delete(`/notifications/${id}`), {
    onSuccess: () => q.invalidateQueries([queryKeys.notifications]),
  });
}
