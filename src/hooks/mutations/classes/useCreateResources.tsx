import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

type Data = {
  title: string;
  material: {
    size: number;
    type: string;
    name: string;
    path: string;
  };
};

export default function useCreateResources() {
  const q = useQueryClient();

  return useMutation((data: Data) => api.post(`/resources`, data), {
    onSuccess: () => q.invalidateQueries([queryKeys.resources]),
  });
}
