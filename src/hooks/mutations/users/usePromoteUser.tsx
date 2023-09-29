import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

interface Data {
  level: "LEVEL_1" | "LEVEL_2";
  userId: string;
}

export default function usePromoteUser() {
  const q = useQueryClient();

  return useMutation((data: Data) => api.post("/users/promote", data), {
    onSuccess: () => q.invalidateQueries([queryKeys.users]),
  });
}
