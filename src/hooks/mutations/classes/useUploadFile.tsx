import { toast } from "react-toastify";
import useCreateUploadUrl from "./useCreateUploadUrl";
import usePutFile from "./usePutFile";
import ToastContent from "../../../components/molecules/ToastContent";
import getFileFormat from "../../../utils/getFileFormat";

type UseUploadFileParams = {
  file: File;
  onSuccess?: (d: any) => void;
};

export default function useUploadFile({
  file,
  onSuccess,
}: UseUploadFileParams) {
  const createUploadUrl = useCreateUploadUrl(getFileFormat(file?.name));
  const putFile = usePutFile();

  const data = putFile.data;
  const isLoading = createUploadUrl.isLoading || putFile.isLoading;

  function onError(e: any) {
    toast.error(
      <ToastContent
        heading={"An error occurred"}
        type={"error"}
        message={JSON.stringify(
          e?.response?.data?.error?.message ?? e?.message
        )}
      />,
      { ...ToastContent.Config }
    );
    console.log(e);
  }

  function startUpload() {
    console.log({ file });
    createUploadUrl.mutate(undefined, {
      onSuccess: (d) => {
        putFile.mutate(
          { file, uploadUrl: d?.url },
          {
            onSuccess: onSuccess,
            onError,
          }
        );
      },
      onError: (e: any) => {
        console.log(e);
        onError(e);
      },
    });
  }

  return { startUpload, isLoading, data };
}
