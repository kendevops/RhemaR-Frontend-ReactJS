import { useQuery } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useApplications() {
  return useQuery([queryKeys.applications], () =>
    api.get(`/applications/LEVEL_1`).then((r) => r?.data?.data?.applications)
  );
}
