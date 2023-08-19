import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Spinner, Toast } from "reactstrap";
import useVerifyEmail from "../../hooks/queries/useVerifyEmail";
import CardWrapper from "../../components/students/CardWrapper";
import ProspectiveStudentApplicationPage from "./application";
import { toast } from "react-toastify";
import ToastContent from "../../components/molecules/ToastContent";
import { element } from "prop-types";

export default function ConfirmVerification() {
  const history = useHistory();
  const params = useParams<{ id: string }>();
  const verificationId = params?.id;

  // console.log("Working", verificationId, params);

  const { data, isLoading, isError, isSuccess } =
    useVerifyEmail(verificationId);

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        <ToastContent
          type={"success"}
          heading={"Successful"}
          message={"Email verification was successfully"}
        />,
        ToastContent.Config
      );
    }
  }, []);

  useEffect(() => {
    if (!verificationId) {
      history.replace("/");
    } else {
      history.push("/application");
      console.log("Available");
    }
    // console.log(data);
  }, [verificationId, history, data]);

  // on Proceed
  function onProceed() {
    history.replace("/login");
  }

  // console.log({ data });

  return (
    <div>
      {!isSuccess && (
        <main
          style={{
            display: "grid",
            placeContent: "center",
            width: "100vw",
            height: "50vh",
          }}
        >
          <CardWrapper className="container">
            {isLoading && <Spinner />}

            <div className=" mx-auto">
              {isSuccess &&
                // <div className="text-center">
                //   <h2 className="my-4">Email Confirmation Successful</h2>
                //   <button
                //     onClick={onProceed}
                //     className="btn btn-blue-800 btn-lg w-100 mb-5"
                //   >
                //     Proceed to Login
                //   </button>
                // </div>

                toast.success(
                  <ToastContent
                    type={"success"}
                    heading={"Successful"}
                    message={"Email verification was successfully"}
                  />,
                  ToastContent.Config
                ) &&
                history.replace("/login")}
              {isError && <Toast>An Error Occurred</Toast>}
            </div>
          </CardWrapper>
        </main>
      )}

      {/* {isSuccess && <ProspectiveStudentApplicationPage />} */}

      {/* {isSuccess && history.push("/application")} */}
    </div>
  );
}
