import { useQuery } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useAllEvents() {
  return useQuery([queryKeys.allEvents], () =>
    api.get("/events").then((res) => res.data?.data.events)
  );
}
