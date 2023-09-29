import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

interface Data {
  name: string;
  region: string;
  country: string;
  currency: string;
  continent: string;
  campusCode: string;
  // campusArea: string;
  shortName: string;
  phoneNumber1: string;
  phoneNumber2: string;
  // primaryLanguage: string;
  // secondaryLanguage: string;
  campusAbbreviation: string;
  campusCoordinator: string;
  // zipCode?: number;
  levels: any;
  address: any;
}

export default function useCreateCampus() {
  const q = useQueryClient();
  const { allCampuses, campus, users } = queryKeys;

  return useMutation((data: Data) => api.post(`/campuses`, data), {
    onSuccess: () => q.invalidateQueries([allCampuses, campus, users]),
  });
}
