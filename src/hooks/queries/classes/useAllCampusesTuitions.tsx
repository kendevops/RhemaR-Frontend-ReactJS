import { useQuery } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

export default function useAllCampusesTuitions() {
  return useQuery([queryKeys.tuitions], () =>
    api.get(`/campuses/tuitions`).then((r) => r.data?.data?.campuses)
  );
}
