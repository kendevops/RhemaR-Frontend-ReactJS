import { toast } from "react-toastify";
import ToastContent from "../components/molecules/ToastContent";

export default function handleError(e: any, formData?: any, toggleError?: any) {
  console.log({ e, formData });

  const errorMessage = e?.response?.data?.error?.message;
  const errors = Object.keys(errorMessage);
  errors.forEach((err) => {
    toast.error(
      <ToastContent
        heading={`${err} error`}
        message={errorMessage[err]}
        type={"error"}
      />,
      { ...ToastContent.Config, autoClose: false }
    );

    toggleError && toggleError(err);
  });
}
