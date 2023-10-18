import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";
import embedParams from "../../../utils/embedParams";

export default function useUserCourses() {
  return useQuery([queryKeys.courses], () =>
    api.get(`/users/me/courses`).then((r) => r.data?.data?.courses)
  );
}
