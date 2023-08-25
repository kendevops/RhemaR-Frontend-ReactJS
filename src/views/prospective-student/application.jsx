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

function ApplicationPage(props) {
  const { setHasApplied } = props;

  const history = useHistory();

  const [success, toggleSuccess] = useToggle();

  const { data: userData } = useCurrentUser();

  // console.log(userData?.applications[0]?.level?.name);

  useEffect(() => {
    if (userData?.applications[0]?.level) {
      history.replace("/dashboard");
    }
  }, []);

  const countriesOptions = countries?.map((c) => c?.en_short_name);

  const initialState = {
    title: "",
    campus: "Enugu",
    session: "2023/2024",
    referralSource: "direct",
    classAttendanceMethod: "",
    churchDetails: "",
    churchPastorName: "",
    churchPastorPhoneNumber: "",
    affirmationAndSubmissions: "",
    address: "",
    dateOfBirth: "",
    nationality: "Nigerian",
    maritalStatus: "single",
    churchName: "",
    isBornAgain: "",
    longBornAgain: "",
    isBaptized: "",
    affirmations: "",
    state: "",
    city: "",
  };

  const { formData, formIsValid, updateForm, toggleError, formErrors } =
    useForm({ initialState });
  const { mutate, isLoading } = useCreateApplication();
  const { data } = useAcademicSessions();
  const { data: campusesData } = useCampuses();

  const campusOptions = campusesData?.nodes?.map((d) => d?.name);
  const academicOptions = data?.nodes?.map((d) => d?.name);

  // console.log(campusesData, data);
  const maritalOptions = ["single", "married"];
  const [campusFee, setCampusFee] = useState("30000");

  useEffect(() => {
    //set Campus and academic sessions on render
    if (formData?.campus?.length < 3 && !!campusOptions) {
      updateForm("campus", campusOptions[0]);
      const fee = campusesData?.nodes?.find((c) => c?.name === formData?.campus)
        ?.tuitions[0]?.initialPayment;

      setCampusFee(fee);
    }
    if (formData?.session?.length < 3 && !!academicOptions) {
      updateForm("session", academicOptions[0]);
    }
  }, [
    formData?.campus?.length,
    updateForm,
    campusOptions,
    academicOptions,
    formData?.session?.length,
    campusesData,
    formData?.campus,
  ]);

  function makePayment(e) {
    e.preventDefault();
    const { state, city, affirmations, longBornAgain, address, ...otherData } =
      formData;
    const body = {
      ...otherData,
      level: "LEVEL_1",
      address: {
        city,
        street: address,
        state,
        country: "Nigeria",
        zipCode: 234,
      },
    };

    if (!Object.values(body).every((v) => v > "")) {
      alert("Please fill in all fields");
      console.log({ body });
      return;
    }

    mutate(body, {
      onSuccess: (d) => {
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
          <FormInput
            label="Title"
            placeholder="Title"
            onChange={(e) => updateForm("title", e.target.value)}
            hasErrors={formErrors?.title}
          />

          {campusOptions && (
            <FormDropdown
              onChange={(e) => {
                updateForm("campus", e?.target?.value);
                const fee = campusesData?.nodes?.find(
                  (c) => c?.name === formData?.campus
                )?.tuitions[0]?.initialPayment;

                setCampusFee(fee);
              }}
              options={campusOptions?.map((o) => ({
                // options={["Enugu", "Anambra", "Imo"]?.map((o) => ({
                children: o,
              }))}
              title={"Campus"}
            />
          )}

          {academicOptions && (
            <FormDropdown
              onChange={(e) => updateForm("session", e?.target?.value)}
              options={academicOptions?.map((o) => ({
                // options={["2023/2024", "2024/2025"]?.map((o) => ({
                children: o,
              }))}
              title={"Academic Session"}
            />
          )}
          <FormRadioGroup
            label="How will you attend your classes"
            options={["onsite", "online"]}
            onChange={(e) =>
              updateForm("classAttendanceMethod", e.target.value)
            }
          />

          <FormInput
            label="Address"
            placeholder="Enter Contact Address"
            onChange={(e) => updateForm("address", e.target.value)}
            hasErrors={formErrors?.address}
          />

          <FormInput
            label="City"
            placeholder="Enter City"
            onChange={(e) => updateForm("city", e.target.value)}
            hasErrors={formErrors?.city}
            lg="6"
          />
          <FormInput
            label="State"
            placeholder="Enter State"
            onChange={(e) => updateForm("state", e.target.value)}
            hasErrors={formErrors?.state}
            lg="6"
          />
          <FormInput
            label="D.O.B"
            placeholder="Date of Birth"
            type={"date"}
            onChange={(e) =>
              updateForm("dateOfBirth", new Date(e.target.value)?.toISOString())
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

          <FormInput
            label="Referral source"
            placeholder="How did you find out about us?"
            onChange={(e) => updateForm("referralSource", e.target.value)}
            hasErrors={formErrors?.referralSource}
          />

          <FormInput
            label="Church Name"
            placeholder="Enter Church Name"
            onChange={(e) => updateForm("churchName", e.target.value)}
            hasErrors={formErrors?.churchName}
          />
          <FormInput
            label="Church Address"
            placeholder="Enter Church Address"
            onChange={(e) => updateForm("churchDetails", e.target.value)}
            hasErrors={formErrors?.churchDetails}
          />
          <FormInput
            label="Church Pastor's Name"
            placeholder="Enter Church pastor's name"
            onChange={(e) => updateForm("churchPastorName", e.target.value)}
            hasErrors={formErrors?.churchPastorName}
          />
          <FormInput
            label="Church Pastor's Phone Number"
            placeholder="+2348012340000"
            onChange={(e) =>
              updateForm("churchPastorPhoneNumber", e.target.value)
            }
            hasErrors={formErrors?.churchPastorPhoneNumber}
          />

          <FormRadioGroup
            label="Are you born again as stated in Romans 10:8 to 10?"
            options={["Yes", "No"]}
            onChange={(e) =>
              updateForm("isBornAgain", !!(e.target.value === "Yes"))
            }
          />

          <FormInput
            label="How long have you been born again?"
            placeholder="How long have you been born again?"
            onChange={(e) => updateForm("longBornAgain", e.target.value)}
            hasErrors={formErrors?.longBornAgain}
          />

          <FormRadioGroup
            label="Are you baptized in the Holy Spirit with the evidence of speaking in tongues as in Acts 2:4?"
            options={["Yes", "No"]}
            onChange={(e) => {
              updateForm("isBaptized", !!(e.target.value === "Yes"));
              console.log(e.target.value);
            }}
            hasErrors={formErrors?.isBaptized}
          />

          <FormRadioGroup
            label="Affirmations and Submissions"
            options={["Yes", "No"]}
            onChange={(e) => {
              updateForm("affirmationAndSubmissions", e.target.value);
            }}
            hasErrors={formErrors?.affirmationAndSubmissions}
          />
        </div>

        <div className="py-4 border-top">
          <p
            style={{
              color: "red",
            }}
          >
            You selected {formData.campus} Campus, once you click proceed, it
            cannot be changed
          </p>
          <p>
            You are to pay an application fee of N{campusFee ?? "30000"} to
            proceed with your application
          </p>
          <p>
            You will be redirected to paystack to make payment after filling the
            form
          </p>
        </div>

        <button className="btn btn-blue-800 btn-lg w-100" type="submit">
          Proceed to Payment
        </button>
      </form>
    </>
  );
}

export default ApplicationPage;
