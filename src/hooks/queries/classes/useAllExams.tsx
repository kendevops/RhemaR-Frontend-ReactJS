import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";
import embedParams from "../../../utils/embedParams";

export default function useAllExams(params?: any) {
  return useQuery([queryKeys.exams], () =>
    api.get(`/exams/${embedParams(params)}`).then((r) => r.data?.data?.exams)
  );
}
