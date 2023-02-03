import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

interface Data {
  name: string;
  course: string;
  endTime: string;
  startTime: string;
  instructorEmail: string;
}

export default function useScheduleClass() {
  const q = useQueryClient();
  const { classes, courses, users } = queryKeys;

  return useMutation((data: Data) => api.post(`/classes/schedule`, data), {
    onSuccess: () => q.invalidateQueries([classes, courses, users]),
  });
}
