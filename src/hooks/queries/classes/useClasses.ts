import { useQuery } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";
import embedParams from "../../../utils/embedParams";

export default function useClasses(params?: any) {
  return useQuery([queryKeys.classes], () =>
    api
      .get(`/users/me/classes${embedParams(params)}`)
      .then((r) => r?.data?.data)
  );
}
