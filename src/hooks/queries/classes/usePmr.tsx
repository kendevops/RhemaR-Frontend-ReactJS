import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";

export default function usePmr(studentId: string) {
  return useQuery([queryKeys.pmr, studentId], () =>
    api.get(`/pmrs?studentId=${studentId}`).then((r) => r.data?.data?.pmrs)
  );
}
