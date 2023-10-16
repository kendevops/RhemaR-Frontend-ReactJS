import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useCreateClassAttendance() {
  const q = useQueryClient();
  const { classes, courses } = queryKeys;
  return useMutation((data: any) => api.post(`/classes/attendances`, data), {
    onSuccess: () => q?.invalidateQueries([classes, courses]),
  });
}
