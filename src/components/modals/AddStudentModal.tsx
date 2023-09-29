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
import useUploadUsers from "../../hooks/mutations/users/useUploadUsers";
import FormRadioGroup from "../molecules/FormRadioGroup";
import useAllIntakes from "../../hooks/queries/classes/useAllIntakes";
import { regions, states } from "../../data/States";
import useCampusLevel from "../../hooks/queries/classes/useCampusLevel";

type AddStudentModalProps = {
  isOpen: boolean;
  toggle: VoidFunction;
};

export default function AddStudentModal({
  isOpen,
  toggle,
}: AddStudentModalProps) {
  const { data, isLoading: usersLoading } = useAllUsers();
  const { data: campusesData } = useAllCampuses();
  const { data: sessionsData } = useAcademicSessions();
  const uploadUsers = useUploadUsers();
  const isLoading = uploadUsers.isLoading;

  const [showFirstModal, setShowFirstModal] = useState(true);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [showThirdModal, setShowThirdModal] = useState(false);

  const { formData, formErrors, formIsValid, toggleError, updateForm } =
    useForm({
      initialState: {
        firstName: "",
        middleName: "",
        level: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        altPhoneNumber: "",
        gender: "",
        graduateDate: "2022-10-25T17:35:31.914Z",
        certificateHolderDate: "",
        roles: "",
        region: "",
        continent: "",
        levelOneEndDate: "",
        levelOneStartDate: "2022-10-25T17:35:31.914Z",
        levelTwoEndDate: "",
        levelTwoStartDate: "",
        levelThreeEndDate: "",
        levelThreeStartDate: "",
        levelFourEndDate: "",
        levelFourStartDate: "",
        currentCampus: "Enugu",
        levelOneCampus: "Enugu",
        levelTwoCampus: "",
        levelThreeCampus: "",
        levelFourCampus: "",
        currentIntake: "2027/2028",
        levelOneIntake: "2027/2028",
        levelTwoIntake: "",
        levelThreeIntake: "",
        levelFourIntake: "",
        currentSession: "2022/2023",
        levelOneSession: "2022/2023",
        levelTwoSession: "",
        levelThreeSession: "",
        levelFourSession: "",
        address: "",
        city: "",
        state: "",
        country: "",
        role: "",
        nationality: "Nigerian",
        maritalStatus: "",
      },
    });

  const maritalOptions = ["SINGLE", "MARRIED"];
  const genderOptions = ["MALE", "FEMALE"];

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

  //   const { data: levelData } = useCampusLevel();

  const levels = ["LEVEL_1", "LEVEL_2", "LEVEL_3", "LEVEL_4"];

  //   const countriesOptions = countries?.map((c) => c?.en_short_name);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const {
      state,
      city,

      address,

      maritalStatus,

      nationality,
      graduateDate,
      levelFourStartDate,
      levelFourEndDate,
      levelThreeStartDate,
      levelThreeEndDate,
      levelTwoStartDate,
      levelTwoEndDate,
      levelOneStartDate,
      levelOneEndDate,
      certificateHolderDate,
      region,
      ...otherData
    } = formData;

    const body = {
      ...otherData,
      // level: "LEVEL_1",

      address: {
        city,
        street: address,
        state,
        country: "Nigeria",
        zipCode: 2345,
        region: region,
        continent: "Africa",
      },
      roles: ["STUDENT"],

      graduateDate: graduateDate ? new Date(graduateDate)?.toISOString() : null,
      certificateHolderDate: certificateHolderDate
        ? new Date(certificateHolderDate)?.toISOString()
        : null,
      levelOneEndDate: levelOneEndDate
        ? new Date(levelOneEndDate)?.toISOString()
        : null,
      levelOneStartDate: levelOneStartDate
        ? new Date(levelOneStartDate)?.toISOString()
        : null,
      levelTwoEndDate: levelTwoEndDate
        ? new Date(levelTwoEndDate)?.toISOString()
        : null,
      levelTwoStartDate: levelTwoStartDate
        ? new Date(levelTwoStartDate)?.toISOString()
        : null,
      levelThreeEndDate: levelThreeEndDate
        ? new Date(levelThreeEndDate)?.toISOString()
        : null,
      levelThreeStartDate: levelThreeStartDate
        ? new Date(levelThreeStartDate)?.toISOString()
        : null,
      levelFourEndDate: levelFourEndDate
        ? new Date(levelFourEndDate)?.toISOString()
        : null,
      levelFourStartDate: levelFourStartDate
        ? new Date(levelFourStartDate)?.toISOString()
        : null,
      nationality: "Nigeria",
    };

    if (!formIsValid) {
      alert("Please fill in all fields");
      console.log(formData);
      return;
    }

    const data = { users: [body] };
    uploadUsers.mutate(data, {
      onSuccess: (e) => {
        toast.success(
          <ToastContent
            type={"success"}
            heading={"Student added"}
            message={"The student has been added successfully"}
          />
        );

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
                title="Select Level"
                value={formData?.level}
                options={levels?.map((d: any) => ({ children: d }))}
                onChange={(e) => updateForm("level", e?.target?.value)}
                // disabled={!isCreating}
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
              <FormInput
                label="Date of Graduation"
                placeholder="Date of Graduation"
                type={"date"}
                value={formData.graduateDate}
                onChange={(e) => updateForm("graduateDate", e.target.value)}
                hasErrors={formErrors?.graduateDate}
              />
              <FormInput
                label="Certificate Holder Date"
                placeholder="Certificate Holder Date"
                type={"date"}
                value={formData.certificateHolderDate}
                onChange={(e) =>
                  updateForm("certificateHolderDate", e.target.value)
                }
                hasErrors={formErrors?.certificateHolderDate}
              />
              <FormDropdown
                options={campusOptions}
                title="Select Current campus"
                onChange={(e) => updateForm("currentCampus", e.target.value)}
                hasErrors={formErrors?.currentCampus}
                value={formData.currentCampus}
              />

              <FormDropdown
                options={campusOptions}
                title="Select L1 campus"
                onChange={(e) => updateForm("levelOneCampus", e.target.value)}
                hasErrors={formErrors?.levelOneCampus}
                value={formData.levelOneCampus}
              />
              <FormDropdown
                options={campusOptions}
                title="Select L2 campus"
                onChange={(e) => updateForm("levelTwoCampus", e.target.value)}
                hasErrors={formErrors?.levelTwoCampus}
                value={formData.levelTwoCampus}
              />
              <FormDropdown
                options={campusOptions}
                title="Select L3 campus"
                onChange={(e) => updateForm("levelThreeCampus", e.target.value)}
                hasErrors={formErrors?.levelThreeCampus}
                value={formData.levelThreeCampus}
              />
              <FormDropdown
                options={campusOptions}
                title="Select L4 campus"
                onChange={(e) => updateForm("levelFourCampus", e.target.value)}
                hasErrors={formErrors?.levelFourCampus}
                value={formData.levelFourCampus}
              />

              <FormDropdown
                onChange={(e) => updateForm("currentIntake", e?.target?.value)}
                options={intakeDataOptions?.map((o: any) => ({
                  // options={["2023/2024", "2024/2025"]?.map((o) => ({
                  children: o,
                }))}
                title={"Current Intake"}
                value={formData.currentIntake}
              />
              <FormDropdown
                onChange={(e) => updateForm("levelOneIntake", e?.target?.value)}
                options={intakeDataOptions?.map((o: any) => ({
                  // options={["2023/2024", "2024/2025"]?.map((o) => ({
                  children: o,
                }))}
                title={"L1 Intake"}
                value={formData.levelOneIntake}
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
              <FormDropdown
                options={sessionOptions}
                title="Current Session"
                onChange={(e) => updateForm("currentSession", e.target.value)}
                hasErrors={formErrors?.currentSession}
                value={formData.currentSession}
              />

              <FormDropdown
                options={sessionOptions}
                title="L1 Session"
                onChange={(e) => updateForm("levelOneSession", e.target.value)}
                hasErrors={formErrors?.levelOneSession}
                value={formData.levelOneSession}
              />

              <FormInput
                label="L1 start Date"
                placeholder="L1 start Date"
                type={"date"}
                value={formData.levelOneStartDate}
                onChange={(e) =>
                  updateForm("levelOneStartDate", e.target.value)
                }
                hasErrors={formErrors?.levelOneStartDate}
              />

              <FormInput
                label="L1 End Date"
                placeholder="L1 End Date"
                type={"date"}
                value={formData.levelOneEndDate}
                onChange={(e) => updateForm("levelOneEndDate", e.target.value)}
                hasErrors={formErrors?.levelOneEndDate}
              />

              <FormInput
                label="Address"
                placeholder="Enter Contact Address"
                onChange={(e) => updateForm("address", e.target.value)}
                hasErrors={formErrors?.address}
                value={formData.address}
              />

              <FormDropdown
                title="State"
                value={formData?.state}
                options={states?.map((d) => ({ children: d }))}
                onChange={(e) => updateForm("state", e?.target?.value)}
              />

              <FormDropdown
                title="Campus Address (Region)"
                value={formData?.region}
                options={regions?.map((d: any) => ({ children: d }))}
                onChange={(e) => updateForm("region", e?.target?.value)}
                // disabled={!isCreating}
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
