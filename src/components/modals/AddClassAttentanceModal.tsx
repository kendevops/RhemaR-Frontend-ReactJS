import { FormEvent, useState } from "react";
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
import useAllClasses from "../../hooks/queries/classes/useAllClasses";
import { UserDto } from "../../types/dto";
import useCreateClassAttendance from "../../hooks/mutations/classes/useAddClassAttandance";
import useUpdateClassAttandance from "../../hooks/mutations/classes/useUpdateClassAttandance";

type FiltersProps = {
  classId?: string;
  attendanceMethod?: string;
  userId?: string;
  sectionId?: string;
  session?: string;
};

interface AddClassAttendanceModalProps {
  toggle: VoidFunction;
  visibility: boolean;
  defaultValues?: any;
  onCreate?: VoidFunction;
}

export default function AddClassAttendanceModal({
  toggle,
  defaultValues,
  visibility,
  onCreate,
}: AddClassAttendanceModalProps) {
  const isCreating = !defaultValues;

  const [filters, setFilters] = useState<FiltersProps>({});
  const [sectionIdValues, setSectionIdValues] = useState<any>([]);

  const {
    data: classesData,
    isLoading: classesLoading,
    refetch,
  } = useAllClasses(filters);

  const classes = classesData?.nodes;

  const { data: usersData, isLoading: usersLoading } = useAllUsers();
  const createClassAttendance = useCreateClassAttendance();
  const updateClassAttendance = useUpdateClassAttandance(defaultValues?.id);

  const isLoading =
    createClassAttendance.isLoading || updateClassAttendance.isLoading;

  const initialState = {
    leftAt: "",
    joinedAt: "",
    userId: "",
    userName: "",
    classId: "",
    className: "",
    attendanceMethod: "",
    // sectionsLeftAt: "",
    // sectionsJoinedAt: "",
    watchTime: "",
    // sectionId: "",
    sectionName: "",
    sectionIds: [],
  };

  const { formData, formIsValid, updateForm, formErrors } = useForm<
    typeof initialState
  >({
    initialState: defaultValues ?? initialState,
    // optionalFields: ["discount"],
  });

  const users: UserDto[] = usersData?.users?.nodes?.filter((u: any) => {
    return u?.roles
      ?.map((r: any) => r?.name)
      .some((n: any) => n?.includes("STUDENT"));
  });

  const userOptions = users?.map((u) => ({
    label: `${u?.firstName} ${u?.lastName}`,
    id: u?.id,
  }));

  const classOptions = classes?.map((c: any) => ({
    label: c?.name,
    id: c?.id,
  }));

  const sectionOptions = classes
    ?.filter((cls: any) => cls?.name === formData?.className)
    ?.map((cor: any) =>
      cor?.course?.sections?.map((c: any) => ({
        name: c?.name,
        id: c?.id,
      }))
    );

  const flattenedSectionOptions = sectionOptions
    ? []?.concat(...sectionOptions)
    : [];

  console.log(sectionIdValues);

  const sectionIdsObject = sectionIdValues?.map((item: any) => ({
    sectionId: item,
  }));
  console.log(sectionIdsObject);

  console.log(flattenedSectionOptions);
  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const {
      // sectionsLeftAt,
      // sectionsJoinedAt,
      // sectionId,
      watchTime,
      ...otherData
    } = formData;

    const body = {
      ...formData,
      sectionsAttendances: sectionIdsObject,
      // [
      //   {
      //     // leftAt: sectionsLeftAt,
      //     // joinedAt: sectionsJoinedAt,
      //     // watchTime: +watchTime,
      //     sectionId: sectionId,
      //   },
      //   // sectionIdsObject,
      // ],
    };

    if (formIsValid) {
      isCreating
        ? createClassAttendance.mutate(body, {
            onSuccess: () => {
              toast.success(
                <ToastContent
                  type={"success"}
                  heading={"Success"}
                  message={`Successfully created class Attendance`}
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
        : updateClassAttendance.mutate(body, {
            onSuccess: () => {
              toast.success(
                <ToastContent
                  type={"success"}
                  heading={"Success"}
                  message={`Successfully updated class Attendance`}
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
        {!defaultValues ? "Add New Class Attendance" : "Udate Class Attendance"}
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <FormDropdown
            title="Attendance Method"
            value={formData?.attendanceMethod}
            options={["ONLINE", "ONSITE"].map((d: any) => ({
              children: d,
            }))}
            onChange={(e) => updateForm("attendanceMethod", e?.target?.value)}
            disabled={!isCreating}
          />
          <div className="form-group">
            <label htmlFor="Search User">User ID</label>
            <Autocomplete
              fullWidth
              disablePortal
              id="Search User"
              loading={classesLoading}
              value={formData?.userName as any}
              options={userOptions}
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
                updateForm("userName", value?.label);
                updateForm("userId", value?.id);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Search class">Class ID</label>
            <Autocomplete
              fullWidth
              disablePortal
              id="Search class"
              loading={classesLoading}
              value={formData?.className}
              options={classOptions}
              // options={["temp", "temp2"]}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    placeholder="Search class"
                    className="form-control "
                  />
                );
              }}
              onChange={(e, value: any) => {
                updateForm("className", value?.label);
                updateForm("classId", value?.id);
              }}
            />
          </div>

          {/* <div className="form-group">
            <label htmlFor="Search section">Section ID</label>
            <Autocomplete
              fullWidth
              disablePortal
              id="Search section"
              loading={classesLoading}
              value={formData?.sectionName}
              options={flattenedSectionOptions}
              // options={["temp", "temp2"]}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    placeholder="Search section"
                    className="form-control "
                  />
                );
              }}
              onChange={(e, value: any) => {
                updateForm("sectionName", value?.label);
                updateForm("sectionId", value?.id);
              }}
            />
          </div> */}

          <FormDropdownSelectMultiple
            title="Sectiion Ids"
            // value={formData?.levels}
            onChange={(e) => updateForm("sectionIds", e.target.value)}
            options={flattenedSectionOptions?.map((v: any) => v)}
            setIdVales={setSectionIdValues}
            disabled={!isCreating}
          />

          <FormInput
            label="Joined class at"
            type={"date"}
            onChange={(e) =>
              updateForm("joinedAt", new Date(e?.target?.value)?.toISOString())
            }
          />
          <FormInput
            label="Left class at"
            type={"date"}
            onChange={(e) =>
              updateForm("leftAt", new Date(e?.target?.value)?.toISOString())
            }
          />
          {/* <FormInput
            label="Joined section at"
            type={"date"}
            onChange={(e) =>
              updateForm(
                "sectionsJoinedAt",
                new Date(e?.target?.value)?.toISOString()
              )
            }
          /> */}

          {/* <FormInput
            label="Left section at"
            type={"date"}
            onChange={(e) =>
              updateForm(
                "sectionsLeftAt",
                new Date(e?.target?.value)?.toISOString()
              )
            }
          /> */}

          {isLoading ? (
            <Spinner />
          ) : (
            <button
              className="btn btn-blue-800 btn-lg w-100 my-5"
              type="submit"
            >
              {!defaultValues
                ? "Add Class Attendance"
                : "Update Class Attendance"}
            </button>
          )}
        </form>
      </ModalBody>
    </Modal>
  );
}
