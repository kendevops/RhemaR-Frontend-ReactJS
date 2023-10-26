import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";

type Data = any;
export default function useUpdateEvent(id: string) {
  const q = useQueryClient();
  const { events, event } = queryKeys;
  return useMutation((data: Data) => api.patch(`/events/${id}`, data), {
    onSuccess: () => q.invalidateQueries([events, event]),
  });
}
