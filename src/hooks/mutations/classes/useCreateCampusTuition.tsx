import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

interface Data {
  level: string;
  campus: string;
  total?: string;
  discount: string;
  feePayment: string;
  initialPayment: string;
  installmentMinimum: string;
  installmentDuration: string;
  dueDate: string;
}

export default function useCreateCampusTuition() {
  const q = useQueryClient();
  const { allCampuses, campus, users } = queryKeys;

  return useMutation((data: Data) => api.post(`/campuses/tuitions`, data), {
    onSuccess: () => q.invalidateQueries([allCampuses, campus, users]),
  });
}
