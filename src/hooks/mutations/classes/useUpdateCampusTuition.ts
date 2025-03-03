import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

interface Data {
  total: number;
  dueDate: string;
  discount: number;
  feePayment: number;
  initialPayment: number;
  installmentMinimum: number;
}

export default function useUpdateCampusTuition(id: string) {
  const q = useQueryClient();
  const { allCampuses, campus, users } = queryKeys;

  return useMutation(
    (data: Data) => api.patch(`/campuses/tuition/${id}`, data),
    {
      onSuccess: () => q.invalidateQueries([allCampuses, campus, users]),
    }
  );
}
