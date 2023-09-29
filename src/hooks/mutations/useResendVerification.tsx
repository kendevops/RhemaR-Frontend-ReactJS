import { useMutation } from "@tanstack/react-query";
import api from "../../api";

interface Data {
  email: any;
}

export default function useResendVerification() {
  return useMutation((data: Data) =>
    api.post("/auth/email/resend-verification", data)
  );
}
