import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

interface Body {
  sectionId: string;
  watchTime: number;
}

export default function useAttendClass(id: string) {
  const q = useQueryClient();
  const { classes, courses } = queryKeys;
  return useMutation(
    (body: Body) =>
      api.post(`/classes/${id}/attend`, body).then((r) => r?.data?.data),
    {
      onSuccess: () => q.invalidateQueries([classes, courses]),
    }
  );
}
