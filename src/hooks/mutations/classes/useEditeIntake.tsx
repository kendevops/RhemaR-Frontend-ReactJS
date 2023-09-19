import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

interface Data {
  name: string;
  session: string;
  endDate: string;
  startDate: string;
  isActive?: string;
}

export default function useEditIntake(id: string) {
  const q = useQueryClient();
  const { intakes, academicSession, courses } = queryKeys;
  return useMutation((data: Data) => api.patch(`/intakes/${id}`, data), {
    onSuccess: () => q?.invalidateQueries([intakes, academicSession, courses]),
  });
}
