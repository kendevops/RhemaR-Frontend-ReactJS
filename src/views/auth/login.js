// ** React Imports
import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

// ** Custom Hooks
import useJwt from "@hooks/useJwt";

// ** Third Party Components
import { useDispatch } from "react-redux";
import { toast, Slide } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { handleLogin } from "@store/slices/authSlice";
import { AbilityContext } from "@src/utility/context/can";
import { getHomeRouteForLoggedInUser } from "@utils/utilsGeneric";
import { Input, Label, Spinner } from "reactstrap";
import { UpdateLoggedInUserAbility } from "../../utility/utilsGeneric";
import ToastContent from "../../components/molecules/ToastContent";
import useToggle from "../../utility/hooks/useToggle";
import userRoles from "../../utility/userRoles";

const defaultValues = {
  password: "helloWorld1",
  email: "rhemar_tests@protonmail.com",
};

const AuthLoginPage = () => {
  const dispatch = useDispatch();
  const [loading, toggleLoading] = useToggle();
  const history = useHistory();
  const ability = useContext(AbilityContext);
  const { control, setError, handleSubmit, formState } = useForm({
    defaultValues,
    mode: "onChange", // onBlur
    // reValidateMode: "onChange",
  });

  const onSubmit = (data) => {
    toggleLoading();
    if (Object.values(data).every((field) => field.length > 0)) {
      useJwt
        .login({ email: data.email, password: data.password })
        .then((res) => {
          toggleLoading();
          console.log("LOGIN.RESPONSE", res);
          const d = res?.data?.data;

          const data = {
            ...d?.user,
            accessToken: d?.tokens?.access_token,
            refreshToken: d?.tokens?.refresh_token,
          };

          console.log(data);

          const userRole =
            Array.isArray(data?.roles) && data?.roles?.length
              ? data?.roles[0]?.name
              : userRoles.PROSPECTIVE_STUDENT;

          dispatch(handleLogin(data));
          UpdateLoggedInUserAbility(userRole, ability);
          history.push(getHomeRouteForLoggedInUser(userRole));

          const successMsg = "Welcome " + data?.firstName;
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
          toggleLoading();
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
                  {loading && <Spinner />}
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
                  </div>
                  <section className="d-flex justify-content-between">
                    {/* Remember me */}
                    <div className="form-group form-check">
                      <Input type="checkbox" id="remember-me" />
                      <Label className="form-check-label" for="remember-me">
                        Remember Me
                      </Label>
                    </div>

                    {/* Forgot Password */}
                    <Link to="/forgot-password">
                      <small>Forgot Password?</small>
                    </Link>
                  </section>

                  <button
                    className="btn btn-blue-800 btn-lg w-100 mb-5"
                    type="submit"
                    disabled={!formState.isValid}
                  >
                    Login
                  </button>
                </form>

                <div className="text-center mb-2">
                  <Link to="/register">
                    <small>Register</small>
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
