import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import queryKeys from "../../queryKeys";

export default function useVerifyEmail(id: string) {
  return useQuery(
    [queryKeys.emailVerification],
    () => api.get(`/auth/email/verify/${id}`).then((r) => r.data),
    {
      enabled: !!id,
    }
  );
}
