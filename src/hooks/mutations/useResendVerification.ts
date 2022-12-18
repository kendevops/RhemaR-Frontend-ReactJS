import { useMutation } from "@tanstack/react-query";
import api from "../../api";

export default function useResendVerification() {
  return useMutation(() => api.post("/auth/email/resend-verification"));
}
