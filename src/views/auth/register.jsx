import useForm from "../../utility/hooks/useForm";
import useJwt from "@hooks/useJwt";
import { toast, Slide } from "react-toastify";
import ToastContent from "../../components/molecules/ToastContent";
import useToggle from "../../utility/hooks/useToggle";
import { useHistory } from "react-router-dom";
import { Spinner } from "reactstrap";
import handleError from "../../utils/handleError";

const AuthRegistrationPage = () => {
  const initialState = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    gender: "",
    phoneNumber: "",
    alternatePhoneNumber: "",
    password: "",
    confirmPassword: "",
  };

  const { formData, formIsValid, updateForm, formErrors, toggleError } =
    useForm({ initialState });
  const [loading, toggleLoading] = useToggle();
  const history = useHistory();

  function registerUser() {
    const {
      confirmPassword,
      alternatePhoneNumber: altPhoneNumber,
      gender,
      ...others
    } = formData;
    const data = {
      ...others,
      altPhoneNumber,
      gender: gender.toUpperCase(),
    };

    console.log(data);

    toggleLoading();
    useJwt
      .register(data)
      .then((d) => {
        localStorage.setItem("userEmail", data.email);
        toggleLoading();
        toast.success(
          <ToastContent
            heading={"Registration Successfull!"}
            message={`Welcome ${formData.firstName}`}
            type={"success"}
          />,
          { ...ToastContent.Config }
        );
        console.log(d);
        history.push("/verify");
      })
      .catch((e) => {
        toggleLoading();
        handleError(e, formData, toggleError);
      })
      .finally(() => console.log(data));
  }

  function submitForm(e) {
    e.preventDefault();
    if (!formIsValid) {
      alert("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error(
        <ToastContent
          heading={"Passwords do not match!"}
          message={"Please check and try again"}
          type={"error"}
        />,
        { ...ToastContent.Config }
      );
      return;
    }

    registerUser();
  }

  return (
    <>
      <div className="container mt-5">
        <div className="auth-wrapper">
          <div className="row">
            <div className="col-xl-7 col-lg-8 col-md-10 col-12 mx-auto">
              <div className="mb-5 text-center nav-logo">
                <img
                  src="assets/img/logo.svg"
                  alt=""
                  style={{ width: "100px" }}
                />
              </div>

              <div className="bg-white shadow rounded-2 p-5">
                <div className="text-center mb-5">
                  <h3 className="title mb-4">Registration</h3>
                  <p style={{ lineHeight: "30px" }}>
                    Fill the form below to register.
                    <br />
                    This is the first step towards applying for admission into
                    RHEMA Bible Training Centre, Nigeria.
                  </p>
                </div>

                <div className="alert alert-danger"></div>

                {loading && <Spinner />}

                <form onSubmit={submitForm}>
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group">
                        <label>First Name</label>
                        <input
                          type="text"
                          placeholder="Enter First Name"
                          className="form-control"
                          formControlName="firstName"
                          onChange={(e) =>
                            updateForm("firstName", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label>Middle Name</label>
                        <input
                          type="text"
                          placeholder="Enter Middle Name"
                          className="form-control"
                          formControlName="middleName"
                          onChange={(e) =>
                            updateForm("middleName", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label>Last Name</label>
                        <input
                          type="text"
                          placeholder="Enter Last Name (Surname)"
                          className="form-control"
                          formControlName="lastName"
                          onChange={(e) =>
                            updateForm("lastName", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <div className="form-group">
                        <label for="email">Email</label>
                        <input
                          type="email"
                          placeholder="Enter Email Address"
                          id="email"
                          className="form-control"
                          formControlName="email"
                          onChange={(e) => updateForm("email", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <div className="form-group">
                        <label for="Gender">Gender</label>
                        <div className="d-flex">
                          <div className="radio-box me-3">
                            <label for="gender">Male</label>
                            <input
                              type="radio"
                              id="gender"
                              value="Male"
                              name="gender"
                              formControlName="gender"
                              onChange={(e) =>
                                updateForm("gender", e.target.value)
                              }
                            />
                          </div>
                          <div className="radio-box">
                            <label for="gender">Female</label>
                            <input
                              type="radio"
                              id="gender"
                              name="gender"
                              value="Female"
                              selected
                              formControlName="gender"
                              onChange={(e) =>
                                updateForm("gender", e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input
                          type="tel"
                          placeholder="+2348012340000"
                          className="form-control"
                          formControlName="phoneNumber"
                          onChange={(e) => {
                            updateForm("phoneNumber", e.target.value);
                            formErrors?.phoneNumber &&
                              toggleError("phoneNumber");
                          }}
                          style={{
                            borderColor: formErrors?.phoneNumber ? "red" : "",
                            borderStyle: formErrors?.phoneNumber
                              ? "solid"
                              : "none",
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <div className="form-group">
                        <label>Alternate Phone Number</label>
                        <input
                          type="tel"
                          placeholder="+2348012340000"
                          className="form-control"
                          formControlName="altPhoneNumber"
                          onChange={(e) =>
                            updateForm("alternatePhoneNumber", e.target.value)
                          }
                          style={{
                            borderColor: formErrors?.altPhoneNumber
                              ? "red"
                              : "",
                            borderStyle: formErrors?.altPhoneNumber
                              ? "solid"
                              : "none",
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          type="password"
                          className="form-control"
                          formControlName="password"
                          onChange={(e) =>
                            updateForm("password", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                          type="password"
                          className="form-control"
                          formControlName="confirmPassword"
                          onChange={(e) =>
                            updateForm("confirmPassword", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    className="btn btn-blue-800 btn-lg w-100"
                    type="submit"
                  >
                    <span className="inline-block">Proceed</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthRegistrationPage;
