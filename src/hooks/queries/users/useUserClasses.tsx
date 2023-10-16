import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";
import embedParams from "../../../utils/embedParams";

export default function useUserClasses(params?: any) {
  return useQuery([queryKeys.classes], () =>
    api
      .get(`/users/me/classes${embedParams(params)}`)
      .then((r) => r.data?.data?.classes)
  );
}
