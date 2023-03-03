import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";

export default function useResources() {
  return useQuery([queryKeys.resources], () =>
    api.get(`/resources`).then((r) => r.data?.data?.resources)
  );
}
