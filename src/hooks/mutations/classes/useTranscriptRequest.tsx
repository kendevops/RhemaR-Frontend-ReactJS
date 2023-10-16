import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";

type Data = any;
export default function useRequestTranscript() {
  const q = useQueryClient();
  const { transcripts } = queryKeys;
  return useMutation((data: Data) => api.post(`/transcripts`, data), {
    onSuccess: () => q.invalidateQueries([transcripts]),
  });
}
