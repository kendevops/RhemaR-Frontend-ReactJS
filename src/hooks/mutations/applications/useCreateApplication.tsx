import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

interface data {
  userTitle: string;
  level: string;
  campus: string;
  intake: string;
  session: string;
  nationality: string;
  dateOfBirth: string;
  maritalStatus: string;
  churchName: string;
  churchAddress: string;
  churchPastorPhoneNumber: string;
  churchPastorName: string;
  isBaptized: boolean;
  isBornAgain: boolean;
  referralSource: string;
  hasBeenBornAgainFor: string;
  classAttendanceMethod: string;
  affirmationsAndSubmissions: string;
  address: {
    city: string;
    street: string;
    state: string;
    country: string;
    zipCode: string;
  };
}

export default function useCreateApplication() {
  const q = useQueryClient();
  const { currentUser, users } = queryKeys;
  return useMutation(
    (data: data) => api.post(`/applications/LEVEL_1/create`, data),
    {
      onSuccess: () => q.invalidateQueries([currentUser, users]),
    }
  );
}
