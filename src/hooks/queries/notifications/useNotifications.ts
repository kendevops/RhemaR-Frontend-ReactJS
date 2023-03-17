import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";

export default function useNotifications(id?: string) {
  const url = !!id ? `/notifications/${id}` : `/notifications`;
  return useQuery([queryKeys.notifications, id ?? "all"], () =>
    api.get(url).then((r) => r.data?.data?.notifications)
  );
}
