import { useQuery } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useAcademicSessions() {
  return useQuery([queryKeys.academicSession], () =>
    api.get(`/sessions`).then((r) => r?.data?.data?.sessions)
  );
}
