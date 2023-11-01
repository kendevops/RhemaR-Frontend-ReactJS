import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";
import handleError from "../../../utils/handleError";
import { toast } from "react-toastify";
import ToastContent from "../../../components/molecules/ToastContent";

export default function useStartQuiz(id: string) {
  const { quiz, quizzes } = queryKeys;
  return useQuery(
    [quiz, quizzes, id],
    () => api.get(`/quizzes/${id}/start`).then((r) => r.data?.data?.quiz),
    {
      onError: (e) => {
        // handleError(e);
        toast.error(
          <ToastContent
            heading={"Error"}
            message={"Quiz has ended already"}
            type={"error"}
          />,
          ToastContent.Config
        );
      },
    }
  );
}
