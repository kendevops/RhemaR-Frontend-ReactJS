import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useUpdateFaq(id: string | undefined) {
  const q = useQueryClient();
  const { faqs } = queryKeys;
  return useMutation((data: any) => api.patch(`/faqs/${id}`, data), {
    onSuccess: () => q?.invalidateQueries([faqs]),
  });
}
