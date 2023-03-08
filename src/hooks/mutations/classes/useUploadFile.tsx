import { toast } from "react-toastify";
import useCreateUploadUrl from "./useCreateUploadUrl";
import usePutFile from "./usePutFile";
import ToastContent from "../../../components/molecules/ToastContent";

type UseUploadFileParams = {
  format: string;
  file: string;
  onSuccess?: (d: any) => void;
};

export default function useUploadFile({
  format,
  file,
  onSuccess,
}: UseUploadFileParams) {
  const createUploadUrl = useCreateUploadUrl(format);
  const putFile = usePutFile();

  const data = putFile.data;
  const isLoading = createUploadUrl.isLoading || putFile.isLoading;

  function startUpload() {
    createUploadUrl.mutate(undefined, {
      onSuccess: (d) => {
        putFile.mutate(
          { file, uploadUrl: d?.url },
          {
            onSuccess: onSuccess,
          }
        );
      },
      onError: (e: any) => {
        console.log(e);
        toast.error(
          <ToastContent
            heading={"An error occurred"}
            type={"error"}
            message={JSON.stringify(e?.response?.data?.error?.message)}
          />,
          { ...ToastContent.Config }
        );
      },
    });
  }

  return { startUpload, isLoading, data };
}
