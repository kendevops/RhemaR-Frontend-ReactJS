import { useMutation } from "@tanstack/react-query";
import api from "../../../api";

interface Data {
  message: string;
  survey: {
    question: string;
    rating: number;
    comment: string;
  }[];
}

export default function useSubmitFeedback(classId: string) {
  return useMutation((data: Data) =>
    api.post(`/classes/${classId}/feedbacks`, data)
  );
}
