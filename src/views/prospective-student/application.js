import { useEffect, useState } from "react";
import SuccessModal from "../../components/modals/SuccessModal";
import FormDropdown from "../../components/molecules/FormDropdown";
import FormInput from "../../components/molecules/FormInput";
import FormRadioGroup from "../../components/molecules/FormRadioGroup";
import useForm from "../../utility/hooks/useForm";
import useToggle from "../../utility/hooks/useToggle";
import applicationPending from "../../assets/img/applicationPending.png";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import useCreateApplication from "../../hooks/mutations/applications/useCreateApplication";
import { Spinner } from "reactstrap";
import useAcademicSessions from "../../hooks/queries/classes/useAcademicSessions";
import useCampuses from "../../hooks/queries/classes/useCampuses";
import useCurrentUser from "../../hooks/queries/users/useCurrentUser";

function ApplicationPage(props) {
  const { setHasApplied } = props;

  const [success, toggleSuccess] = useToggle();

  const initialState = {
    campus: "",
    session: "",
    classes: "",
    address: "",
    dateOfBirth: "",
    nationality: "Nigerian",
    maritalStatus: "Single",
    churchName: "",
    isBornAgain: "",
    longBornAgain: "",
    isBaptized: "",
    affirmations: "",
    state: "",
    city: "",
  };

  const { formData, formIsValid, updateForm } = useForm({ initialState });
  const { mutate, isLoading } = useCreateApplication();
  const { data } = useAcademicSessions();
  const { data: campusesData } = useCampuses();

  const campusOptions = campusesData?.nodes?.map((d) => d?.name);
  const academicOptions = data?.nodes?.map((d) => d?.name);
  const maritalOptions = ["Single", "Married"];

  useEffect(() => {
    //set Campus and academic sessions on render
    if (formData?.campus?.length < 3 && !!campusOptions) {
      updateForm("campus", campusOptions[0]);
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
  ]);

  function makePayment(e) {
    e.preventDefault();
    const {
      state,
      city,
      affirmations,
      longBornAgain,
      address,
      classes,
      ...otherData
    } = formData;
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

    mutate(body, {
      onSuccess: () => {
        //proceed to make payment
        // toggleSuccess();
      },
      onError: (err) => {
        console.log({ err, body });
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
          {campusOptions && (
            <FormDropdown
              onChange={(e) => updateForm("campus", e?.target?.value)}
              options={campusOptions.map((o) => ({
                children: o,
              }))}
              title={"Campus"}
            />
          )}

          {academicOptions && (
            <FormDropdown
              onChange={(e) => updateForm("session", e?.target?.value)}
              options={academicOptions.map((o) => ({
                children: o,
              }))}
              title={"Academic Session"}
            />
          )}
          {/* <FormRadioGroup
            label="How will you attend your classes"
            options={["Onsite", "Online"]}
            onChange={(e) => updateForm("classes", e.target.value)}
          /> */}

          <FormInput
            label="Address"
            placeholder="Enter Contact Address"
            onChange={(e) => updateForm("address", e.target.value)}
          />

          <FormInput
            label="City"
            placeholder="Enter City"
            onChange={(e) => updateForm("city", e.target.value)}
            lg="6"
          />
          <FormInput
            label="State"
            placeholder="Enter State"
            onChange={(e) => updateForm("state", e.target.value)}
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
          />

          <FormInput
            label="Nationality"
            placeholder="Nigerian"
            type={"text"}
            onChange={(e) => updateForm("nationality", e.target.value)}
            lg="6"
          />

          <FormDropdown
            onChange={(e) => updateForm("maritalStatus", e?.target?.value)}
            options={maritalOptions.map((o) => ({
              children: o,
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
            onChange={(e) =>
              updateForm("isBornAgain", !!(e.target.value === "Yes"))
            }
          />

          <FormInput
            label="How long have you been born again?"
            placeholder="How long have you been born again?"
            onChange={(e) => updateForm("longBornAgain", e.target.value)}
          />

          <FormRadioGroup
            label="Are you baptized in the Holy Spirit with the evidence of speaking in tongues as in Acts 2:4?"
            options={["Yes", "No"]}
            onChange={(e) => {
              updateForm("isBaptized", !!(e.target.value === "Yes"));
              console.log(e.target.value);
            }}
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
  const { data } = useCurrentUser();
  console?.log({ data });

  useEffect(() => {
    if (!data) return;
    if (!data?.applications?.length) return;

    //check the user application status
    switch (data?.applications[0]?.status) {
      case "PENDING":
        break;
      default:
        console.log("Default");
    }
  });

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
