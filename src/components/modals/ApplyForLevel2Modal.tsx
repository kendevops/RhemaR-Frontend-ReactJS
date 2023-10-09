import { FormEvent } from "react";
import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import useForm from "../../utility/hooks/useForm";
import FormDropdown from "../molecules/FormDropdown";
import useAllCampuses from "../../hooks/queries/classes/useAllCampuses";
import FormInput from "../molecules/FormInput";
import TextArea from "../molecules/TextArea";
import MultipleSelect from "../molecules/MultipleSelect";
import useAllCourses from "../../hooks/queries/classes/useAllCourses";
import useCourses from "../../hooks/queries/classes/useCourses";
import useAllIntakes from "../../hooks/queries/classes/useAllIntakes";
import useAcademicSessions from "../../hooks/queries/classes/useAcademicSessions";
import FormRadioGroup from "../molecules/FormRadioGroup";
import useCreateApplication from "../../hooks/mutations/applications/useCreateApplication";
import { toast } from "react-toastify";
import ToastContent from "../molecules/ToastContent";
import handleError from "../../utils/handleError";

interface ApplyForLevel2ModalProps {
  toggle: VoidFunction;
  visibility: boolean;
  level?: string;
  onCreate?: VoidFunction;
}

export default function ApplyForLevel2Modal({
  toggle,
  visibility,
  onCreate,
  level,
}: ApplyForLevel2ModalProps) {
  const { mutate, isLoading } = useCreateApplication("LEVEL_2");

  const initialState = {
    campus: "",
    intake: "",
    session: "",
    comment: "",
    areaServing: "",
    spouseEmail: "",
    spouseDetails: "",
    spouseFullName: "",
    newChurchName: "",
    newPastorContact: "",
    newChurchDetails: "",
    spousePhoneNumber: "",
    newPastorFullName: "",
    previousChurchName: "",
    relationShipStatus: "",
    coursesNotCompleted: "",
    previousChurchDetails: "",
    previousPastorContact: "",
    previousPastorFullName: "",
    spouseSupportsApplication: "",
    hasCompletedLevelOneCourses: "",
    considersApplicationTrueAndAccurate: "",
    isMemberOfSameChurchAttendedInLevelOne: "",
  };

  const { formData, formIsValid, updateForm, formErrors } = useForm<
    typeof initialState
  >({
    initialState: initialState,
  });
  const { data: coursesData, isLoading: coursesLoading } = useCourses();

  const coursesOptions = coursesData?.courses?.map((cours: any) => cours.name);

  const { data: campusesData } = useAllCampuses();
  const { data: sessionsData } = useAcademicSessions();
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

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (formIsValid) {
      mutate(formData, {
        onSuccess: () => {
          toast.success(
            <ToastContent
              type={"success"}
              heading={"Success"}
              message={`Level 2 Application successfull`}
            />,
            ToastContent.Config
          );
          !!onCreate && onCreate();
          toggle();
        },
        onError: (e: any) => {
          handleError(e, formData);
        },
      });
    } else {
      alert("Please fill in all fields");
      console.log(formData);
    }
  }

  return (
    <Modal
      centered
      isOpen={visibility}
      toggle={toggle}
      scrollable
      style={{ maxWidth: "1100px" }}
    >
      <ModalHeader toggle={toggle}>Application For Level 2</ModalHeader>

      <ModalBody>
        <form onSubmit={handleSubmit}>
          {/* <div className="lh-base fw-semibold mt-5">Personal Details</div> */}
          <div className="d-flex flex-wrap  justify-content-between mt-3">
            <div className="col-6 px-3 ">
              <FormDropdown
                options={campusOptions}
                title="Select campus"
                onChange={(e) => updateForm("campus", e.target.value)}
                hasErrors={formErrors?.campus}
                value={formData.campus}
              />
            </div>
            <div className="col-6 px-3 ">
              <FormDropdown
                onChange={(e) => updateForm("intake", e?.target?.value)}
                options={intakeDataOptions?.map((o: any) => ({
                  children: o,
                }))}
                title={"Intake"}
                value={formData.intake}
              />
            </div>
            <div className="col-6 px-3 ">
              <FormDropdown
                options={sessionOptions}
                title="Session"
                onChange={(e) => updateForm("session", e.target.value)}
                hasErrors={formErrors?.session}
                value={formData.session}
              />
            </div>

            <div className="col-6 px-3 ">
              <FormRadioGroup
                label="Have you successfully completed your 25 level 1 courses?"
                options={["Yes", "No"]}
                onChange={(e) =>
                  updateForm(
                    "hasCompletedLevelOneCourses",
                    !!(e.target.value === "Yes")
                  )
                }
              />
            </div>

            <div className="col-6 px-3 ">
              <MultipleSelect
                options={coursesOptions}
                label="What courses have you not Completed?"
                value={formData?.coursesNotCompleted}
              />
            </div>
          </div>

          <div className="lh-base fw-semibold mt-3">Partner Details</div>

          <div className="d-flex flex-wrap  justify-content-between mt-2">
            <div className="col-6 px-3 ">
              <FormDropdown
                title="Relationship Status?"
                value={formData?.relationShipStatus}
                options={["SINGLE", "MARRIED"].map((d: any) => ({
                  children: d,
                }))}
                onChange={(e) =>
                  updateForm("relationShipStatus", e?.target?.value)
                }
              />
            </div>
            <div className="col-6 px-3 ">
              <FormInput
                label="Spouse FullName"
                placeholder="Spouse FullName"
                value={formData.spouseFullName}
                onChange={(e) => updateForm("spouseFullName", e?.target?.value)}
              />
            </div>
            <div className="col-6 px-3 ">
              <FormInput
                label="Spouse Email"
                placeholder="Spouse Email"
                value={formData.spouseEmail}
                onChange={(e) => updateForm("spouseEmail", e?.target?.value)}
              />
            </div>
            <div className="col-6 px-3 ">
              <FormInput
                label="Spouse Phone Number"
                placeholder="+2347033333333"
                value={formData.spousePhoneNumber}
                onChange={(e) =>
                  updateForm("spousePhoneNumber", e?.target?.value)
                }
              />
            </div>
            <div className="col-12 px-3 ">
              <FormInput
                label="Spouse Details"
                placeholder="Spouse Details"
                value={formData.spouseDetails}
                onChange={(e) => updateForm("spouseDetails", e?.target?.value)}
              />
            </div>
            <div className="col-6 px-3 ">
              <FormRadioGroup
                label="Your spouse supports this application?"
                options={["Yes", "No"]}
                onChange={(e) =>
                  updateForm(
                    "spouseSupportsApplication",
                    !!(e.target.value === "Yes")
                  )
                }
              />
            </div>
          </div>

          <div className="lh-base fw-semibold mt-3">Pastor Details</div>
          <div className="d-flex flex-wrap  justify-content-between mt-2">
            <div className="col-6 px-3 ">
              <FormInput
                label="Previous Pastor's FullName"
                placeholder="Previous Pastor FullName"
                value={formData.previousPastorFullName}
                onChange={(e) =>
                  updateForm("previousPastorFullName", e?.target?.value)
                }
              />
            </div>

            <div className="col-6 px-3 ">
              <FormInput
                label="Previous Pastor's Phone Number"
                placeholder="+2347033333333"
                value={formData.previousPastorContact}
                onChange={(e) =>
                  updateForm("previousPastorContact", e?.target?.value)
                }
              />
            </div>

            <div className="col-6 px-3 ">
              <FormInput
                label="New Pastor's FullName"
                placeholder="New Pastor FullName"
                value={formData.newPastorFullName}
                onChange={(e) =>
                  updateForm("newPastorFullName", e?.target?.value)
                }
              />
            </div>

            <div className="col-6 px-3 ">
              <FormInput
                label="New Pastor's Phone Number"
                placeholder="+2347033333333"
                value={formData.newPastorContact}
                onChange={(e) =>
                  updateForm("newPastorContact", e?.target?.value)
                }
              />
            </div>
          </div>

          <div className="lh-base fw-semibold mt-3">Church Details</div>

          <div className="d-flex flex-wrap  justify-content-between mt-2">
            <div className="col-6 px-3 ">
              <FormInput
                label="Previous Church Name"
                placeholder="Previous Church Name"
                value={formData.previousChurchName}
                onChange={(e) =>
                  updateForm("previousChurchName", e?.target?.value)
                }
              />
            </div>
            <div className="col-6 px-3 ">
              <FormInput
                label="New Church Name"
                placeholder="New Church Name"
                value={formData.newChurchName}
                onChange={(e) => updateForm("newChurchName", e?.target?.value)}
              />
            </div>
            <div className="col-12 px-3 ">
              <FormInput
                label="Previous Church Details"
                placeholder="Previous Church Details"
                value={formData.previousChurchDetails}
                onChange={(e) =>
                  updateForm("previousChurchDetails", e?.target?.value)
                }
              />
            </div>

            <div className="col-12 px-3 ">
              <FormInput
                label="New Church Details"
                placeholder="New Church Details"
                value={formData.newChurchDetails}
                onChange={(e) =>
                  updateForm("newChurchDetails", e?.target?.value)
                }
              />
            </div>
            <div className="col-6 px-3 ">
              <FormInput
                label=" What area are you Serving"
                placeholder="eg. Ushering Unit"
                value={formData.areaServing}
                onChange={(e) => updateForm("areaServing", e?.target?.value)}
              />
            </div>

            <div className="col-6 px-3 ">
              <FormRadioGroup
                label="Are you a member of same church you attended during your level 1 training?"
                options={["Yes", "No"]}
                onChange={(e) =>
                  updateForm(
                    "isMemberOfSameChurchAttendedInLevelOne",
                    !!(e.target.value === "Yes")
                  )
                }
              />
            </div>

            <div className="col-6 px-3 ">
              <FormRadioGroup
                label="Application True and Accurate?"
                options={["Yes", "No"]}
                onChange={(e) =>
                  updateForm(
                    "considersApplicationTrueAndAccurate",
                    !!(e.target.value === "Yes")
                  )
                }
              />
            </div>

            <TextArea
              label="Additional comments"
              placeholder="Additional comments go here"
              value={formData.comment}
              onChange={(e) => updateForm("comment", e?.target?.value)}
            />
          </div>

          {isLoading ? (
            <Spinner />
          ) : (
            <button
              className="btn btn-blue-800 btn-lg w-100 my-5"
              type="submit"
            >
              {"Submit"}
            </button>
          )}
        </form>
      </ModalBody>
    </Modal>
  );
}
