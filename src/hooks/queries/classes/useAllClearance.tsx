import { useQuery } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useAllClearance(level: string) {
  return useQuery([queryKeys.clearance], () =>
    api
      .get(`/clearance-applications/${level}`)
      .then((r) => r.data?.data?.clearanceApplications)
  );
}
