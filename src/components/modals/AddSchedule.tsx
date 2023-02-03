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

type AddScheduleProps = {
  toggle: VoidFunction;
  visibility: boolean;
  defaultValues?: any;
};

export default function AddSchedule({
  toggle,
  visibility,
  defaultValues: defValues,
}: AddScheduleProps) {
  const defaultValues = defValues ?? {
    name: "",
    course: "",
    endTime: "",
    startTime: "",
    instructorEmail: "",
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

  const { mutate, isLoading: isScheduling } = useScheduleClass();
  const { formData, updateForm, formIsValid } = useForm({
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

            toggle();
          },
          onError: (e: any) => {
            toast.error(
              <ToastContent
                type={"error"}
                heading={"An Error Occurred"}
                message={e?.response?.data?.error?.message?.toString()}
              />,
              ToastContent.Config
            );

            console.log({ e, formData });
          },
        })
      : alert("Please fill in all fields");
  }

  return (
    <div>
      <Modal centered isOpen={visibility} toggle={toggle} id="scheduleModal">
        <ModalHeader toggle={toggle}>Add Course</ModalHeader>
        <ModalBody>
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
