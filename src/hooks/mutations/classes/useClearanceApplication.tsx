import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";

type Data = any;
export default function useClearanceApplication(level: any) {
  const q = useQueryClient();
  const { clearance } = queryKeys;
  return useMutation(
    (data: Data) => api.post(`/clearance-applications/${level}`, data),
    {
      onSuccess: () => q.invalidateQueries([clearance]),
    }
  );
}
