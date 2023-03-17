import { useQuery } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useCampuses() {
  return useQuery([queryKeys.campus], () =>
    api.get(`/campuses`).then((r) => r.data.data?.campuses)
  );
}
