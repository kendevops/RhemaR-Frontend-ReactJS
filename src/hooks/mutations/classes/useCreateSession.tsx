import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

interface Data {
  name: string;
  endDate: string;
  startDate: string;
  isActive: string;
}

export default function useCreateSession() {
  const q = useQueryClient();
  const { academicSession, courses } = queryKeys;
  return useMutation((data: Data) => api.post(`/sessions`, data), {
    onSuccess: () => q?.invalidateQueries([academicSession, courses]),
  });
}
