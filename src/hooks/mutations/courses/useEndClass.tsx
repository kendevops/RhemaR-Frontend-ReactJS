import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";

type Data = any;
export default function useEndClass(id: string) {
  const q = useQueryClient();
  const { classes } = queryKeys;
  return useMutation((data: Data) => api.patch(`/classes/${id}/end`, data), {
    onSuccess: () => q.invalidateQueries([classes]),
  });
}
