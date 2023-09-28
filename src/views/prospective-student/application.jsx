import { useEffect, useMemo, useState } from "react";
import SuccessModal from "../../components/modals/SuccessModal";
import FormDropdown from "../../components/molecules/FormDropdown";
import FormInput from "../../components/molecules/FormInput";
import FormRadioGroup from "../../components/molecules/FormRadioGroup";
import useForm from "../../utility/hooks/useForm";
import useToggle from "../../utility/hooks/useToggle";
import useCreateApplication from "../../hooks/mutations/applications/useCreateApplication";
import { Spinner } from "reactstrap";
import useAcademicSessions from "../../hooks/queries/classes/useAcademicSessions";
import useCampuses from "../../hooks/queries/classes/useCampuses";
import useCurrentUser from "../../hooks/queries/users/useCurrentUser";
import handleError from "../../utils/handleError";
import countries from "../../data/Countries";
import { useHistory } from "react-router-dom";
import useAllIntakes from "../../hooks/queries/classes/useAllIntakes";
import { states } from "../../data/States";
import ToastContent from "../../components/molecules/ToastContent";
import { toast } from "react-toastify";

function ApplicationPage(props) {
  const { setHasApplied } = props;

  const history = useHistory();

  const [success, toggleSuccess] = useToggle();

  const { data: userData, isLoading: userDataLoading } = useCurrentUser();

  // console.log(userData?.applications[0]?.level?.name);

  const countriesOptions = countries?.map((c) => c?.en_short_name);

  const initialState = {
    userTitle: "",
    campus: "",
    intake: "",
    session: "",
    referralSource: "",
    classAttendanceMethod: "",
    churchAddress: "",
    churchPastorName: "",
    churchPastorPhoneNumber: "",
    affirmationsAndSubmissions: "",
    address: "",
    dateOfBirth: "",
    nationality: "Nigerian",
    maritalStatus: "",
    churchName: "",
    isBornAgain: "",
    hasBeenBornAgainFor: "",
    isBaptized: "",
    affirmations: "",
    state: "",
    city: "",
  };

  const { formData, formIsValid, updateForm, toggleError, formErrors } =
    useForm({ initialState });
  const { mutate, isLoading } = useCreateApplication("LEVEL_1");
  const { data: sessionsData } = useAcademicSessions();
  const { data: campusesData } = useCampuses();

  console.log(userData?.levelOneApplications[0]);
  console.log(userData);

  const campusOptions = campusesData?.nodes?.map((d) => d?.name);
  const sessionsDataOptions = sessionsData?.nodes
    ?.filter((d) => d?.isActive)
    .map((d) => d?.name);

  const { data: intakeData } = useAllIntakes();
  const intakeDataOptions = intakeData?.nodes
    ?.filter((d) => d?.session?.isActive)
    .map((d) => d?.name);

  console.log(sessionsData, sessionsDataOptions);

  // console.log(campusesData, data);
  const maritalOptions = ["SINGLE", "MARRIED"];
  const titleOptions = ["Mr", "Mrs", "Ms", "Pastor", "Rev", "Dr", "Other"];
  const referralSourceOptions = [
    "Facebook",
    "Instagram",
    "Email",
    "SMS",
    "Billboard",
    "Referral - Friend",
    "Referral - Current Student",
    "Referral - Alumni",
    "Referral - RHEMA Staff",
    "RHEMA Conference",
    "RHEMA Youth",
    "Others",
  ];

  // const maritalOptions = ["SINGLE", "MARRIED"];

  const [campusFee, setCampusFee] = useState("");

  useEffect(() => {
    //set Campus and academic sessions on render
    if (formData?.campus?.length < 3 && !!campusOptions) {
      console.log(formData.campus);
      updateForm("campus", campusOptions[0]);

      const fee = campusesData?.nodes?.find((c) => c?.name === formData?.campus)
        ?.tuitions[0]?.initialPayment;

      console.log(formData.campus);

      setCampusFee(fee);
    }
    if (formData?.session?.length < 3 && !!sessionsDataOptions) {
      updateForm("session", sessionsDataOptions[0]);
    }
  }, [
    formData?.campus?.length,
    updateForm,
    campusOptions,
    sessionsDataOptions,
    formData?.session?.length,
    campusesData,
    formData?.campus,
  ]);

  const updateFee = () => {
    const fee = campusesData?.nodes?.find((c) => c?.name === formData?.campus)
      ?.tuitions[0]?.feePayment;

    setCampusFee(fee);
  };

  useEffect(() => {
    updateFee();
  }, [formData.campus]);

  console.log(campusFee);

  async function makePayment(e) {
    e.preventDefault();

    let hasFieldsError;
    const {
      state,
      city,
      affirmations,
      longBornAgain,
      address,
      churchStreet,
      affirmationsAndSubmissions,
      ...otherData
    } = formData;
    const body = {
      ...otherData,
      affirmationsAndSubmissions:
        affirmationsAndSubmissions === true ? "Yes" : "No",
      level: "LEVEL_1",
      address: {
        city,
        street: address,
        state,
        country: "Nigeria",
        zipCode: 234,
      },
    };

    console.log(body);

    Object.keys(body).forEach((key) => {
      const value = body[key];
      if (value === "" && key !== "referralSource") {
        // console.log(`Property: ${key}, Value: ${value}`);
        hasFieldsError = true;

        toast.error(
          <ToastContent
            type={"error"}
            heading={"Empty Field"}
            message={`Please ${key} should not be emplty`}
          />,
          ToastContent.Config
        );
      }
    });

    if (!body.isBornAgain) {
      toast.error(
        <ToastContent
          type={"error"}
          heading={"Be Born Again"}
          message={`You must be born again to go through this application`}
        />,
        ToastContent.Config
      );
      return;
    } else if (body.affirmationsAndSubmissions === "No") {
      toast.error(
        <ToastContent
          type={"error"}
          heading={"Affirmations and Submissions"}
          message={`You must be affirm and submit to go through this application`}
        />,
        ToastContent.Config
      );
      return;
    } else if (!body.isBaptized) {
      toast.error(
        <ToastContent
          type={"error"}
          heading={"Be Baptized"}
          message={`You must be Baptized to go through this application`}
        />,
        ToastContent.Config
      );
      return;
    }

    // if (!Object.values(body).every((v) => v > "")) {
    //   alert("Please fill in all fields");
    //   console.log({ body });
    //   return;
    // }

    if (!hasFieldsError) {
      mutate(body, {
        onSuccess: (d) => {
          // toast.success(
          //   <ToastContent
          //     type={"success"}
          //     heading={"Success"}
          //     message={`Application submitted Successfully`}
          //   />,
          //   ToastContent.Config
          // );
          const paymentUrl =
            d?.data?.data?.application?.initialPayment?.paymentUrl;
          window?.open(paymentUrl);
          window.location?.reload();
        },
        onError: (err) => {
          handleError(err, formData, toggleError);
        },
      });
    }
  }

  useEffect(() => {
    if (
      userData?.levelOneApplications[0]?.status === "PENDING" ||
      userData?.levelOneApplications[0]?.status === "APPROVED" ||
      userData?.levelOneApplications[0]?.status === "ABANDONED"
    ) {
      localStorage.setItem("userData", JSON.stringify(userData));
      return history.replace("/dashboard");
    }
  }, [userData?.levelOneApplications[0], userData]);

  return (
    <>
      <SuccessModal
        isVisible={success}
        toggle={toggleSuccess}
        message={
          "Your payment was successfully. You will be contacted via email once your admission request is processed."
        }
        CTA={
          <button
            onClick={() => setHasApplied(true)}
            className="btn btn-blue-800 btn-lg w-100"
          >
            Continue
          </button>
        }
      />
      {userDataLoading ? (
        <Spinner />
      ) : (
        <div className="bg-white r-card px-5 py-4 mb-4">
          <div className="text-center mb-5">
            {isLoading && <Spinner />}
            <h3 className="title mb-4">Level One Application</h3>
            <p>
              Fill the form below to register.
              <br />
            </p>
          </div>
          <div className="alert alert-danger"></div>
          <form onSubmit={makePayment}>
            <div className="row">
              <FormDropdown
                onChange={(e) => updateForm("userTitle", e?.target?.value)}
                options={titleOptions?.map((o) => ({
                  children: o,
                }))}
                title={"Title"}
                hasErrors={formErrors?.userTitle}
              />

              <FormDropdown
                options={campusOptions?.map((o) => ({
                  children: o,
                }))}
                onChange={(e) => {
                  updateForm("campus", e?.target?.value);
                }}
                title={"Campus"}
                // value={formData?.campus}
              />

              <FormDropdown
                onChange={(e) => updateForm("intake", e?.target?.value)}
                options={intakeDataOptions?.map((o) => ({
                  children: o,
                }))}
                title={"Intake"}
                hasErrors={formErrors?.intake}
              />

              <FormDropdown
                onChange={(e) => updateForm("session", e?.target?.value)}
                options={sessionsDataOptions?.map((o) => ({
                  // options={["2023/2024", "2024/2025"]?.map((o) => ({
                  children: o,
                }))}
                title={"Academic Session"}
                hasErrors={formErrors?.session}
              />

              <FormRadioGroup
                label="How will you attend your classes"
                options={["ONSITE", "ONLINE"]}
                onChange={(e) =>
                  updateForm("classAttendanceMethod", e.target.value)
                }
                hasErrors={formErrors?.classAttendanceMethod}
              />

              <FormInput
                label="Address"
                placeholder="Enter Contact Address"
                onChange={(e) => updateForm("address", e.target.value)}
                hasErrors={formErrors?.address}
                value={formData.address}
              />

              <FormInput
                label="City"
                placeholder="Enter City"
                onChange={(e) => updateForm("city", e.target.value)}
                hasErrors={formErrors?.city}
                lg="6"
                value={formData.city}
              />
              {/* <FormInput
            label="State"
            placeholder="Enter State"
            onChange={(e) => updateForm("state", e.target.value)}
            hasErrors={formErrors?.state}
            lg="6"
            value={formData.state}
          /> */}

              <FormDropdown
                title="Campus Address (State)"
                value={formData?.state}
                options={states?.map((d) => ({ children: d }))}
                onChange={(e) => updateForm("state", e?.target?.value)}
                hasErrors={formErrors?.state}
                lg="6"
              />
              <FormInput
                label="D.O.B"
                placeholder="Date of Birth"
                type={"date"}
                onChange={(e) =>
                  updateForm(
                    "dateOfBirth",
                    new Date(e.target.value)?.toISOString()
                  )
                }
                lg="6"
                hasErrors={formErrors?.dateOfBirth}
              />

              <FormDropdown
                title="Nationality"
                onChange={(e) => updateForm("nationality", e.target.value)}
                options={countriesOptions.map((o) => ({
                  children: o,
                }))}
                lg="6"
                hasErrors={formErrors?.nationality}
              />

              <FormDropdown
                onChange={(e) => updateForm("maritalStatus", e?.target?.value)}
                options={maritalOptions.map((o) => ({
                  children: o,
                }))}
                title={"Marital Status"}
                hasErrors={formErrors?.maritalStatus}
              />

              <FormDropdown
                onChange={(e) => updateForm("referralSource", e?.target?.value)}
                options={referralSourceOptions?.map((o) => ({
                  children: o,
                }))}
                title={"Referral source"}
              />

              <FormInput
                label="Church Name"
                placeholder="Enter Church Name"
                onChange={(e) => updateForm("churchName", e.target.value)}
                hasErrors={formErrors?.churchName}
                value={formData.churchName}
              />
              <FormInput
                label="Church Address"
                placeholder="Enter Church Address"
                onChange={(e) => updateForm("churchAddress", e.target.value)}
                hasErrors={formErrors?.churchAddress}
                value={formData.churchAddress}
              />

              <FormInput
                label="Church Pastor's Name"
                placeholder="Enter Church pastor's name"
                onChange={(e) => updateForm("churchPastorName", e.target.value)}
                hasErrors={formErrors?.churchPastorName}
                value={formData.churchPastorName}
              />
              <FormInput
                label="Church Pastor's Phone Number"
                placeholder="+2348012340000"
                onChange={(e) =>
                  updateForm("churchPastorPhoneNumber", e.target.value)
                }
                hasErrors={formErrors?.churchPastorPhoneNumber}
                value={formData.churchPastorPhoneNumber}
              />

              <FormRadioGroup
                label="Are you born again as stated in Romans 10:8 to 10?"
                options={["Yes", "No"]}
                onChange={(e) =>
                  updateForm("isBornAgain", !!(e.target.value === "Yes"))
                }
                hasErrors={formErrors?.isBornAgain}
              />

              <FormInput
                label="How long have you been born again?"
                placeholder="How long have you been born again?"
                onChange={(e) =>
                  updateForm("hasBeenBornAgainFor", e.target.value)
                }
                hasErrors={formErrors?.hasBeenBornAgainFor}
                value={formData.hasBeenBornAgainFor}
              />

              <FormRadioGroup
                label="Are you baptized in the Holy Spirit with the evidence of speaking in tongues as in Acts 2:4?"
                options={["Yes", "No"]}
                onChange={(e) => {
                  updateForm("isBaptized", !!(e.target.value === "Yes"));
                  console.log(e.target.value);
                }}
                hasErrors={formErrors?.isBaptized}
                // value={formData.isBaptized}
              />

              <FormRadioGroup
                label="Affirmations and Submissions"
                options={["Yes", "No"]}
                onChange={(e) => {
                  updateForm(
                    "affirmationsAndSubmissions",
                    !!(e.target.value === "Yes")
                  );
                }}
                hasErrors={formErrors?.affirmationsAndSubmissions}
                // value={formData.affirmationsAndSubmissions}
              />
            </div>

            <div className="py-4 border-top">
              <p
                style={{
                  color: "red",
                }}
              >
                You selected {formData?.campus} Campus, once you click proceed,
                it cannot be changed
              </p>
              <p>
                You are to pay an application fee of N{campusFee} to proceed
                with your application
              </p>
              <p>
                You will be redirected to paystack to make payment after filling
                the form
              </p>
            </div>

            {isLoading && <Spinner />}

            <button
              className="btn btn-blue-800 btn-lg w-100"
              type="submit"
              disabled={isLoading}
            >
              Proceed to Payment
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default ApplicationPage;
