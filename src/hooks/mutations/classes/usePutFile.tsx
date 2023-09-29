import { useMutation } from "@tanstack/react-query";
import removeUrlParams from "../../../utils/removeUrlParams";

type Data = {
  uploadUrl: string;
  file: File;
};

async function putUrl({ file, uploadUrl }: Data) {
  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: file,
  });

  return res;
}

export default function usePutFile() {
  return useMutation(({ file, uploadUrl }: Data) =>
    putUrl({ file, uploadUrl }).then((r) => ({
      r,
      fileUrl: removeUrlParams(uploadUrl),
    }))
  );
}
