import { useQuery } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useCourses() {
  return useQuery([queryKeys.courses], () =>
    api.get(`/users/me/courses`).then((r) => r.data?.data)
  );
}
