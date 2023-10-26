import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useCreateFAQ() {
  const q = useQueryClient();
  const { faqs } = queryKeys;
  return useMutation((data: any) => api.post(`/faqs`, data), {
    onSuccess: () => q?.invalidateQueries([faqs]),
  });
}
