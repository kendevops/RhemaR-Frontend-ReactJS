import { FormEvent } from "react";
import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import useForm from "../../utility/hooks/useForm";
import useCreateCampusTuition from "../../hooks/mutations/classes/useCreateCampusTuition";
import useUpdateCampusTuition from "../../hooks/mutations/classes/useUpdateCampusTuition";
import FormDropdown from "../molecules/FormDropdown";
import { levels } from "../../data/Levels";
import FormInput from "../molecules/FormInput";
import { Autocomplete, TextField } from "@mui/material";
import { toast } from "react-toastify";
import ToastContent from "../molecules/ToastContent";
import handleError from "../../utils/handleError";
import useAllCampuses from "../../hooks/queries/classes/useAllCampuses";
import FormDropdownSelectMultiple from "../molecules/FormDropdownSelectMultiple";
import { states } from "../../data/States";
import { InstructorsData } from "../../data/InstructorsData";
import useAllCourses from "../../hooks/queries/classes/useAllCourses";
import useAllUsers from "../../hooks/queries/useAllUsers";
import userRoles from "../../utility/userRoles";

interface AddCourseScheduleModalProps {
  toggle: VoidFunction;
  visibility: boolean;
  defaultValues?: any;
  onCreate?: VoidFunction;
}

export default function AddCourseScheduleModal({
  toggle,
  defaultValues,
  visibility,
  onCreate,
}: AddCourseScheduleModalProps) {
  const isCreating = !defaultValues;

  const { isLoading: campusesLoading, data } = useAllCampuses();
  const campusesData = data?.nodes;
  const createTuition = useCreateCampusTuition();
  // const updateTuition = useUpdateCampusTuition(id ?? "");

  const isLoading = createTuition.isLoading || campusesLoading;

  const initialState = {
    course: "",
    campus: "",
    startDate: "",
    endDate: "",
    session: "",
    instructor: "",
    instructorEmail: "",
  };

  const { formData, formIsValid, updateForm, formErrors } = useForm<
    typeof initialState
  >({
    initialState: defaultValues ?? initialState,
    // optionalFields: ["discount"],
  });

  const campusOptions = campusesData?.map((d: any) => ({
    children: d?.name,
  }));

  const { data: coursesData, isLoading: coursesLoading } = useAllCourses();
  const coursesOptions = coursesData?.nodes?.map((cours: any) => ({
    label: cours?.title,
    id: cours?.title,
  }));

  console.log(coursesOptions);

  const { isLoading: usersLoading, data: usersData } = useAllUsers();
  const users = usersData?.users?.nodes;
  const instructorsOptions = users
    ?.filter((user: any) => user?.roles[0]?.name === userRoles.INSTRUCTOR)
    .map((u: any) => ({
      label: `${u?.firstName} ${u?.lastName}`,
      id: u?.email,
    }));

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
    <Modal centered isOpen={visibility} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add New Course Schedule</ModalHeader>
      <ModalBody>
        <form onSubmit={() => {}}>
          <div className="form-group">
            <label htmlFor="Search courses">Course</label>
            <Autocomplete
              fullWidth
              disablePortal
              id="Search courses"
              loading={coursesLoading}
              value={formData?.course}
              //   options={coursesOptions}
              options={["temp", "temp2"]}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    placeholder="Search courses"
                    className="form-control "
                  />
                );
              }}
              onChange={(e, value: any) => {
                updateForm("course", value?.id);
              }}
            />
          </div>

          <FormDropdown
            title="Session"
            value={formData?.session}
            options={["2023/2334", "2021/2324", "2036/2325"].map((d: any) => ({
              children: d,
            }))}
            onChange={(e) => updateForm("session", e?.target?.value)}
            disabled={!isCreating}
          />

          <FormDropdown
            options={campusOptions}
            title="Campus"
            hasErrors={formErrors?.campus}
          />

          <FormInput
            label="Start Date"
            type={"date"}
            onChange={(e) =>
              updateForm("startDate", new Date(e?.target?.value)?.toISOString())
            }
          />
          <FormInput
            label="End Date"
            type={"date"}
            onChange={(e) =>
              updateForm("endDate", new Date(e?.target?.value)?.toISOString())
            }
          />

          {/* <div className="form-group">
            <label htmlFor="Search instructors">Instructor</label>
            <Autocomplete
              fullWidth
              disablePortal
              id="Search instructors"
              value={formData?.instructorEmail}
              loading={usersLoading}
              options={instructorsOptions}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    placeholder="Search instructors"
                    className="form-control "
                  />
                );
              }}
              onChange={(e, value: any) => {
                updateForm("instructorEmail", value?.id);
              }}
            />
          </div> */}

          {isLoading ? (
            <Spinner />
          ) : (
            <button
              className="btn btn-blue-800 btn-lg w-100 my-5"
              type="submit"
            >
              {"Add Course"}
            </button>
          )}
        </form>
      </ModalBody>
    </Modal>
  );
}
