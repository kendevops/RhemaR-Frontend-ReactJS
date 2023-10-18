import { useQuery } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useAllTranscripts() {
  return useQuery([queryKeys.transcripts], () =>
    api.get(`/transcripts`).then((r) => r.data?.data?.transcripts)
  );
}
