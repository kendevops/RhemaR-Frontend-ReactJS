import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";

type Data = any;
export default function useRequestCardReplacement() {
  const q = useQueryClient();
  const { card } = queryKeys;
  return useMutation(
    (data: Data) => api.post(`/id-card-replacement-requests`, data),
    {
      onSuccess: () => q.invalidateQueries([card]),
    }
  );
}
