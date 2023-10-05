import { Modal, ModalBody, ModalHeader, Spinner, Toast } from "reactstrap";
import useAllUsers from "../../hooks/queries/useAllUsers";
import { UserDto } from "../../types/dto";
import useRoles from "../../hooks/queries/useRoles";
import useAllCampuses from "../../hooks/queries/classes/useAllCampuses";
import useForm from "../../utility/hooks/useForm";
import FormDropdown from "../molecules/FormDropdown";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import ToastContent from "../molecules/ToastContent";
import handleError from "../../utils/handleError";
import FormInput from "../molecules/FormInput";
import useAcademicSessions from "../../hooks/queries/classes/useAcademicSessions";
import countries from "../../data/Countries";
import FormRadioGroup from "../molecules/FormRadioGroup";
import useAllIntakes from "../../hooks/queries/classes/useAllIntakes";
import { states } from "../../data/States";
import useUploadApplications from "../../hooks/mutations/users/useUploadApplications";

type AddstudentApplicationModalProps = {
  isOpen: boolean;
  toggle: VoidFunction;
};

export default function AddstudentApplicationModal({
  isOpen,
  toggle,
}: AddstudentApplicationModalProps) {
  const { data, isLoading: usersLoading } = useAllUsers();
  const { data: campusesData } = useAllCampuses();
  const { data: sessionsData } = useAcademicSessions();
  const uploadUsers = useUploadApplications();
  const isLoading = uploadUsers.isLoading;

  const [showFirstModal, setShowFirstModal] = useState(true);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [showThirdModal, setShowThirdModal] = useState(false);

  const { formData, formErrors, formIsValid, toggleError, updateForm } =
    useForm({
      initialState: {
        userTitle: "",
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        altPhoneNumber: "",
        gender: "",
        campus: "",
        session: "",
        address: "",
        state: "",
        country: "",
        // rdNo: "",
        intake: "",
        referralSource: "",
        classAttendanceMethod: "",
        churchAddress: "",
        churchPastorName: "",
        churchPastorPhoneNumber: "",
        affirmationsAndSubmissions: "",
        dateOfBirth: "",
        nationality: "Nigerian",
        maritalStatus: "",
        churchName: "",
        isBornAgain: "",
        hasBeenBornAgainFor: "",
        longBornAgain: "",
        isBaptized: "",
        affirmations: "",
        city: "",
        hasPaidInitialPayment: "",
        hasPaidFeePayment: "",
        initialPaymentAmount: "",
        feePaymentAmount: "",
      },
    });

  const maritalOptions = ["SINGLE", "MARRIED"];
  const classAttendanceOptions = ["ONSITE", "ONLINE"];
  const genderOptions = ["MALE", "FEMALE"];
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

  const campusOptions = campusesData?.nodes?.map((d: any) => ({
    children: d?.name,
  }));

  const { data: intakeData } = useAllIntakes();
  const intakeDataOptions = intakeData?.nodes
    ?.filter((d: any) => d?.session?.isActive)
    .map((d: any) => d?.name);

  const sessionOptions = sessionsData?.nodes?.map((d: any) => ({
    children: d?.name,
  }));

  const countriesOptions = countries?.map((c) => c?.en_short_name);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const {
      state,
      city,
      affirmations,
      feePaymentAmount,
      initialPaymentAmount,
      hasPaidFeePayment,
      hasPaidInitialPayment,
      longBornAgain,
      hasBeenBornAgainFor,
      churchAddress,
      affirmationsAndSubmissions,
      churchPastorName,
      churchPastorPhoneNumber,
      churchName,
      address,
      campus,
      classAttendanceMethod,
      referralSource,
      maritalStatus,
      intake,
      isBornAgain,
      dateOfBirth,
      session,
      userTitle,
      isBaptized,
      nationality,
      ...otherData
    } = formData;

    const body = {
      ...otherData,
      // level: "LEVEL_1",
      CampusTuition: 30000,
      levelOneApplication: {
        campus: campus,
        intake: intake,
        session: session,
        userTitle: userTitle,
        isBaptized: isBaptized,
        isBornAgain: isBornAgain,
        nationality: "Nigeria",
        dateOfBirth: new Date(dateOfBirth)?.toISOString(),
        maritalStatus: maritalStatus,
        referralSource: referralSource,
        classAttendanceMethod: classAttendanceMethod,
        hasBeenBornAgainFor: hasBeenBornAgainFor,
        churchName: churchName,
        churchAddress: churchAddress,
        churchPastorName: churchPastorName,
        churchPastorPhoneNumber: churchPastorPhoneNumber,
        affirmationsAndSubmissions: affirmationsAndSubmissions,
      },
      address: {
        city,
        street: address,
        state,
        country: "Nigeria",
        zipCode: 23456,
      },

      payments: {
        feePaymentAmount: +feePaymentAmount,
        hasPaidFeePayment: hasPaidFeePayment,
        initialPaymentAmount: +initialPaymentAmount,
        hasPaidInitialPayment: hasPaidInitialPayment,
      },
    };

    if (!formIsValid) {
      alert("Please fill in all fields");
      console.log(formData);
      return;
    }

    const data = { users: [body] };

    console.log(data);

    uploadUsers.mutate(data, {
      onSuccess: (e) => {
        console.log(e);

        e?.data?.data?.results?.map((e: any) => {
          if (!e?.success) {
            toast.error(
              <ToastContent
                type={"error"}
                heading={"Error Adding Student"}
                message={e?.error}
              />
            );
          } else {
            toast.success(
              <ToastContent
                type={"success"}
                heading={"Student added"}
                message={"The student has been added successfully"}
              />
            );
          }
        });

        toggle();
      },
      onError: (e: any) => {
        handleError(e, formData, toggleError);
        console.log(e);
      },
    });
  }

  return (
    <Modal centered {...{ isOpen, toggle }} scrollable>
      <ModalHeader toggle={toggle}>Add Student</ModalHeader>
      <ModalBody>
        <form className="row" onSubmit={handleSubmit}>
          {showFirstModal && (
            <div>
              <FormDropdown
                onChange={(e) => updateForm("userTitle", e?.target?.value)}
                options={titleOptions?.map((o) => ({
                  // options={["2023/2024", "2024/2025"]?.map((o) => ({
                  children: o,
                }))}
                title={"Title"}
                value={formData.userTitle}
              />
              <FormInput
                label="First name"
                onChange={(e) => updateForm("firstName", e.target.value)}
                hasErrors={formErrors.firstName}
                value={formData.firstName}
              />
              <FormInput
                label="middle name"
                onChange={(e) => updateForm("middleName", e.target.value)}
                hasErrors={formErrors.middleName}
                value={formData.middleName}
              />
              <FormInput
                label="Last name"
                onChange={(e) => updateForm("lastName", e.target.value)}
                hasErrors={formErrors.lastName}
                value={formData.lastName}
              />
              <FormInput
                label="Email"
                type="email"
                onChange={(e) => updateForm("email", e.target.value)}
                hasErrors={formErrors.email}
                value={formData.email}
              />
              <FormInput
                label="Phone number"
                type="tel"
                placeholder="+2347030000000"
                onChange={(e) => updateForm("phoneNumber", e.target.value)}
                hasErrors={formErrors.phoneNumber}
                value={formData.phoneNumber}
              />

              <FormInput
                label="Alternative Phone number"
                type="tel"
                onChange={(e) => updateForm("altPhoneNumber", e.target.value)}
                hasErrors={formErrors.altPhoneNumber}
                value={formData.altPhoneNumber}
              />

              <FormDropdown
                options={genderOptions.map((o) => ({
                  children: o,
                }))}
                onChange={(e) => updateForm("gender", e?.target?.value)}
                title="Gender"
                hasErrors={formErrors?.gender}
                value={formData.gender}
              />

              <FormInput
                label="D.O.B"
                placeholder="Date of Birth"
                type={"date"}
                value={formData.dateOfBirth}
                onChange={(e) => updateForm("dateOfBirth", e.target.value)}
                hasErrors={formErrors?.dateOfBirth}
              />

              <FormDropdown
                onChange={(e) => updateForm("maritalStatus", e?.target?.value)}
                options={maritalOptions.map((o) => ({
                  children: o,
                }))}
                title={"Marital Status"}
                hasErrors={formErrors?.maritalStatus}
                value={formData.maritalStatus}
              />
              <FormDropdown
                title="How will you attend your classes"
                options={classAttendanceOptions.map((o) => ({
                  children: o,
                }))}
                onChange={(e) =>
                  updateForm("classAttendanceMethod", e.target.value)
                }
                value={formData.classAttendanceMethod}
              />
              <div className="d-flex justify-content-between align-items-center w-100">
                <button
                  onClick={() => {
                    toggle();
                  }}
                  className="btn btn-blue-800 btn-lg w-25 "
                  type="button"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowFirstModal(false);
                    setShowSecondModal(true);
                  }}
                  className="btn btn-blue-800 btn-lg w-25 "
                  type="button"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {showSecondModal && (
            <div>
              <FormDropdown
                options={campusOptions}
                title="Select campus"
                onChange={(e) => updateForm("campus", e.target.value)}
                hasErrors={formErrors?.campus}
                value={formData.campus}
              />

              <FormDropdown
                onChange={(e) => updateForm("intake", e?.target?.value)}
                options={intakeDataOptions?.map((o: any) => ({
                  // options={["2023/2024", "2024/2025"]?.map((o) => ({
                  children: o,
                }))}
                title={"Intake"}
                value={formData.intake}
              />

              <FormDropdown
                options={sessionOptions}
                title="Session"
                onChange={(e) => updateForm("session", e.target.value)}
                hasErrors={formErrors?.session}
                value={formData.session}
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
                value={formData.city}
              />

              {/* <FormInput
                label="RD No."
                placeholder="Enter RD No."
                onChange={(e) => updateForm("rdNo", e.target.value)}
                hasErrors={formErrors?.rdNo}
                value={formData.rdNo}
              /> */}

              <FormDropdown
                title="State"
                value={formData?.state}
                options={states?.map((d) => ({ children: d }))}
                onChange={(e) => updateForm("state", e?.target?.value)}
              />

              <FormDropdown
                title="Nationality"
                onChange={(e) => updateForm("nationality", e.target.value)}
                options={countriesOptions.map((o) => ({
                  children: o,
                }))}
                hasErrors={formErrors?.nationality}
                value={formData.nationality}
              />

              <FormDropdown
                onChange={(e) => updateForm("referralSource", e?.target?.value)}
                options={referralSourceOptions?.map((o) => ({
                  children: o,
                }))}
                title={"Referral source"}
                value={formData.referralSource}
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
              <div className="d-flex justify-content-between align-items-center w-100">
                <button
                  onClick={() => {
                    setShowFirstModal(true);
                    setShowSecondModal(false);
                  }}
                  className="btn btn-blue-800 btn-lg w-25 "
                  type="button"
                >
                  Prev
                </button>
                <button
                  onClick={() => {
                    setShowSecondModal(false);
                    setShowThirdModal(true);
                  }}
                  className="btn btn-blue-800 btn-lg w-25 "
                  type="button"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {showThirdModal && (
            <div>
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
                // value={formData.isBornAgain}
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
                // hasErrors={formErrors?.isBaptized}
                // value={formData.isBaptized}
              />

              <FormRadioGroup
                label="Affirmations and Submissions"
                options={["Yes", "No"]}
                onChange={(e) => {
                  updateForm("affirmationsAndSubmissions", e.target.value);
                }}
                // hasErrors={formErrors?.affirmationsAndSubmissions}
                // value={formData.affirmationsAndSubmissions}
              />

              <FormRadioGroup
                label="Has paid Application fee?"
                options={["Yes", "No"]}
                onChange={(e) =>
                  updateForm("hasPaidFeePayment", !!(e.target.value === "Yes"))
                }
              />
              <FormInput
                label="Application Fee amount"
                placeholder="Enter Application Fee amount"
                onChange={(e) => updateForm("feePaymentAmount", e.target.value)}
                hasErrors={formErrors?.feePaymentAmount}
                value={formData.feePaymentAmount}
              />

              <FormRadioGroup
                label="Has paid Initial fee?"
                options={["Yes", "No"]}
                onChange={(e) =>
                  updateForm(
                    "hasPaidInitialPayment",
                    !!(e.target.value === "Yes")
                  )
                }
              />

              <FormInput
                label="Initial Fee amount"
                placeholder="Enter Initial Fee amount"
                onChange={(e) =>
                  updateForm("initialPaymentAmount", e.target.value)
                }
                hasErrors={formErrors?.initialFeeAmount}
                value={formData.initialPaymentAmount}
              />
              <div className="d-flex justify-content-between align-items-center w-100 my-3 ">
                <button
                  onClick={() => {
                    setShowSecondModal(true);
                    setShowThirdModal(false);
                  }}
                  className="btn btn-blue-800 btn-lg w-25 "
                  type="button"
                >
                  Prev
                </button>
              </div>
            </div>
          )}

          {showThirdModal && (
            <>
              {isLoading ? (
                <Spinner />
              ) : (
                <button className="btn btn-blue-800 btn-lg w-100" type="submit">
                  Add student
                </button>
              )}
            </>
          )}
        </form>
      </ModalBody>
    </Modal>
  );
}
