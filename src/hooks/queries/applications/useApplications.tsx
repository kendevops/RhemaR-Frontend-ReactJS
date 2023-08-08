import { useQuery } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useApplications() {
  return useQuery([queryKeys.applications], () =>
    api.get(`/applications`).then((r) => r?.data?.data?.applications)
  );
}
