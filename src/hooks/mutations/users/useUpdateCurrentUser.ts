import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

interface data {
  gender: "MALE" | "FEMALE";
  lastName: string;
  firstName: string;
  middleName: string;
  dateOfBirth: number;
  nationality: string;
  phoneNumber: string;
  altPhoneNumber: string;
  maritalStatus: "married" | "single";
  address: {
    city: string;
    street: string;
    state: string;
    country: string;
    zipCode: number;
  };
}

export default function useUpdateCurrentUser() {
  const q = useQueryClient();
  return useMutation((data: data) => api.patch(`/users/me/update`, data), {
    onSuccess: (res) => {
      q.invalidateQueries([queryKeys.currentUser]);
      const data = res?.data?.data;
      localStorage.setItem("userData", JSON.stringify(data));
    },
  });
}
