import { useQuery } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useAllCardReplacement() {
  return useQuery([queryKeys.card], () =>
    api
      .get(`/id-card-replacement-requests`)
      .then((r) => r.data?.data?.idCardReplacementRequests)
  );
}
