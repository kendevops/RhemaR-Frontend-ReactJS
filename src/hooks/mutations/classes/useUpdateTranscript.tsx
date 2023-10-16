import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";

type Data = any;
export default function useUpateTranscript(id: any) {
  const q = useQueryClient();
  const { transcripts } = queryKeys;
  return useMutation((data: Data) => api.patch(`/transcripts/${id}`, data), {
    onSuccess: () => q.invalidateQueries([transcripts]),
  });
}
