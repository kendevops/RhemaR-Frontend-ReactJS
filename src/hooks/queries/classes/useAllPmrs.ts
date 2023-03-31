import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";

export default function useAllPmrs(params?: any) {
  return useQuery([queryKeys.pmr], () =>
    api.get("/pmrs").then((r) => r.data?.data?.pmrs)
  );
}
