import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

interface Data {
  token: string;
  password: string;
}
export default function useResetPassword() {
  const { currentUser } = queryKeys;
  const q = useQueryClient();

  return useMutation((data: Data) => api.post(`/auth/password/reset`, data), {
    onSuccess: () => q.invalidateQueries([currentUser]),
  });
}
