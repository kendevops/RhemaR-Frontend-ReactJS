import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";

export default function useAllQuizes() {
  return useQuery([queryKeys.quiz], () =>
    api.get(`/quizzes`).then((r) => r.data?.data?.exams)
  );
}
