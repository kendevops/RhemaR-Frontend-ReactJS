import { useQuery } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useEvent(id: string) {
  return useQuery([queryKeys.allEvents, id], () =>
    api.get(`/events/${id}`).then((res) => res.data?.data.event)
  );
}
