import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

interface Body {
  section: string;
  watchTime: string;
}

export default function useAttendClass(id: string) {
  const q = useQueryClient();
  const { classes, courses } = queryKeys;
  return useMutation(
    (body: Body) =>
      api.post(`/classes/${id}/attend`).then((r) => r?.data?.data),
    {
      onSuccess: () => q.invalidateQueries([classes, courses]),
    }
  );
}
