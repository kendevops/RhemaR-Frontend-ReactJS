import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

interface Data {
  level: string;
  campus: string;
  total: number;
  dueDate: string;
  discount: number;
  feePayment: number;
  initialPayment: number;
  installmentMinimum: number;
}

export default function useCreateCampusTuition() {
  const q = useQueryClient();
  const { allCampuses, campus, users } = queryKeys;

  return useMutation((data: Data) => api.post(`/campuses/tuition`, data), {
    onSuccess: () => q.invalidateQueries([allCampuses, campus, users]),
  });
}
