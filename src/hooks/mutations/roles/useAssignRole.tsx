import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

type Data = { email: string; role: string; campus?: string }[];

export default function useAssignRole() {
  const q = useQueryClient();
  const { roles, users } = queryKeys;
  return useMutation(
    (data: Data) => api.post(`/roles/assign`, { updates: data }),
    {
      onSuccess: () => q.invalidateQueries([roles, users]),
    }
  );
}
