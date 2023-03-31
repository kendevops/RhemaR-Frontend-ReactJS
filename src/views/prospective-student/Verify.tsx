import { toast } from "react-toastify";
import { Spinner } from "reactstrap";
import ToastContent from "../../components/molecules/ToastContent";
import useResendVerification from "../../hooks/mutations/useResendVerification";
import handleError from "../../utils/handleError";

export default function Verify() {
  const { mutate, isLoading } = useResendVerification();

  function resendLink() {
    mutate(undefined, {
      onSuccess: () =>
        toast.success(
          <ToastContent
            heading={"Email Verification Resent!"}
            message={`Email verification link has been resent successfully`}
            type={"success"}
          />,
          { ...ToastContent.Config }
        ),
      onError: (e: any) => {
        handleError(e);
      },
    });
  }

  return (
    <section className="container mt-5">
      {isLoading && <Spinner />}
      <div className="auth-wrapper">
        <div className="row">
          <div className="col-xl-7 col-lg-8 col-md-10 col-12 mx-auto">
            <div className="bg-white shadow rounded-2 p-5">
              <div className="text-center mb-5">
                <h3 className="title mb-4">Verification Link Sent</h3>
                <p>
                  We've sent a verification link to your email, click the link
                  <br />
                  to proceed with your registration
                </p>
              </div>
              <button
                onClick={resendLink}
                className="btn btn-blue-800 btn-lg w-100"
                type="button"
              >
                Resend Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
