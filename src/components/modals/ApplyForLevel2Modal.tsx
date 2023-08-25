import { FormEvent } from "react";
import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import useForm from "../../utility/hooks/useForm";
import useCreateCampusTuition from "../../hooks/mutations/classes/useCreateCampusTuition";
import useUpdateCampusTuition from "../../hooks/mutations/classes/useUpdateCampusTuition";
import FormDropdown from "../molecules/FormDropdown";
import useAllCampuses from "../../hooks/queries/classes/useAllCampuses";
import FormDropdownSelectMultiple from "../molecules/FormDropdownSelectMultiple";
import { states } from "../../data/States";
import { InstructorsData } from "../../data/InstructorsData";
import FormInput from "../molecules/FormInput";
import TextArea from "../molecules/TextArea";
import MultipleSelect from "../molecules/MultipleSelect";
import useAllCourses from "../../hooks/queries/classes/useAllCourses";

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
  const { isLoading: campusesLoading, data } = useAllCampuses();
  const createTuition = useCreateCampusTuition();
  // const updateTuition = useUpdateCampusTuition(id ?? "");

  const isLoading = createTuition.isLoading || campusesLoading;

  const initialState = {
    isCourseCompleted: "",
    isCleared: "",
    courses: "",
    isAddressChanged: "",
    street: "",
    LGA: "",
    state: "",

    isVolunteer: "",
    whatTeam: "",
    howLong: "",
    leaderName: "",
    leaderNameContact: "",

    isMemberOfSameChurch: "",
    howLongPartner: "",

    comments: "",
  };

  const { formData, formIsValid, updateForm, formErrors } = useForm<
    typeof initialState
  >({
    initialState: initialState,
  });

  const { data: coursesData, isLoading: coursesDataLoading } = useAllCourses();
  const coursesOptions = coursesData?.nodes?.map((cours: any) => ({
    label: cours?.title,
    id: cours?.title,
  }));

  console.log(coursesData);

  const coursesData2 = [
    "Course 1",
    "Course 2",
    "Course 3",
    "Course 4",
    "Course 5",
    "Course 6",
    "Course 7",
  ];

  // function handleSubmit(e: FormEvent) {
  //   e.preventDefault();

  //   const { level, campus, ...otherData } = formData;

  //   if (formIsValid) {
  //     isCreating
  //       ? createTuition.mutate(formData, {
  //           onSuccess: () => {
  //             toast.success(
  //               <ToastContent
  //                 type={"success"}
  //                 heading={"Success"}
  //                 message={`Successfully created campus tuition`}
  //               />,
  //               ToastContent.Config
  //             );
  //             !!onCreate && onCreate();
  //             toggle();
  //           },
  //           onError: (e: any) => {
  //             handleError(e, formData);
  //           },
  //         })
  //       : updateTuition.mutate(otherData, {
  //           onSuccess: () => {
  //             toast.success(
  //               <ToastContent
  //                 type={"success"}
  //                 heading={"Success"}
  //                 message={`Successfully updated campus tuition`}
  //               />,
  //               ToastContent.Config
  //             );
  //             toggle();
  //           },
  //           onError: (e: any) => {
  //             handleError(e, formData);
  //           },
  //         });
  //   } else {
  //     alert("Please fill in all fields");
  //     console.log(formData);
  //   }
  // }

  return (
    <Modal
      centered
      isOpen={visibility}
      toggle={toggle}
      scrollable
      style={{ maxWidth: "1100px" }}
    >
      <ModalHeader
        toggle={toggle}
        //   className="bg-blue-800"
      >
        Application For Level 2
      </ModalHeader>

      <ModalBody>
        <form onSubmit={() => {}}>
          {/* <div className="lh-base fw-semibold mt-5">Personal Details</div> */}
          <div className="d-flex flex-wrap  justify-content-between mt-3">
            <div className="col-6 px-3 ">
              <FormDropdown
                title="Have you successfully completed your 25 level 1 courses?"
                value={formData?.isCourseCompleted}
                options={["No", "Yes"].map((d: any) => ({ children: d }))}
                onChange={(e) =>
                  updateForm("isCourseCompleted", e?.target?.value)
                }
                // style={{ width: "500px" }}
              />
            </div>
            <div className="col-6 px-3 ">
              <FormDropdown
                title="Have you been cleared by the student services team?"
                value={formData?.isCleared}
                options={["No", "Yes"].map((d: any) => ({ children: d }))}
                onChange={(e) => updateForm("isCleared", e?.target?.value)}
                // style={{ width: "500px" }}
              />
            </div>
            <div className="col-6 px-3 ">
              {/* <FormInput
                label="Last Name"
                placeholder="Last Name"
                onChange={(e) => updateForm("isCleared", e?.target?.value)}
                // style={{ width: "500px" }}
              /> */}

              <MultipleSelect
                options={coursesData2}
                label="If No, how many courses do you have left"
                value={formData?.courses}
              />
            </div>
          </div>

          <div className="lh-base fw-semibold mt-3">Contact Details</div>

          <div className="d-flex flex-wrap  justify-content-between mt-2">
            <div className="col-6 px-3 ">
              <FormDropdown
                title="Did your contact address change?"
                value={formData?.isAddressChanged}
                options={["No", "Yes"].map((d: any) => ({ children: d }))}
                onChange={(e) =>
                  updateForm("isAddressChanged", e?.target?.value)
                }
                // style={{ width: "500px" }}
              />
            </div>
            <div className="col-6 px-3 ">
              <FormInput
                label="Campus Address (Street)"
                placeholder="Street"
                onChange={(e) => updateForm("street", e?.target?.value)}
                // style={{ width: "500px" }}
              />
            </div>

            <div className="col-6 px-3 ">
              <FormInput
                label="Campus Address (LGA)"
                placeholder="LGA"
                onChange={(e) => updateForm("LGA", e?.target?.value)}
                // style={{ width: "500px" }}
              />
            </div>
            <div className="col-6 px-3 ">
              <FormDropdown
                title="Campus Address (State)"
                value={formData?.state}
                options={states?.map((d: any) => ({ children: d }))}
                onChange={(e) => updateForm("state", e?.target?.value)}
                // style={{ width: "500px" }}
              />
            </div>
          </div>

          <div className="lh-base fw-semibold mt-3">Volunteer Details</div>
          <div className="d-flex flex-wrap  justify-content-between mt-2">
            <div className="col-6 px-3">
              <FormDropdown
                title="Are you an RBTC Volunteer team member?"
                value={formData?.isVolunteer}
                options={["No", "Yes"].map((d: any) => ({ children: d }))}
                onChange={(e) => updateForm("isVolunteer", e?.target?.value)}
                // style={{ width: "500px" }}
              />
            </div>

            <div className="col-6 px-3">
              <FormDropdown
                title="What RBTC team did you serve?"
                value={formData?.whatTeam}
                options={["No", "Yes"].map((d: any) => ({ children: d }))}
                onChange={(e) => updateForm("whatTeam", e?.target?.value)}
              />
            </div>
            <div className="col-6 px-3 ">
              <FormInput
                label="How long have you served"
                placeholder=""
                onChange={(e) => updateForm("howLong", e?.target?.value)}
              />
            </div>
            <div className="col-6 px-3 ">
              <FormInput
                label="Team Leader Name"
                placeholder=""
                onChange={(e) => updateForm("leaderName", e?.target?.value)}
              />
            </div>
            <div className="col-6 px-3 ">
              <FormInput
                label="Team Leader Contact (Email or Mobile)"
                placeholder=""
                onChange={(e) =>
                  updateForm("leaderNameContact", e?.target?.value)
                }
              />
            </div>
          </div>

          <div className="lh-base fw-semibold mt-3">Partner Details</div>

          <div className="d-flex flex-wrap  justify-content-between mt-2">
            <div className="col-6 px-3 ">
              <FormInput
                label="How long have you been partnering with RBTC?"
                placeholder=""
                onChange={(e) => updateForm("howLongPartner", e?.target?.value)}
              />
            </div>
          </div>

          <div className="lh-base fw-semibold mt-3">Church Details</div>

          <div className="d-flex flex-wrap  justify-content-between mt-2">
            <div className="col-6 px-3">
              <FormDropdown
                title="Are you a member of same church you attended during your level 1 training?"
                value={formData?.isMemberOfSameChurch}
                options={["No", "Yes"].map((d: any) => ({ children: d }))}
                onChange={(e) =>
                  updateForm("isMemberOfSameChurch", e?.target?.value)
                }
              />
            </div>
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
