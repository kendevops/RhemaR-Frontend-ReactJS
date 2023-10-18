import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import queryKeys from "../../../queryKeys";

interface Data {
  classes: any[];
}

export default function useUploadClasses() {
  const q = useQueryClient();
  const { classes } = queryKeys;
  return useMutation((data: Data) => api.post("/classes/upload", data), {
    onSuccess: () => q.invalidateQueries([classes]),
  });
}
