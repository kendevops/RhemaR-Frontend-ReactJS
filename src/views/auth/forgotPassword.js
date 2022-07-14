// ** React Imports
import React, { useState, useContext, Fragment } from "react";
import { Link, useHistory } from "react-router-dom";

// ** Custom Hooks
import useJwt from "@hooks/useJwt";

// ** Third Party Components
import { toast, Slide } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import {
  AlertTriangle,
  CheckCircle,
  Facebook,
  Twitter,
  Mail,
  GitHub,
  HelpCircle,
  Coffee,
} from "react-feather";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Input,
  Label,
  Alert,
  Button,
  CardText,
  CardTitle,
  UncontrolledTooltip,
} from "reactstrap";


const ToastContent = ({ heading, type }) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        {type == "danger" && (
          <Avatar size="sm" color="error" icon={<AlertTriangle size={20} />} />
        )}
        {type == "success" && (
          <Avatar size="sm" color="success" icon={<CheckCircle size={20} />} />
        )}
        <h3 className="toast-title fw-bold">{heading}</h3>
      </div>
    </div>
  </Fragment>
);

const AuthForgotPasswordPage = () => {
  const [visible, setVisible] = useState(true);
  const [responseMsg, setResponseMsg] = useState("");
  const [responseError, setResponseError] = useState("");
  const history = useHistory();
  const {
    control,
    setError,
    handleSubmit,
    formState,
  } = useForm({
    mode: "onChange"
  });

  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      useJwt
        .forgotPassword({ email: data.resetEmail })
        .then((res) => {
          console.log("res", res)
          const data = {
            ...res.data,
          };
          setResponseMsg(data.message);
          setResponseError("");
          toast.success(
            <ToastContent
              heading={"Successfull!"}
              type={"success"}
            />,
            {
              icon: false,
              transition: Slide,
              hideProgressBar: false,
              autoClose: 6000,
              position: toast.POSITION.BOTTOM_RIGHT,
            }
          );
        })
        .catch((err) => {
          console.log("err message==>", err.message)
          console.log("err response.status==>", err.response.status)
          if (
            err.response &&
            err.response.status >= 400 &&
            err.response.status <= 500
          ) {
            toast.error(
              <ToastContent
                heading={"Error!"}
                type={"danger"}
              />,
              {
                icon: false,
                transition: Slide,
                hideProgressBar: false,
                autoClose: 6000,
                position: toast.POSITION.BOTTOM_RIGHT,
              }
            );
            console.log(err.message);
            setResponseError(err.message);
            setResponseMsg("");
          }
        });
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: "manual",
          });
        }
      }
    }
  };

  const rhemaLogo = require(`@src/assets/img/logo/logo.svg`).default;

  return (
    <>
      <div className="container mt-5">
        <div className="auth-wrapper">
          <div className="row">
            <div className="col-xl-5 col-lg-6 col-md-8 col-12 mx-auto">
              <div className="mb-5 text-center nav-logo">
                <img src={rhemaLogo} alt="" style={{ width: "100px" }} />
              </div>

              <div className="bg-white shadow rounded-2 p-5">
                <div className="text-center mb-5">
                  <h3 className="title mb-4">Forgot Password</h3>
                  <p className="mx-auto" style={{ lineHeight: "1.234", maxWidth: "80%" }}>
                    Enter your email here to get a link to reset your password
                  </p>
                </div>

                {responseMsg && (
                  <Alert
                    color="success mb-5"
                    isOpen={visible}
                    toggle={() => setVisible(false)}
                  >
                    <h4 className="alert-heading fs-2 mb-3">Success</h4>
                    <div className="alert-body fs-4 lh-1">
                      Password reset link sent to your email
                      {/* <br/> */}
                      {/* If the email you submitted is correct, then check your
                      mail and reset your password */}
                    </div>
                  </Alert>
                )}
                
                {responseError && (
                  <Alert
                    color="error mb-5"
                    isOpen={visible}
                    toggle={() => {setVisible(false); setResponseError("");}}
                  >
                    <h4 className="alert-heading fs-2 mb-3">Error</h4>
                    <div className="alert-body fs-4 lh-1">{responseError}</div>
                  </Alert>
                )}

                <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    
                    <Controller
                      control={control}
                      id="resetEmail"
                      name="resetEmail"
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          autoFocus
                          type="text"
                          placeholder="Enter Email Address"
                          className="form-control"
                          invalid={formState.errors.resetEmail && true}
                          {...field}
                        />
                      )}
                      rules={{ required: true }}
                    />
                  </div>
                  <button
                    className="btn btn-blue-800 btn-lg w-100 mb-5"
                    type="submit"
                    disabled={!formState.isValid}
                  >
                    Submit
                  </button>
                </form>

                <div className="text-center mb-2">
                  <Link to="/login">
                    <small>Go Back To Login Page Instead?</small>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForgotPasswordPage;
