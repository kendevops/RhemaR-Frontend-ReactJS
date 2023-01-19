import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";

export default function useAllCourses() {
  return useQuery([queryKeys.allCourses], () =>
    api.get(`/courses`).then((r) => r?.data?.data?.courses)
  );
}
