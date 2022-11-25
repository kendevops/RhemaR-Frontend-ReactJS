import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import queryKeys from "../../queryKeys";

export default function useRoles() {
  return useQuery([queryKeys.roles], () =>
    api.get(`/roles`).then((r) => {
      return r.data;
    })
  );
}
