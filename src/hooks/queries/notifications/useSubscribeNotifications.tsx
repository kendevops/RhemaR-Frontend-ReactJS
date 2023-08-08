import { useQuery } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useSubscribeNotifications() {
  return useQuery([queryKeys.notifications, "subscribe"], () =>
    api.get("/notifications/subscribe").then((r) => r.data)
  );
}
