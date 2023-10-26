import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useDeleteEvent(id: string) {
  const q = useQueryClient();

  return useMutation(() => api.delete(`/events/${id}`), {
    onSuccess: () => q.invalidateQueries([queryKeys.events]),
  });
}
