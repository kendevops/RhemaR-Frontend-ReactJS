import { useQuery } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useCampusLevel() {
  return useQuery([queryKeys.level], () =>
    api.get(`/levels`).then((r) => r.data.data?.level)
  );
}
