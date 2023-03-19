import { useMutation } from "@tanstack/react-query";
import api from "../../../api";

type Data = {
  area: string;
  church: string;
  studentComment: string;
  studentData: {
    date: string;
    timeCompleted: number;
    accomplishedMinistryDesc: string;
  }[];
};

export default function useSubmitPmr() {
  return useMutation((data: Data) => api.post(`/pmrs`, data));
}
