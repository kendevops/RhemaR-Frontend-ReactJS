import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";

export default function useAllExams() {
  return useQuery([queryKeys.exams], () =>
    api.get(`/exams`).then((r) => r.data?.data?.exams)
  );
}
