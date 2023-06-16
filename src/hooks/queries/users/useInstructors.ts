import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";
import embedParams from "../../../utils/embedParams";

export default function useInstructors(params?: any) {
  return useQuery([queryKeys.instructors], () =>
    api
      .get(`/users/instructors${embedParams(params)}`)
      .then((r) => r.data?.data?.instructors)
  );
}
