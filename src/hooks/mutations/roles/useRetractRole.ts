import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

type Data = { email: string; role: string }[];

export default function useRetractRole() {
  const q = useQueryClient();
  const { roles, users } = queryKeys;
  return useMutation(
    (data: Data) => api.post(`/roles/retract`, { updates: data }),
    {
      onSuccess: () => q.invalidateQueries([roles, users]),
    }
  );
}
