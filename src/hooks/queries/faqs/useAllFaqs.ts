import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";

export default function useAllFaqs() {
  return useQuery([queryKeys.faqs], () =>
    api.get(`faqs`).then((r) => r.data?.data)
  );
}
