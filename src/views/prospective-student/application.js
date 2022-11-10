import { useState } from "react";
import SuccessModal from "../../components/modals/SuccessModal";
import FormDropdown from "../../components/molecules/FormDropdown";
import FormInput from "../../components/molecules/FormInput";
import FormRadioGroup from "../../components/molecules/FormRadioGroup";
import useForm from "../../utility/hooks/useForm";
import useToggle from "../../utility/hooks/useToggle";
import { isUserLoggedIn, getUserData } from "../../utility/utilsGeneric";
import applicationPending from "../../assets/img/applicationPending.png";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

function ApplicationPage(props) {
  const { setHasApplied } = props;

  const [success, toggleSuccess] = useToggle();
  console.log("Auth", {
    auth: isUserLoggedIn(),
    user: getUserData(),
  });

  const initialState = {
    campus: "",
    academicSession: "",
    classes: "",
    contactAddress: "",
    dateOfBirth: "",
    nationality: "",
    maritalStatus: "",
    churchName: "",
    bornAgain: "",
    phoneNumber: "",
    altPhoneNumber: "",
    longBornAgain: "",
    baptized: "",
    affirmations: "",
  };

  const { formData, formIsValid, updateForm } = useForm({ initialState });

  const campusOptions = ["Option 1", "Option 2"];
  const academicOptions = ["Option 1", "Option 2"];
  const nationalityOptions = ["Option 1", "Option 2"];
  const maritalOptions = ["Option 1", "Option 2"];

  function makePayment(e) {
    e.preventDefault();
    toggleSuccess();
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
            options={campusOptions.map((o) => ({
              children: o,
              onClick: () => updateForm("campus", o),
            }))}
            title={"Campus"}
          />

          <FormDropdown
            options={academicOptions.map((o) => ({
              children: o,
              onClick: () => updateForm("academicSession", o),
            }))}
            title={"Academic Session"}
          />

          <FormRadioGroup
            label="How will you attend your classes"
            options={["Onsite", "Online"]}
            onChange={(e) => updateForm("classes", e.target.value)}
          />

          <FormInput
            label="Address"
            placeholder="Enter Contact Address"
            onChange={(e) => updateForm("contactAddress", e.target.value)}
          />

          <FormInput
            label="D.O.B"
            placeholder="Date of Birth"
            type={"date"}
            onChange={(e) => updateForm("dateOfBirth", e.target.value)}
            lg="6"
          />

          <FormDropdown
            options={nationalityOptions.map((o) => ({
              children: o,
              onClick: () => updateForm("nationality", o),
            }))}
            title={"Nationality"}
            lg="6"
          />

          <FormDropdown
            options={maritalOptions.map((o) => ({
              children: o,
              onClick: () => updateForm("maritalStatus", o),
            }))}
            title={"Marital Status"}
          />

          <FormInput
            label="Church Name"
            placeholder="Enter Church Name"
            onChange={(e) => updateForm("churchName", e.target.value)}
          />

          <FormRadioGroup
            label="Are you born again as stated in Romans 10:8 to 10?"
            options={["Yes", "No"]}
            onChange={(e) => updateForm("bornAgain", e.target.value)}
          />

          <FormInput
            label="How long have you been born again?"
            placeholder="How long have you been born again?"
            onChange={(e) => updateForm("longBornAgain", e.target.value)}
          />

          <FormRadioGroup
            label="Are you baptized in the Holy Spirit with the evidence of speaking in tongues as in Acts 2:4?"
            options={["Yes", "No"]}
            onChange={(e) => updateForm("baptized", e.target.value)}
          />
          <FormRadioGroup
            label="Affirmations? (See afirmation here)"
            options={["Yes", "No"]}
            onChange={(e) => updateForm("baptized", e.target.value)}
          />
        </div>

        <div className="py-4 border-top">
          <p>
            You are to pay an application fee of N10,000 to proceed with your
            application
          </p>
        </div>

        <button className="btn btn-blue-800 btn-lg w-100" type="submit">
          Proceed to Payment
        </button>
      </form>
    </>
  );
}

// Main
const ProspectiveStudentApplicationPage = () => {
  const [hasApplied, setHasApplied] = useState(false);

  return (
    <>
      <section className="container mt-5">
        <div className="auth-wrapper">
          <div className="row">
            <div className="col-xl-7 col-lg-8 col-md-10 col-12 mx-auto">
              <article className="bg-white shadow rounded-2 p-5">
                {hasApplied ? (
                  <section className="text-center">
                    <div className="p-3 bg-blue-200 rounded-3">
                      <img src={applicationPending} alt="Application Pending" />
                    </div>
                    <div
                      className="d-flex my-4 align-items-center justify-content-center gap-3 p-3 rounded-3"
                      style={{
                        backgroundColor: "#FEF7EA",
                      }}
                    >
                      <ExclamationCircleIcon color="#F2B12E" height={32} />
                      <h2 className="text-bold">Application Pending</h2>
                    </div>

                    <p className="mb-3">
                      We will contact you via the email you registered with once
                      your admission request is processed.
                    </p>
                  </section>
                ) : (
                  <ApplicationPage {...{ setHasApplied }} />
                )}
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProspectiveStudentApplicationPage;
