import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useCreateClassSchedule() {
  const q = useQueryClient();
  const { classes, courses } = queryKeys;
  return useMutation((data: any) => api.post(`/classes/schedule`, data), {
    onSuccess: () => q?.invalidateQueries([classes, courses]),
  });
}
