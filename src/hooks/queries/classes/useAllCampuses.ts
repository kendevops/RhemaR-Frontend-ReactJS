import { useQuery } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useAllCampuses() {
  return useQuery([queryKeys.allCampuses], () =>
    api.get(`/campuses`).then((r) => r.data?.data?.campuses)
  );
}
