import { useEffect, useState } from "react";
import useCurrentUser from "../../hooks/queries/users/useCurrentUser";
import { useDispatch } from "react-redux";
import { getUserData } from "../../utility/utilsGeneric";
import { useHistory } from "react-router-dom";
import { Spinner } from "reactstrap";
import {
  ExclamationCircleIcon,
  CheckCircleIcon,
  CheckIcon,
} from "@heroicons/react/solid";
import { handleLogout } from "../../redux/slices/authSlice";
import applicationPending from "../../assets/img/applicationPending.png";
import ApplicationPage from "./application";

const ProspectiveStudentApplicationPage = () => {
  const [hasApplied, setHasApplied] = useState(false);
  const [pendingPayment, setPendingPayment] = useState(false);
  // const [hasApplied, setHasApplied] = useState(false);
  const [pendingFeePayment, setPendingFeePayment] = useState(false);
  const { data, isLoading } = useCurrentUser();
  console.log(data);

  console.log(data?.levelOneApplications[0]);

  const dispatch = useDispatch();
  const currentUser = getUserData();
  const history = useHistory();

  function makePayment() {
    const application = data?.levelOneApplications[0];
    const paymentUrl = application?.initialPayment?.paymentUrl;
    window?.open(paymentUrl);
    window.location?.reload();
  }

  function feePayment() {
    const application = data?.levelOneApplications[0];
    const paymentUrl = application?.feePayment?.paymentUrl;
    window?.open(paymentUrl);
    window.location?.reload();
  }

  function loginAsStudent() {
    dispatch(handleLogout(currentUser));
    history.replace("/login");
  }

  function makeDepositPayment() {
    const application = data?.levelOneApplications[0];
    const paymentUrl = application?.feePayment?.paymentUrl;
    window?.open(paymentUrl);
    window.location?.reload();
  }

  useEffect(() => {
    if (!data) return;
    if (!data?.levelOneApplications[0]) return;

    //check the user application status
    const application = data?.levelOneApplications[0];
    switch (application?.initialPayment?.status) {
      case "pending":
        setPendingPayment(true);
        break;

      case "success":
        setHasApplied(true);
        break;
      default:
        console.log("Default");
    }

    switch (application?.feePayment?.status) {
      case "pending":
        setPendingFeePayment(true);
        break;

      case "success":
        setHasApplied(true);
        break;
      default:
        console.log("Default");
    }
  }, [data]);

  return (
    <>
      {hasApplied ||
        (pendingPayment && (
          <section className="container mt-5">
            <div className="auth-wrapper">
              <div className="row">
                <div className="col-xl-7 col-lg-8 col-md-10 col-12 mx-auto">
                  <article className="bg-white shadow rounded-2 p-5 my-5">
                    <section className="text-center">
                      <div className="p-3 bg-blue-200 rounded-3">
                        <img src={applicationPending} alt="Payment pending" />
                      </div>{" "}
                      <button
                        // onClick={makePayment}
                        className="btn bg-success  btn-lg w-100 text-bg-dark "
                        type="button"
                        style={{ color: "white" }}
                        disabled
                      >
                        APPLICATION FORM SUBMITTED
                      </button>
                    </section>
                  </article>

                  {/* <article className="bg-white shadow rounded-2 p-5 my-5">
                    <section className="text-center">
                      <div className="p-3 bg-blue-200 rounded-3">
                        <img src={applicationPending} alt="Payment pending" />
                      </div>{" "}
                      <button
                        onClick={
                          pendingFeePayment ? (feePayment as any) : undefined
                        }
                        className="btn btn-blue-800 btn-lg w-100"
                        type="button"
                        disabled={!pendingFeePayment}
                      >
                        {pendingFeePayment
                          ? "FEE PAYMENT PENDING"
                          : "FEE PAYMENT PAID"}
                      </button>
                    </section>
                  </article> */}
                  {/* {isLoading && <Spinner />} */}
                  <article className="bg-white shadow rounded-2 p-5 my-5">
                    <section className="text-center ">
                      <div className="p-3 bg-blue-200 rounded-3">
                        <img
                          src={applicationPending}
                          alt="Application Pending"
                        />
                      </div>
                      <div
                        className="d-flex my-4 align-items-center justify-content-center gap-3 p-3 rounded-3"
                        style={{
                          backgroundColor: "#FEF7EA",
                        }}
                      >
                        {data?.levelOneApplications[0]?.initialPayment
                          ?.status === "pending" ? (
                          <ExclamationCircleIcon color="#F2B12E" height={32} />
                        ) : (
                          <CheckCircleIcon color="green" height={32} />
                        )}

                        {data?.levelOneApplications[0] &&
                        data?.levelOneApplications[0]?.initialPayment
                          ?.status === "pending" ? (
                          <div>
                            <h2 className="text-bold"> Addmission Pending </h2>
                            <p className="mb-3">
                              Initial deposit must be paid before admission is
                              granted
                            </p>
                          </div>
                        ) : (
                          <div>
                            <h2 className="text-bold"> Initial Fee Paid </h2>
                            {/* <p className="mb-3">
                                  We will contact you via the email you
                                  registered with once your admission request is
                                  processed.
                                </p> */}
                          </div>
                        )}
                      </div>
                    </section>
                    {
                      <section className="text-center  ">
                        {/* <div className="p-3 bg-blue-200 rounded-3">
                          <img src={applicationPending} alt="Payment pending" />
                        </div> */}
                        <button
                          onClick={
                            pendingPayment ? (makePayment as any) : undefined
                          }
                          className="btn btn-blue-800 btn-lg w-100"
                          type="button"
                          disabled={!pendingPayment}
                        >
                          {pendingPayment
                            ? `Complete Initial Payment N${data?.levelOneApplications[0]?.initialPayment.amount}`
                            : "INITIAL FEE PAID"}
                        </button>
                      </section>
                    }
                  </article>

                  {hasApplied ||
                    (pendingPayment && (
                      <article className="bg-white shadow rounded-2 p-5 my-5">
                        <section className="text-center ">
                          <div className="p-3 bg-blue-200 rounded-3">
                            <img
                              src={applicationPending}
                              alt="Application Pending"
                            />
                          </div>
                          <div
                            className="d-flex my-4 align-items-center justify-content-center gap-3 p-3 rounded-3"
                            style={{
                              backgroundColor: "#FEF7EA",
                            }}
                          >
                            {data?.levelOneApplications[0]?.feePayment
                              ?.status === "pending" ? (
                              <ExclamationCircleIcon
                                color="#F2B12E"
                                height={32}
                              />
                            ) : (
                              <CheckCircleIcon color="green" height={32} />
                            )}

                            {data?.levelOneApplications[0] &&
                            data?.levelOneApplications[0]?.feePayment
                              ?.status === "pending" ? (
                              <div>
                                <h2 className="text-bold">
                                  {" "}
                                  Addmission Pending{" "}
                                </h2>
                                <p className="mb-3">
                                  Fee deposit must be paid before admission is
                                  granted
                                </p>
                              </div>
                            ) : (
                              <div>
                                <h2 className="text-bold">
                                  {" "}
                                  Application Success{" "}
                                </h2>
                                <p className="mb-3">
                                  We will contact you via the email you
                                  registered with once your admission request is
                                  processed.
                                </p>
                              </div>
                            )}
                          </div>
                        </section>

                        {data?.levelOneApplications[0] &&
                        data?.levelOneApplications[0]?.feePayment?.status ===
                          "pending" ? (
                          <button
                            className="btn btn-blue-800 btn-lg w-100"
                            type="button"
                            onClick={makeDepositPayment}
                          >
                            Complete Fee Payment N
                            {data?.levelOneApplications[0]?.feePayment.amount}
                          </button>
                        ) : (
                          <button
                            className="btn btn-blue-800 btn-lg w-100"
                            type="button"
                            onClick={loginAsStudent}
                          >
                            Login to your student account
                          </button>
                        )}
                      </article>
                    ))}
                </div>
              </div>
            </div>
          </section>
        ))}

      {!hasApplied && !pendingPayment && (
        <ApplicationPage {...{ setHasApplied }} />
      )}
    </>
  );
};

export default ProspectiveStudentApplicationPage;
