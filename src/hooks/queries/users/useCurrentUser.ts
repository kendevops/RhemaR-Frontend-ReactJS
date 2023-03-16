import { useQuery } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useCurrentUser() {
  return useQuery(
    [queryKeys.currentUser],
    () => api.get(`/users/me`).then((r) => r.data?.data?.me),
    {
      staleTime: 100,
    }
  );
}
