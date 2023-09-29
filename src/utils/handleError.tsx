import { toast } from "react-toastify";
import ToastContent from "../components/molecules/ToastContent";

export default function handleError(e: any, formData?: any, toggleError?: any) {
  console.log({ e, formData });

  const errorMessage = e?.response?.data?.error?.message;

  if (typeof errorMessage === "string") {
    toast.error(
      <ToastContent
        heading={`An error occurred`}
        message={errorMessage}
        type={"error"}
      />,
      { ...ToastContent.Config }
    );
  } else if (
    formData?.phoneNumber &&
    !formData?.phoneNumber?.includes("+234")
  ) {
    toast.error(
      <ToastContent
        heading={`An error occurred`}
        message={"Phone number must start with +234"}
        type={"error"}
      />,
      { ...ToastContent.Config }
    );
  } else {
    const errors = Object.keys(errorMessage);
    errors.forEach((err) => {
      toast.error(
        <ToastContent
          heading={`${err} error`}
          message={errorMessage[err]}
          type={"error"}
        />,
        { ...ToastContent.Config }
      );
      toggleError && toggleError(err);
    });
  }
}
