import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

interface Data {
  name: string;
  session: string;
  endDate: string;
  startDate: string;
  isActive: string;
}

export default function useCreateIntake() {
  const q = useQueryClient();
  const { intakes, academicSession, courses } = queryKeys;
  return useMutation((data: Data) => api.post(`/intakes`, data), {
    onSuccess: () => q?.invalidateQueries([intakes, academicSession, courses]),
  });
}
