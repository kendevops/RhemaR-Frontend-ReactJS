import { useMutation } from "@tanstack/react-query";
import api from "../../../api";

type Data = {
  courseId: string;
  desc: string;
  files: any[];
};

export default function useSubmitProject() {
  return useMutation((data: Data) =>
    api.post(`/courses/${data?.courseId}/projects`, data)
  );
}
