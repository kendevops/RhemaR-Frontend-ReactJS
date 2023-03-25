import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";

export default function useExam(id: string) {
  const { exam, exams } = queryKeys;
  return useQuery([exam, exams, id], () =>
    api.get(`/exams/${id}/start`).then((r) => r.data)
  );
}
