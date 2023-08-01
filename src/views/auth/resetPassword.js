// ** React Imports
import React, { useEffect, useState, Fragment } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import useToggle from "../../utility/hooks/useToggle";
import useForm from "../../utility/hooks/useForm";
import { toast } from "react-toastify";
import ToastContent from "../../components/molecules/ToastContent";
import handleError from "../../utils/handleError";
import { Spinner } from "reactstrap";
import FormInput from "../../components/molecules/FormInput";
import useResetPassword from "../../hooks/mutations/users/useResetPassword";

const AuthResetPasswordPage = () => {
  const param = useParams();
  const history = useHistory();

  const id = param?.id;

  const [validUrl, toggleValidUrl] = useToggle();
  const { isLoading, mutate } = useResetPassword();
  const { formData, formErrors, updateForm, formIsValid, toggleError } =
    useForm({
      initialState: {
        password: "",
        confirmPassword: "",
      },
    });

  useEffect(() => {
    if (!id) {
      history.goBack();
      return;
    }

    !validUrl && toggleValidUrl();
  }, [id, history, toggleValidUrl, validUrl]);

  const rhemaLogo = require(`@src/assets/img/logo/logo.svg`).default;

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData?.password) {
      alert("You must enter a password");
      return;
    }

    if (formData?.password !== formData?.confirmPassword) {
      alert("Passwords must match");
      return;
    }

    mutate(
      {
        token: id,
        password: formData?.password,
      },
      {
        onSuccess: () => {
          toast.success(
            <ToastContent
              heading={"Success"}
              type={"success"}
              message={"Password changed successfully"}
            />,
            { ...ToastContent.Config }
          );
          history.go("/login");
        },
        onError: (e) => {
          handleError(e, formData, toggleError);
        },
      }
    );
  }

  return (
    <Fragment>
      {validUrl ? (
        <div className="container mt-5">
          <div className="auth-wrapper">
            <div className="row">
              <div className="col-xl-6 col-lg-7 col-md-8 col-12 mx-auto">
                <div className="mb-5 text-center nav-logo">
                  <img src={rhemaLogo} alt="" style={{ width: "100px" }} />
                </div>

                <div className="bg-white shadow rounded-2 p-5">
                  <div className="text-center mb-5">
                    {isLoading && <Spinner />}

                    <h3 className="title mb-4">Reset Password</h3>
                    <p
                      className="mx-auto"
                      style={{ lineHeight: "1.234", maxWidth: "80%" }}
                    >
                      You can now change your account password
                    </p>
                  </div>

                  <form className="login-form" onSubmit={handleSubmit}>
                    <FormInput
                      type="Password"
                      label="New password"
                      onChange={(e) => updateForm("password", e?.target?.value)}
                      hasErrors={formErrors?.password}
                    />
                    <FormInput
                      type="password"
                      label="Confirm password"
                      onChange={(e) =>
                        updateForm("confirmPassword", e?.target?.value)
                      }
                      hasErrors={formErrors?.password}
                    />

                    <button
                      className="btn btn-blue-800 btn-lg w-100 mt-5 mb-5"
                      type="submit"
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
      ) : (
        <div className="container mt-5">
          <div className="auth-wrapper">
            <div className="row">
              <div className="col-xl-6 col-lg-7 col-md-8 col-12 mx-auto">
                <div className="mb-5 text-center nav-logo">
                  <img src={rhemaLogo} alt="" style={{ width: "100px" }} />
                </div>

                <div className="bg-white shadow rounded-2 p-5">
                  <div className="text-center mb-5">
                    <h3 className="title mb-4" style={{ color: "red" }}>
                      Password Reset Error
                    </h3>
                    <p
                      className="mx-auto"
                      style={{ lineHeight: "1.234", maxWidth: "80%" }}
                    >
                      If you were redirected to this page from your email, the
                      link you clicked is invalid or has expired.
                      <br />
                      <br />
                      And you cannot directly access this page.
                    </p>
                  </div>

                  <button
                    className="btn btn-blue-800 btn-lg w-100"
                    type="submit"
                  >
                    <Link to="/login">
                      <small>Go Back To Login Page Instead?</small>
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default AuthResetPasswordPage;
