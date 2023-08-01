import { useQuery } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function usePaymentHistory() {
  return useQuery([queryKeys.paymentHistory], () =>
    api.get(`/users/me/payments`).then((r) => r.data?.data?.payments)
  );
}
