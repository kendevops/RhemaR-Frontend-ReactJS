import { useMutation } from "@tanstack/react-query";
import api from "../../../api";

export default function useCreateUploadUrl(format: string) {
  return useMutation(() =>
    api
      .get(`/courses/uploads/new/url?extension=${format}`)
      .then((r) => r.data?.data)
  );
}
