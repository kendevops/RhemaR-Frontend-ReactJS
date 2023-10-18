import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";
import embedParams from "../../../utils/embedParams";

export default function useAllQuizes(params?: any) {
  return useQuery([queryKeys.quiz], () =>
    api.get(`/quizzes/${embedParams(params)}`).then((r) => r.data?.data?.exams)
  );
}
