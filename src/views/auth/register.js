import useForm from "../../utility/hooks/useForm";
import useJwt from "@hooks/useJwt";

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

  const { formData, formIsValid, updateForm } = useForm({ initialState });

  function registerUser() {
    console.log(formData);
    // useJwt.register();
  }

  function submitForm(e) {
    e.preventDefault();
    formIsValid ? registerUser() : alert("Please fill in all fields");
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
                  <p>
                    Fill the form below to register.
                    <br />
                    This is the first step towards applying for admission into
                    RHEMA Bible Training Centre, Nigeria.
                  </p>
                </div>

                <div className="alert alert-danger"></div>

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
                          placeholder="WhatsApp & Telegram"
                          className="form-control"
                          formControlName="phoneNumber"
                          onChange={(e) =>
                            updateForm("phoneNumber", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <div className="form-group">
                        <label>Alternate Phone Number</label>
                        <input
                          type="tel"
                          placeholder="Enter Alternate Phone Number"
                          className="form-control"
                          formControlName="altPhoneNumber"
                          onChange={(e) =>
                            updateForm("alternatePhoneNumber", e.target.value)
                          }
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
