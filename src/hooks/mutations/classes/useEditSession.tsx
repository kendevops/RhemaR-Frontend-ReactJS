import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

interface Data {
  name: string;
  endDate: string;
  startDate: string;
  isActive?: string;
}

export default function useEditSession(id: string) {
  const q = useQueryClient();
  const { academicSession, courses } = queryKeys;
  return useMutation((data: Data) => api.patch(`/sessions/${id}`, data), {
    onSuccess: () => q?.invalidateQueries([academicSession, courses]),
  });
}
