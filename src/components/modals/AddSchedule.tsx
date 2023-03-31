import { FormEvent } from "react";
import useForm from "../../utility/hooks/useForm";
import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import { Autocomplete, TextField } from "@mui/material";
import useAllCourses from "../../hooks/queries/classes/useAllCourses";
import useScheduleClass from "../../hooks/mutations/classes/useScheduleClass";
import { toast } from "react-toastify";
import ToastContent from "../molecules/ToastContent";
import FormInput from "../molecules/FormInput";
import useAllUsers from "../../hooks/queries/useAllUsers";
import userRoles from "../../utility/userRoles";
import useAcademicSessions from "../../hooks/queries/classes/useAcademicSessions";
import FormDropdown from "../molecules/FormDropdown";
import handleError from "../../utils/handleError";
import useCampuses from "../../hooks/queries/classes/useCampuses";
import useAllClasses from "../../hooks/queries/classes/useAllClasses";

type AddScheduleProps = {
  toggle: VoidFunction;
  visibility: boolean;
  defaultValues?: {
    name: string;
    course: string;
    endTime: string;
    startTime: string;
    instructorEmail: string;
    campus: string;
    session: string;
  };
};

export default function AddSchedule({
  toggle,
  visibility,
  defaultValues: defValues,
}: AddScheduleProps) {
  const { refetch } = useAllClasses();

  const defaultValues = defValues ?? {
    name: "",
    course: "",
    endTime: "",
    startTime: "",
    instructorEmail: "",
    campus: "Abuja",
    session: `${new Date().getFullYear()}/${new Date().getFullYear() + 1}`,
  };

  const { data: coursesData, isLoading: coursesLoading } = useAllCourses();
  const coursesOptions = coursesData?.nodes?.map((cours: any) => ({
    label: cours?.title,
    id: cours?.title,
  }));

  const { isLoading: usersLoading, data: usersData } = useAllUsers();
  const users = usersData?.users?.nodes;
  const instructorsOptions = users
    ?.filter((user: any) => user?.roles[0]?.name === userRoles.INSTRUCTOR)
    .map((u: any) => ({
      label: `${u?.firstName} ${u?.lastName}`,
      id: u?.email,
    }));

  const { data: sessionsData, isLoading: sessionsLoading } =
    useAcademicSessions();
  const { data: campusesData } = useCampuses();

  const campusOptions = campusesData?.nodes?.map((d: any) => d?.name);

  const { mutate, isLoading: isScheduling } = useScheduleClass();
  const { formData, updateForm, formIsValid, toggleError, formErrors } =
    useForm({
      initialState: defaultValues,
    });

  function onSubmit(e: FormEvent) {
    e?.preventDefault();

    formIsValid
      ? mutate(formData, {
          onSuccess: () => {
            toast.success(
              <ToastContent
                type={"success"}
                heading={"Success"}
                message={`Successfully created ${formData?.name}`}
              />,
              ToastContent.Config
            );
            refetch();
            toggle();
          },
          onError: (e: any) => {
            handleError(e, formData, toggleError);
          },
        })
      : alert("Please fill in all fields");
  }

  return (
    <div>
      <Modal centered isOpen={visibility} toggle={toggle} id="scheduleModal">
        <ModalHeader toggle={toggle}>Add Course</ModalHeader>
        <ModalBody>
          {sessionsLoading && <Spinner />}
          <form className="mt-3" onSubmit={onSubmit}>
            <FormInput
              label="name"
              placeholder="Name this schedule"
              onChange={(e) => updateForm("name", e?.target?.value)}
              value={formData?.name}
            />

            <div className="form-group">
              <label htmlFor="Search courses">Course</label>
              <Autocomplete
                fullWidth
                disablePortal
                id="Search courses"
                loading={coursesLoading}
                value={formData?.course}
                options={coursesOptions}
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

            {!!sessionsData && (
              <FormDropdown
                title="Session"
                options={sessionsData?.nodes?.map((sess: any) => ({
                  children: sess?.name,
                }))}
                onChange={(e) => updateForm("session", e.target.value)}
              />
            )}

            {campusOptions && (
              <FormDropdown
                onChange={(e) => {
                  updateForm("campus", e?.target?.value);
                }}
                options={campusOptions.map((o: any) => ({
                  children: o,
                }))}
                title={"Campus"}
              />
            )}

            <div className="form-group">
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
            </div>

            <FormInput
              label="Start Date"
              type={"date"}
              onChange={(e) =>
                updateForm(
                  "startTime",
                  new Date(e?.target?.value)?.toISOString()
                )
              }
            />
            <FormInput
              label="End Date"
              type={"date"}
              onChange={(e) =>
                updateForm("endTime", new Date(e?.target?.value)?.toISOString())
              }
            />

            {/* submit button */}
            {isScheduling ? (
              <Spinner />
            ) : (
              <button
                className="btn btn-blue-800 btn-lg w-100 my-5"
                type="submit"
              >
                {!!defValues ? "Modify Schedule" : "Create Schedule"}
              </button>
            )}
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
