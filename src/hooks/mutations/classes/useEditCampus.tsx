import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

interface Data {
  name: string;
  region?: string;
  country?: string;
  currency?: string;
  continent?: string;
  campusCode?: string;
  campusArea?: string;
  shortName?: string;
  phoneNumber1?: string;
  phoneNumber2?: string;
  primaryLanguage?: string;
  secondaryLanguage?: string;
  campusAbbreviation?: string;
  campusCoordinator?: string;
  levels?: any;
  address?: any;
}
export default function useEditCampus(id: string) {
  const q = useQueryClient();
  const { allCampuses, campus, users } = queryKeys;

  return useMutation((data: Data) => api.patch(`/campuses/${id}`, data), {
    onSuccess: () => q.invalidateQueries([allCampuses, campus, users]),
  });
}
