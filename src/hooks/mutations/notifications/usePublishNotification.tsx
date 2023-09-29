import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";

interface Data {
  type: string;
  title: string;
  content: string;
}

export default function usePublishNotification() {
  const q = useQueryClient();
  const { notifications } = queryKeys;

  return useMutation((Data: Data) => api.post(`/notifications/publish`, Data), {
    onSuccess: () => q.invalidateQueries([notifications]),
  });
}
