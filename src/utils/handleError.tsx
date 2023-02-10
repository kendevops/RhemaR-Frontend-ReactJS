import { toast } from "react-toastify";
import ToastContent from "../components/molecules/ToastContent";

export default function handleError(e: any, formData?: any) {
  console.log({ e, formData });

  return toast.error(
    <ToastContent
      type={"error"}
      heading={"An Error Occurred"}
      message={e?.response?.data?.error?.message?.toString()}
    />,
    ToastContent.Config
  );
}
