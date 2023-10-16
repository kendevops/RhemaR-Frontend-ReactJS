import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useDeleteTranscript(id: string) {
  const q = useQueryClient();

  return useMutation(() => api.delete(`/transcripts/${id}`), {
    onSuccess: () => q.invalidateQueries([queryKeys.transcripts]),
  });
}
