import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";

type Data = any;
export default function useUpateCardReplacement(id: any) {
  const q = useQueryClient();
  const { card } = queryKeys;
  return useMutation(
    (data: Data) => api.patch(`/clearance-applications/${id}`, data),
    {
      onSuccess: () => q.invalidateQueries([card]),
    }
  );
}
