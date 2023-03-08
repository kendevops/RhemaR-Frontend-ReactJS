import { useMutation } from "@tanstack/react-query";
import api from "../../../api";
import removeUrlParams from "../../../utils/removeUrlParams";

type Data = {
  uploadUrl: string;
  file: string;
};

export default function usePutFile() {
  return useMutation(({ file, uploadUrl }: Data) =>
    api
      .put(uploadUrl, file)
      .then((r) => ({ r, fileUrl: removeUrlParams(uploadUrl) }))
  );
}
