import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

interface Data {
  users: any[];
}

export default function useUploadUsers() {
  const q = useQueryClient();
  const { users } = queryKeys;
  return useMutation((data: Data) => api.post("/users/upload", data), {
    onSuccess: () => q.invalidateQueries([users]),
  });
}
