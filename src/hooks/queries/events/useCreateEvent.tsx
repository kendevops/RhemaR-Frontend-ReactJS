import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";

type Data = any;
export default function useCreateEvent() {
  const q = useQueryClient();
  const { events } = queryKeys;
  return useMutation((data: Data) => api.post(`/events`, data), {
    onSuccess: () => q.invalidateQueries([events]),
  });
}
