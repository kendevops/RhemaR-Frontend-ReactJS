import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

interface Data {
  level: string;
  campus: string;
  total?: number;
  discount: number;
  feePayment: number;
  initialPayment: number;
  installmentMinimum: number;
  installmentMinimumDurationInMonths: number;
  dueDate: string;
}

export default function useUpdateCampusTuition(id: string) {
  const q = useQueryClient();
  const { allCampuses, campus, users } = queryKeys;

  return useMutation(
    (data: Data) => api.patch(`/campuses/tuitions/${id}`, data),
    {
      onSuccess: () => q.invalidateQueries([allCampuses, campus, users]),
    }
  );
}
