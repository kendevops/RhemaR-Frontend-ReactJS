import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";

type Data = any;
export default function useUpdateClearanceApplication(level: any, id: any) {
  const q = useQueryClient();
  const { clearance } = queryKeys;
  return useMutation(
    (data: Data) => api.patch(`/clearance-applications/${level}/${id}`, data),
    {
      onSuccess: () => q.invalidateQueries([clearance]),
    }
  );
}
