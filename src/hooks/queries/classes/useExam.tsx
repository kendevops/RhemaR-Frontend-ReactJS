import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";
import handleError from "../../../utils/handleError";
import ToastContent from "../../../components/molecules/ToastContent";
import { toast } from "react-toastify";

export default function useExam(id: string) {
  const { exam, exams } = queryKeys;
  return useQuery(
    [exam, exams, id],
    () => api.get(`/exams/${id}/start`).then((r) => r.data?.data?.exam),
    {
      onError: (e) => {
        // handleError(e);
        toast.error(
          <ToastContent
            heading={"Error"}
            message={"Exam has ended already"}
            type={"error"}
          />,
          ToastContent.Config
        );
      },
    }
  );
}
