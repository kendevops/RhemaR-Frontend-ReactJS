import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";

export default function useAllClassesAttendance() {
  return useQuery([queryKeys.classes], () =>
    api
      .get(`/classes/attendances`)
      .then((r) => r.data?.data?.classesAttendances)
  );
}
