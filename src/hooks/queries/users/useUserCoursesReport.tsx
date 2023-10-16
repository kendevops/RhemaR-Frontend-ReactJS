import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";
import embedParams from "../../../utils/embedParams";

export default function useUserCoursesReport(params?: any) {
  return useQuery([queryKeys.reports], () =>
    api
      .get(`/users/me/courses/reports${embedParams(params)}`)
      .then((r) => r.data?.data?.reports)
  );
}
