import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Spinner, Toast } from "reactstrap";
import useVerifyEmail from "../../hooks/queries/useVerifyEmail";
import CardWrapper from "../../components/students/CardWrapper";
import { toast } from "react-toastify";
import ToastContent from "../../components/molecules/ToastContent";

export default function ConfirmVerification() {
  const history = useHistory();
  const params = useParams<{ id: string }>();
  const verificationId = params?.id;

  const { data, isLoading, isError, isSuccess } =
    useVerifyEmail(verificationId);

  // useEffect(() => {

  //   if (isSuccess) {
  //     toast.success(
  //       <ToastContent
  //         type={"success"}
  //         heading={"Successful"}
  //         message={"Email verification was successfully"}
  //       />,
  //       ToastContent.Config
  //     );
  //   }
  // }, []);

  useEffect(() => {
    if (!verificationId) {
      history.replace("/");
    }
    // console.log(data);
  }, [verificationId, history, data]);

  if (isLoading) {
    return <Spinner />;
  }

  // on Proceed

  console.log(isSuccess, data, isError);

  return (
    <div>
      {isSuccess && (
        <main
          style={{
            display: "grid",
            placeContent: "center",
            width: "100vw",
            height: "50vh",
          }}
        >
          <CardWrapper className="container">
            {/* {isLoading && <Spinner />} */}

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
