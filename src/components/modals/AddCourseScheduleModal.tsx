import { FormEvent } from "react";
import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import useForm from "../../utility/hooks/useForm";
import FormDropdown from "../molecules/FormDropdown";
import { levels } from "../../data/Levels";
import FormInput from "../molecules/FormInput";
import { Autocomplete, TextField } from "@mui/material";
import { toast } from "react-toastify";
import ToastContent from "../molecules/ToastContent";
import handleError from "../../utils/handleError";
import useAllCampuses from "../../hooks/queries/classes/useAllCampuses";
import FormDropdownSelectMultiple from "../molecules/FormDropdownSelectMultiple";
import { InstructorsData } from "../../data/InstructorsData";
import useAllCourses from "../../hooks/queries/classes/useAllCourses";
import useAllUsers from "../../hooks/queries/useAllUsers";
import userRoles from "../../utility/userRoles";
import useAcademicSessions from "../../hooks/queries/classes/useAcademicSessions";
import useCreateClassSchedule from "../../hooks/mutations/classes/useCreateClassSchedule";
import useUpdateClassSchedule from "../../hooks/mutations/classes/useUpdateClassSchedule";

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
  const createClassSchedule = useCreateClassSchedule();
  const updateClassSchedule = useUpdateClassSchedule(defaultValues?.id);

  const isLoading =
    createClassSchedule.isLoading || updateClassSchedule.isLoading;

  const initialState = {
    type: "",
    name: "",
    campusId: "",
    courseId: "",
    sessionId: "",
    onlineInstructorId: "",
    onsiteInstructorId: "",
    onlineEndDateTime: "",
    onsiteEndDateTime: "",
    onlineStartDateTime: "",
    onsiteStartDateTime: "",
  };

  const { formData, formIsValid, updateForm, formErrors } = useForm<
    typeof initialState
  >({
    initialState: defaultValues ?? initialState,
    // optionalFields: ["discount"],
  });

  const campusOptions = campusesData?.map((cours: any) => ({
    label: cours?.name,
    id: cours?.id,
  }));

  const { data: coursesData, isLoading: coursesLoading } = useAllCourses();
  const coursesOptions = coursesData?.nodes?.map((cours: any) => ({
    label: cours?.name,
    id: cours?.id,
  }));

  const { data: sessionsData, isLoading: sessionsLoading } =
    useAcademicSessions();

  const sessionOptions = sessionsData?.nodes?.map((session: any) => ({
    label: session?.name,
    id: session?.id,
  }));

  console.log(campusesData, campusOptions, sessionsData, sessionOptions);

  const { isLoading: usersLoading, data: usersData } = useAllUsers();
  const users = usersData?.users?.nodes;

  const instructorsOptions = users
    ?.filter(
      (user: any) => user?.roles[0]?.name === userRoles.INSTRUCTORS_ADMIN
    )
    .map((u: any) => ({
      label: `${u?.firstName} ${u?.lastName}`,
      id: u?.id,
    }));

  // console.log(instructorsOptions, users);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const { ...otherData } = formData;

    if (formIsValid) {
      isCreating
        ? createClassSchedule.mutate(formData, {
            onSuccess: () => {
              toast.success(
                <ToastContent
                  type={"success"}
                  heading={"Success"}
                  message={`Successfully created class schedule`}
                />,
                ToastContent.Config
              );
              !!onCreate && onCreate();
              toggle();
            },
            onError: (e: any) => {
              console.log(e);

              handleError(e, formData);
            },
          })
        : updateClassSchedule.mutate(otherData, {
            onSuccess: () => {
              toast.success(
                <ToastContent
                  type={"success"}
                  heading={"Success"}
                  message={`Successfully updated class schedule`}
                />,
                ToastContent.Config
              );
              !!onCreate && onCreate();
              toggle();
            },
            onError: (e: any) => {
              console.log(e);

              handleError(e, formData);
            },
          });
    } else {
      alert("Please fill in all fields");
      console.log(formData);
    }
  }

  return (
    <Modal centered isOpen={visibility} scrollable toggle={toggle}>
      <ModalHeader toggle={toggle}>
        {!defaultValues ? "Add New Class Schedule" : "Udate Class Schedule"}
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <FormDropdown
            title="Type"
            value={formData?.type}
            options={[
              "LAGOS_WEEK_DAY",
              "ABUJA_WEEKEND",
              "LAGOS_WEEKEND",
              "ABUJA_NIGHT",
              "WEEKEND",
              "NIGHT",
              "MAIN",
              "DAY",
            ].map((d: any) => ({
              children: d,
            }))}
            onChange={(e) => updateForm("type", e?.target?.value)}
            disabled={!isCreating}
          />

          <FormInput
            label="Name"
            value={formData.name}
            onChange={(e) => updateForm("name", e?.target?.value)}
          />

          <div className="form-group">
            <label htmlFor="Search campuses">Campus ID</label>
            <Autocomplete
              fullWidth
              disablePortal
              id="Search campuses"
              loading={coursesLoading}
              value={formData?.campusId}
              options={campusOptions}
              // options={["temp", "temp2"]}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    placeholder="Search campuses"
                    className="form-control "
                  />
                );
              }}
              onChange={(e, value: any) => {
                updateForm("campusId", value?.id);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Search courses">Course ID</label>
            <Autocomplete
              fullWidth
              disablePortal
              id="Search courses"
              loading={coursesLoading}
              value={formData?.courseId}
              options={coursesOptions}
              // options={["temp", "temp2"]}
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
                updateForm("courseId", value?.id);
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="Search Session">Session ID</label>
            <Autocomplete
              fullWidth
              disablePortal
              id="Search Session"
              loading={sessionsLoading}
              value={formData?.sessionId}
              options={sessionOptions}
              // options={["temp", "temp2"]}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    placeholder="Search Session"
                    className="form-control "
                  />
                );
              }}
              onChange={(e, value: any) => {
                updateForm("sessionId", value?.id);
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="Search instructors">Online Instructor ID</label>
            <Autocomplete
              fullWidth
              disablePortal
              id="Search instructors"
              value={formData?.onlineInstructorId}
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
                updateForm("onlineInstructorId", value?.id);
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="Search instructors">Onsite Instructor ID</label>
            <Autocomplete
              fullWidth
              disablePortal
              id="Search instructors"
              value={formData?.onsiteInstructorId}
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
                updateForm("onsiteInstructorId", value?.id);
              }}
            />
          </div>
          <FormInput
            label="Online Start Date Time"
            type={"date"}
            onChange={(e) =>
              updateForm(
                "onlineStartDateTime",
                new Date(e?.target?.value)?.toISOString()
              )
            }
          />
          <FormInput
            label="Online End Date Time"
            type={"date"}
            onChange={(e) =>
              updateForm(
                "onlineEndDateTime",
                new Date(e?.target?.value)?.toISOString()
              )
            }
          />
          <FormInput
            label="Onsite Start Date Time"
            type={"date"}
            onChange={(e) =>
              updateForm(
                "onsiteStartDateTime",
                new Date(e?.target?.value)?.toISOString()
              )
            }
          />
          <FormInput
            label="Onsite Start Date Time"
            type={"date"}
            onChange={(e) =>
              updateForm(
                "onsiteEndDateTime",
                new Date(e?.target?.value)?.toISOString()
              )
            }
          />

          {isLoading ? (
            <Spinner />
          ) : (
            <button
              className="btn btn-blue-800 btn-lg w-100 my-5"
              type="submit"
            >
              {!defaultValues ? "Add Class Schedule" : "Update Class Schedule"}
            </button>
          )}
        </form>
      </ModalBody>
    </Modal>
  );
}
