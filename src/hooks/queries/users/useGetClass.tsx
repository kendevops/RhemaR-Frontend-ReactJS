import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";

export default function useGetClass(id: string) {
  return useQuery(
    [queryKeys.classes, id],
    () => api.get(`/users/me/classes/${id}`).then((r) => r?.data?.data?.class),
    {
      enabled: !!id,
    }
  );
}
