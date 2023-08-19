import { FormEvent, useState } from "react";
import Tab from "../../components/atoms/Tab";
import StudentAvatar from "../../components/avatar/StudentAvatar";
import { getUserData } from "../../utility/utilsGeneric";
import FormRadioGroup from "../../components/molecules/FormRadioGroup";
import useForm from "../../utility/hooks/useForm";
import FormInput from "../../components/molecules/FormInput";
import useUpdateCurrentUser from "../../hooks/mutations/users/useUpdateCurrentUser";
import { Spinner } from "reactstrap";
import { toast } from "react-toastify";
import ToastContent from "../../components/molecules/ToastContent";

const defaultPValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function StudentProfile() {
  const Options = ["Account Info", "Password & Security"];
  const [option, setOption] = useState(0);

  const userData = getUserData();

  const { mutate, isLoading } = useUpdateCurrentUser();

  const defaultValues = {
    firstName: userData?.firstName,
    middleName: userData?.middleName,
    lastName: userData?.lastName,
    email: userData?.email,
    gender: userData?.gender,
    phoneNumber: userData?.phoneNumber,
    altPhoneNumber: userData?.altPhoneNumber,
  };

  console.log(userData.gender);

  const currentPage = Options[option];

  //form
  const { formData, updateForm } = useForm({ initialState: defaultValues });
  const pform = useForm({
    initialState: defaultPValues,
  });

  //submit personal info
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    //find the values that were saved and update them
    let changedValues: any = {};
    const changed = Object.keys(formData).filter((k) => {
      const key = k as unknown as keyof typeof formData;
      return formData[key] !== defaultValues[key];
    });

    if (!changed.length) return;

    changed.forEach((change) => {
      const c = change as unknown as keyof typeof formData;
      changedValues[c] = formData[c];
    });

    mutate(changedValues, {
      onSuccess: () => {
        toast.success(
          <ToastContent
            type={"success"}
            message={"Your profile has been updated successfully"}
            heading={"Profile Updated"}
          />,
          { ...ToastContent.Config }
        );
      },
      onError: (e: any) => {
        toast.success(
          <ToastContent
            type={"error"}
            message={e?.response?.data?.message}
            heading={"Uh-oh, an error occurred"}
          />,
          { ...ToastContent.Config }
        );
      },
    });
  }
  function onSubmitP() {}

  return (
    <section className="container mt-5">
      <div className=" col-md-8 col-9 mx-auto">
        <article className="bg-white r-card px-5 py-4 mb-4 ">
          {isLoading && <Spinner />}
          {/* Header */}
          <div role={"tabpanel"} className="d-flex px-2 gap-3 border-bottom ">
            {Options.map((o, i) => {
              const isSelected = i === option;
              function handleSelect() {
                setOption(i);
              }
              return (
                <Tab key={o} onClick={handleSelect} isSelected={isSelected}>
                  {o}
                </Tab>
              );
            })}
          </div>

          {/* Avatar */}
          <div className="pb-2 mt-4 d-flex align-items-center gap-5 border-bottom ">
            <StudentAvatar />
            <div>
              <h2 className="text-2xl font-bold text-blue-500">
                {userData?.firstName} {userData?.lastName}
              </h2>
              <p className="text-sm ">{userData?.email}</p>
            </div>
          </div>

          {/* Account Info */}
          {currentPage === "Account Info" && (
            <section className="mt-5 mb-5">
              {/* Form */}
              <form className="mt-3" onSubmit={onSubmit}>
                <FormInput
                  label="First Name"
                  value={formData?.firstName}
                  onChange={(e) => updateForm("firstName", e.target.value)}
                  disabled
                />
                <FormInput
                  label="Middle Name"
                  value={formData?.middleName}
                  onChange={(e) => updateForm("middleName", e.target.value)}
                  disabled
                />
                <FormInput
                  label="Last Name"
                  value={formData?.lastName}
                  onChange={(e) => updateForm("lastName", e.target.value)}
                  disabled
                />

                <div className="form-group d-flex gap-4">
                  <div style={{ width: "60%" }}>
                    <FormInput
                      type={"email"}
                      label="Email"
                      value={formData?.email}
                      onChange={(e) => updateForm("email", e.target.value)}
                      disabled
                    />
                  </div>

                  <div style={{ width: "" }}>
                    <FormInput
                      type={"text"}
                      label="Gender"
                      value={formData?.gender}
                      onChange={(e) => updateForm("gender", e.target.value)}
                      disabled
                    />
                  </div>

                  {/* <div>
                    <FormRadioGroup
                      label="Gender"
                      options={["MALE", "FEMALE"]}
                      onChange={(e) => updateForm("gender", e.target.value)}
                      disabled={true}
                      defaultValue={userData?.gender}
                    />
                  </div> */}
                </div>

                <div className="form-group d-flex gap-4">
                  <div style={{ width: "100%" }}>
                    <FormInput
                      label="Phone Number"
                      value={formData?.phoneNumber}
                      onChange={(e) =>
                        updateForm("phoneNumber", e.target.value)
                      }
                    />
                  </div>
                  <div style={{ width: "100%" }}>
                    <FormInput
                      label="Alternate Phone Number (Whatsapp)"
                      value={formData?.altPhoneNumber}
                      onChange={(e) =>
                        updateForm("altPhoneNumber", e.target.value)
                      }
                    />
                  </div>
                </div>

                <button
                  className="btn btn-blue-800 btn-lg w-100 my-5"
                  type="submit"
                >
                  Save Changes
                </button>
              </form>
            </section>
          )}

          {/* Password and Sceurity */}
          {currentPage === "Password & Security" && (
            <section className="mt-5 mb-5">
              <form className="mt-3" onSubmit={onSubmitP}>
                <FormInput
                  type={"password"}
                  label="Current Password"
                  onChange={(e) =>
                    pform.updateForm("currentPassword", e.target.value)
                  }
                />
                <FormInput
                  type={"password"}
                  label="New Password"
                  onChange={(e) =>
                    pform.updateForm("newPassword", e.target.value)
                  }
                />

                <FormInput
                  label="Confirm Password"
                  type={"password"}
                  onChange={(e) =>
                    pform.updateForm("confirmPassword", e.target.value)
                  }
                />
                <button
                  className="btn btn-blue-800 btn-lg w-100 my-5"
                  type="submit"
                  disabled={!pform.formIsValid}
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
