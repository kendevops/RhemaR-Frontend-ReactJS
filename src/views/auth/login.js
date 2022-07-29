// ** React Imports
import React, { useContext, Fragment } from "react";
import { Link, useHistory } from "react-router-dom";

// ** Custom Hooks
import useJwt from "@hooks/useJwt";

// ** Third Party Components
import { useDispatch } from "react-redux";
import { toast, Slide } from "react-toastify";
import { useForm, Controller } from "react-hook-form";

import {
  AlertTriangle,
  CheckCircle,
  Mail,
  GitHub,
  HelpCircle,
  Coffee,
} from "react-feather";
import { Icon } from '@iconify/react';

// ** Actions
import { handleLogin } from "@store/slices/authSlice";

// ** Context
import { AbilityContext } from "@src/utility/context/can";

// ** Custom Components
import Avatar from "@components/avatar";
import InputPasswordToggle from "@components/input-password-toggle";

// ** Utils
import {
  getHomeRouteForLoggedInUser,
  UpdateLoggedInUserAbility,
} from "@utils/utilsGeneric";

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

const ToastContent = ({ heading, message, type }) => (
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
    <div className="toastify-body fs-">
      <span>{message} </span>
    </div>
  </Fragment>
);

const defaultValues = {
  password: "admin",
  email: "admin@demo.com",
};

const AuthLoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const ability = useContext(AbilityContext);
  const {
    control,
    setError,
    handleSubmit,
    formState,
  } = useForm({
    defaultValues,
    mode: "onChange", // onBlur
    // reValidateMode: "onChange",
  });

  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      console.log("data", data);
      useJwt
        .login({ email: data.email, password: data.password })
        .then((res) => {
          console.log("LOGIN.RESPONSE", res);
          const data = {
            ...res.data.userData,
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
          };
          dispatch(handleLogin(data));
          UpdateLoggedInUserAbility(data.role, ability);
          history.push(getHomeRouteForLoggedInUser(data.role));

          const successMsg = "Welcome " + data.fullName;
          toast.success(
            <ToastContent
              heading={"Login Successfull!"}
              message={successMsg}
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
          const errMsg = "Unsuccesful login attempt. " + err.message;
          toast.error(
            <ToastContent
              heading={"Login Error!"}
              message={errMsg}
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
                  <h3 className="title mb-4">Login</h3>
                  <p>Enter your credentials to access your portal</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Controller
                      control={control}
                      id="email"
                      name="email"
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          autoFocus
                          type="text"
                          placeholder="Enter Email Address"
                          className="form-control"
                          invalid={formState.errors.email && true}
                          {...field}
                        />
                      )}
                      rules={{ required: true }}
                    />
                    {/* <p> {formState.errors.email?.message}</p>  */}
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Controller
                      control={control}
                      id="password"
                      name="password"
                      defaultValue=""
                      render={({ field }) => (
                        // <InputPasswordToggle />
                        <Input
                          type="password"
                          placeholder="Enter Your Pasword Here"
                          className="form-control"
                          invalid={formState.errors.password && true}
                          {...field}
                        />
                      )}
                      rules={{ required: true }}
                    />
                    {/* <p> {formState.errors.password?.message}</p>  */}
                  </div>
                  <div className="form-group form-check">
                    <Input type="checkbox" id="remember-me" />
                    <Label className="form-check-label" for="remember-me">
                      Remember Me
                    </Label>
                  </div>
                  <button
                    className="btn btn-blue-800 btn-lg w-100 mb-5"
                    type="submit"
                    // !formState.isValid !formState.isSubmitted formState.isSubmitting
                    disabled={!formState.isValid}
                  >
                    Login
                  </button>
                </form>

                <div className="text-center mb-2">
                  <Link to="/forgot-password">
                    <small>Forgot Password?</small>
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

export default AuthLoginPage;
