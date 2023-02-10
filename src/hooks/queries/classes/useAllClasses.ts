import { useQuery } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";
import embedParams from "../../../utils/embedParams";

export default function useAllClasses(params?: any) {
  return useQuery([queryKeys.allClasses], () =>
    api.get(`/classes${embedParams(params)}`).then((r) => r.data?.data?.classes)
  );
}
