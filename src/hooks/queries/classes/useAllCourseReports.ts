import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";
import embedParams from "../../../utils/embedParams";

export default function useAllCourseReports(params?: any) {
  return useQuery([queryKeys.courses, "reports"], () =>
    api
      .get(`/courses/reports${embedParams(params)}`)
      .then((r) => r.data?.data?.projects)
  );
}
