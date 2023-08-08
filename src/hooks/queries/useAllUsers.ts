import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import queryKeys from "../../queryKeys";
import embedParams from "../../utils/embedParams";

export default function useAllUsers(params?: any) {
  return useQuery([queryKeys.users, embedParams(params)], () =>
    api.get(`/users${embedParams(params)}`).then((r) => r.data?.data)
  );
}
