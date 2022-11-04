import { useState } from "react";
import Tab from "../../components/atoms/Tab";
import StudentAvatar from "../../components/avatar/StudentAvatar";
import { Input } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

const defaultValues = {
  firstName: "John",
  middleName: "",
  lastName: "Ade",
  email: "adejohn@gmail.com",
  gender: "male",
  phoneNumber: "+234 (0)819 306 8691",
  alternatePhoneNumber: "+234 (0)803 856 2070",
};

const defaultPValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function StudentProfile() {
  const Options = ["Account Info", "Password & Security"];
  const [option, setOption] = useState(0);

  const currentPage = Options[option];

  const { control, setError, handleSubmit, formState } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const pform = useForm({
    defaultValues: defaultPValues,
    mode: "onChange",
  });

  function onSubmit() {}
  function onSubmitP() {}

  return (
    <section className="container mt-5">
      <div className=" col-md-8 col-9 mx-auto">
        <article className="bg-white r-card px-5 py-4 mb-4 ">
          {/* Header */}
          <div role={"tabpanel"} className="d-flex px-2 gap-3 border-bottom ">
            {Options.map((o, i) => {
              const isSelected = i === option;
              function handleSelect() {
                setOption(i);
              }
              return (
                <Tab key={0} onClick={handleSelect} isSelected={isSelected}>
                  {o}
                </Tab>
              );
            })}
          </div>

          {/* Avatar */}
          <div className="pb-2 mt-4 d-flex align-items-center gap-5 border-bottom ">
            <StudentAvatar />
            <div>
              <h2 className="text-2xl font-bold text-blue-500">John Ade</h2>
              <p className="text-sm ">adejohn@gmail.com</p>
            </div>
          </div>

          {/* Account Info */}
          {currentPage === "Account Info" && (
            <section className="mt-5 mb-5">
              {/* Form */}
              <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <Controller
                    control={control}
                    name="firstName"
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        autoFocus
                        type="text"
                        placeholder="First Name"
                        className="form-control"
                        invalid={formState.errors.firstName && true}
                        {...field}
                      />
                    )}
                    rules={{ required: true }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="middleName">Middle Name</label>
                  <Controller
                    control={control}
                    name="middleName"
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        autoFocus
                        type="text"
                        placeholder="Middle Name"
                        className="form-control"
                        invalid={formState.errors.middleName && true}
                        {...field}
                      />
                    )}
                    rules={{ required: true }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <Controller
                    control={control}
                    name="lastName"
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        autoFocus
                        type="text"
                        placeholder="Last Name"
                        className="form-control"
                        invalid={formState.errors.lastName && true}
                        {...field}
                      />
                    )}
                    rules={{ required: true }}
                  />
                </div>

                <div className="form-group d-flex gap-4">
                  <div style={{ width: "60%" }}>
                    <label htmlFor="Email">Email</label>
                    <Controller
                      control={control}
                      name="email"
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          autoFocus
                          type="email"
                          placeholder="Email"
                          className="form-control"
                          invalid={formState.errors.email && true}
                          {...field}
                        />
                      )}
                      rules={{ required: true }}
                    />
                  </div>

                  <div>
                    <label htmlFor="Gender">Gender</label>
                    <Controller
                      control={control}
                      name="gender"
                      defaultValue=""
                      render={({ field }) => (
                        <div className="col-lg-6 col-md-12">
                          <div className="form-group">
                            <label htmlFor="Gender">Gender</label>
                            <div className="d-flex">
                              <div className="radio-box me-3">
                                <label htmlFor="gender">Male</label>
                                <input
                                  type="radio"
                                  id="gender"
                                  value="Male"
                                  name="gender"
                                  checked={field.value === "male"}

                                  // formControlName="gender"
                                />
                              </div>
                              <div className="radio-box">
                                <label htmlFor="gender">Female</label>
                                <input
                                  type="radio"
                                  id="gender"
                                  name="gender"
                                  value="Female"
                                  checked={field.value === "female"}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        // <div>
                        //   <RadioGroup
                        //     sx={{ display: "block" }}
                        //     id="gender"
                        //     defaultValue="female"
                        //     name="gender"
                        //   >
                        //     <FormControlLabel
                        //       control={<Radio />}
                        //       label="Male"
                        //       {...field}
                        //     />
                        //     <FormControlLabel
                        //       control={<Radio />}
                        //       label="Female"
                        //       {...field}
                        //     />
                        //   </RadioGroup>
                        // </div>
                      )}
                      rules={{ required: true }}
                    />
                  </div>
                </div>

                <div className="form-group d-flex gap-4">
                  <div style={{ width: "100%" }}>
                    <label htmlFor="Phone Number">Phone Number</label>
                    <Controller
                      control={control}
                      name="phoneNumber"
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          autoFocus
                          type="text"
                          placeholder="Phone Number"
                          className="form-control"
                          invalid={formState.errors.phoneNumber && true}
                          {...field}
                        />
                      )}
                      rules={{ required: true }}
                    />
                  </div>
                  <div style={{ width: "100%" }}>
                    <label htmlFor="Phone Number">Alternate Phone Number</label>
                    <Controller
                      control={control}
                      name="alternatePhoneNumber"
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          autoFocus
                          type="text"
                          placeholder="Alternate Phone Number"
                          className="form-control"
                          invalid={
                            formState.errors.alternatePhoneNumber && true
                          }
                          {...field}
                        />
                      )}
                      rules={{ required: true }}
                    />
                  </div>
                </div>

                <button
                  className="btn btn-blue-800 btn-lg w-100 my-5"
                  type="submit"
                  disabled={!formState.isValid}
                >
                  Save Changes
                </button>
              </form>
            </section>
          )}

          {/* Password and Sceurity */}
          {currentPage === "Password & Security" && (
            <section className="mt-5 mb-5">
              <form className="mt-3" onSubmit={handleSubmit(onSubmitP)}>
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <Controller
                    control={pform.control}
                    name="currentPassword"
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        autoFocus
                        type="password"
                        placeholder="Enter Current Password"
                        className="form-control"
                        {...field}
                      />
                    )}
                    rules={{ required: true }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <Controller
                    control={pform.control}
                    name="newPassword"
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        autoFocus
                        type="password"
                        placeholder="Enter New Password"
                        className="form-control"
                        {...field}
                      />
                    )}
                    rules={{ required: true }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <Controller
                    control={pform.control}
                    name="confirmPassword"
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        autoFocus
                        type="password"
                        placeholder="Re-type Password"
                        className="form-control"
                        {...field}
                      />
                    )}
                    rules={{ required: true }}
                  />
                </div>

                <button
                  className="btn btn-blue-800 btn-lg w-100 my-5"
                  type="submit"
                  disabled={!pform.formState.isValid}
                >
                  Save
                </button>
              </form>
            </section>
          )}
        </article>
      </div>
    </section>
  );
}
