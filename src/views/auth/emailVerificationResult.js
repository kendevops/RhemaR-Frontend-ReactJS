// ** React Imports
import React, { useEffect, useState, Fragment } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

// ** Custom Hooks
import useJwt from "@hooks/useJwt";

// ** Third Party Components
import { toast, Slide } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import {
  Facebook,
  Twitter,
  Mail,
  GitHub,
  HelpCircle,
  Coffee,
} from "react-feather";

// ** Custom Components
// import Avatar from "@components/avatar";
import InputPasswordToggle from "@components/input-password-toggle";

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

const ToastContent = ({ name, role }) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        {/* <Avatar size="sm" color="success" icon={<Coffee size={12} />} /> */}
        <h6 className="toast-title fw-bold">Welcome, {name}</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span>
        You have successfully logged in as an {role} user to Vuexy. Now you can
        start to explore. Enjoy!
      </span>
    </div>
  </Fragment>
);

const AuthEmailVerificationResultPage = () => {
  const param = useParams();
  const [visible, setVisible] = useState(true);
  const [validUrl, setValidUrl] = useState(false);
  const history = useHistory();
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        useJwt.verifyEmail({ id: param.id, token: param.token }).then((res) => {
          setValidUrl(true);
          // save user data to localstorage here!
        });
      } catch (error) {
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  const rhemaLogo = require(`@src/assets/img/logo/logo.svg`).default;

  return (
    <Fragment>
      {validUrl ? (
        <div className="container mt-5">
          <div className="auth-wrapper">
            <div className="row">
              <div className="col-lg-7 col-md-9 col-12 mx-auto">
                {/* <div className="mb-5 text-center nav-logo">
                  <img src={rhemaLogo} alt="" style={{ width: "100px" }} />
                </div> */}

                <div className="chioma">
                  <div className="text-center mb-5">
                    <h3 className="title mb-4">Email Verified Successfull</h3>
                    <p className="mx-auto" style={{ lineHeight: "1.234", maxWidth: "80%" }}>
                      You have successfully verified your email
                    </p>
                  </div>

                  <button
                    className="btn btn-blue-800 btn-lg w-100"
                    type="submit"
                  >
                    <Link to="/login">
                      <small>Proceed To Login Now!</small>
                    </Link>
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mt-5">
          <div className="auth-wrapper">
            <div className="row">
              <div className="col-lg-7 col-md-9 col-12 mx-auto">
                {/* <div className="mb-5 text-center nav-logo">
                  <img src={rhemaLogo} alt="" style={{ width: "100px" }} />
                </div> */}

                <div className="chioma">
                  <div className="text-center mb-5">
                    <h3 className="title mb-4" style={{color: "red"}}>Email Verification Error</h3>
                    <p className="mx-auto" style={{ lineHeight: "1.234", maxWidth: "80%" }}>
                      If you were redirected to this page from your email, the link you clicked is invalid or has expired.
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
                      <small>Go Back To Login Page Instead</small>
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

export default AuthEmailVerificationResultPage;
