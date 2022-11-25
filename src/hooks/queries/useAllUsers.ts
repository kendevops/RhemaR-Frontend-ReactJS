import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import queryKeys from "../../queryKeys";

export default function useAllUsers() {
  return useQuery([queryKeys.users], () =>
    api.get("/users").then((r) => r.data)
  );
}
