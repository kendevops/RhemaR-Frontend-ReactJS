import { FormEvent } from "react";
import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import useForm from "../../utility/hooks/useForm";
import useCreateCampusTuition from "../../hooks/mutations/classes/useCreateCampusTuition";
import useUpdateCampusTuition from "../../hooks/mutations/classes/useUpdateCampusTuition";
import FormDropdown from "../molecules/FormDropdown";
import FormInput from "../molecules/FormInput";
import { toast } from "react-toastify";
import ToastContent from "../molecules/ToastContent";
import handleError from "../../utils/handleError";
import useAllCampuses from "../../hooks/queries/classes/useAllCampuses";
import FormDropdownSelectMultiple from "../molecules/FormDropdownSelectMultiple";
import { InstructorsData } from "../../data/InstructorsData";
import FormRadioGroup from "../molecules/FormRadioGroup";
import TextArea from "../molecules/TextArea";
import useCampusLevel from "../../hooks/queries/classes/useCampusLevel";
import useCreateCourse from "../../hooks/mutations/classes/useCreateCourse";
import useEditCourse from "../../hooks/mutations/classes/useEditCourse";
import useFileReader from "../../utility/hooks/useFileReader";
import useUploadFile from "../../hooks/mutations/classes/useUploadFile";

interface AddCoreCoursesModalProps {
  toggle: VoidFunction;
  visibility: boolean;
  defaultValues?: any;
  refetch?: any;
}

export default function AddCoreCourseModal({
  toggle,
  defaultValues,
  visibility,
  refetch,
}: AddCoreCoursesModalProps) {
  const isCreating = !defaultValues;

  const createCourse = useCreateCourse();

  const isLoading = createCourse.isLoading;

  const { isLoading: editIsLoading, mutate: mutateEdit } = useEditCourse(
    defaultValues?.id
  );

  // const updateTuition = useUpdateCampusTuition(id ?? "");

  const initialState = {
    level: "",
    name: "",
    type: "",
    code: "",
    desc: "",
    isActive: "",
    bannerUrl: "",
    totalHours: "",
    abbreviation: "",
    hasQuiz: "",
    hasListeningAssignment: "",
  };

  const { formData, formIsValid, updateForm, formErrors } = useForm<
    typeof initialState
  >({
    initialState: defaultValues ?? initialState,
    // optionalFields: ["discount"],
  });

  const defaultUrl =
    "https://rhema-course-uploads-bucket.s3.amazonaws.com/cf43584bf5034b24b9136b25394f51f8.png";

  const { data: levelData } = useCampusLevel();

  const levels = levelData?.map((v: any) => v.name);

  const { onChangeFile, file } = useFileReader({});

  function onSubmit(e: any) {
    e?.preventDefault();

    // updateForm("bannerUrl", e?.fileUrl ?? defaultUrl);

    const body = {
      ...formData,
      sections: [],
      materials: [],
      totalHours: +formData.totalHours,
    };

    console.log(formData, body);
    // formData.isActive = formData.isActive === "false" ? false : (true as any);

    /// Creating
    if (!defaultValues) {
      createCourse.mutate(body, {
        onSuccess: () => {
          toast.success(
            <ToastContent
              type={"success"}
              heading={"Successful"}
              message={"Course created successfully"}
            />,
            ToastContent.Config
          );
          refetch();
          toggle();
        },

        onError: (e: any) => {
          handleError(e);
          console.log(e);

          !isLoading && toggle();
        },
      });
      return;
    }

    // Modifying

    if (defaultValues) {
      mutateEdit(formData, {
        onSuccess: () => {
          toast.success(
            <ToastContent
              type={"success"}
              heading={"Successful"}
              message={"Course edited successfully"}
            />,
            ToastContent.Config
          );
          refetch();
          toggle();
        },

        onError: (e: any) => {
          console.log(e);
          handleError(e);

          !editIsLoading && toggle();
        },
      });

      return;
    }
    // if (!!defValues) return;
  }

  const uploadFile = useUploadFile({
    file: file!,
    onSuccess: onSubmit,
  });

  const loading = isLoading || uploadFile.isLoading;

  function handleSubmit() {
    // Upload files and get their urls first
    uploadFile.startUpload();
  }

  return (
    <Modal centered isOpen={visibility} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add New Course</ModalHeader>
      <ModalBody>
        <form onSubmit={() => {}}>
          <FormInput
            label="Name of Course"
            placeholder="Course Name"
            onChange={(e) => updateForm("name", e?.target?.value)}
            value={formData?.name}
          />
          <FormInput
            label=" Course code"
            placeholder="Course code"
            onChange={(e) => updateForm("code", e?.target?.value)}
            value={formData?.code}
          />

          <FormInput
            label=" Course abbreviation"
            placeholder="Course abbreviation"
            onChange={(e) => updateForm("abbreviation", e?.target?.value)}
            value={formData?.abbreviation}
          />

          <FormDropdown
            title="Level"
            value={formData?.level}
            options={levels?.map((d: any) => ({ children: d }))}
            // options={["Level 1", "Level 2"].map((d: any) => ({ children: d }))}
            onChange={(e) => updateForm("level", e?.target?.value)}
            disabled={!isCreating}
          />

          <FormDropdown
            title="Course Elective"
            value={formData?.type}
            options={["CORE", "ELETIVE"].map((d: any) => ({ children: d }))}
            onChange={(e) => updateForm("type", e?.target?.value)}
            disabled={!isCreating}
          />
          <TextArea
            label="Description"
            value={formData?.desc}
            onChange={(e: { target: { value: any } }) =>
              updateForm("desc", e.target.value)
            }
            placeholder="Enter Description"
          />

          <FormInput
            label="Course Hours"
            placeholder="Course Hours"
            onChange={(e) => updateForm("totalHours", e?.target?.value)}
            value={formData?.totalHours}
          />
          <FormRadioGroup
            label="Is an Active course?"
            options={["Yes", "No"]}
            onChange={(e) =>
              updateForm("isActive", !!(e.target.value === "Yes"))
            }
          />
          <FormRadioGroup
            label="Course has quiz?"
            options={["Yes", "No"]}
            onChange={(e) =>
              updateForm("hasQuiz", !!(e.target.value === "Yes"))
            }
          />
          <FormRadioGroup
            label="Course has Listening Assignment?"
            options={["Yes", "No"]}
            onChange={(e) =>
              updateForm("hasListeningAssignment", !!(e.target.value === "Yes"))
            }
          />

          {/* <FormInput
            label="Banner Url (1200px by 200px)"
            type={"file"}
            onChange={onChangeFile}
          /> */}
          {loading ? (
            <Spinner />
          ) : (
            <button
              className="btn btn-blue-800 btn-lg w-100 my-5"
              type="button"
              onClick={onSubmit}
              // onClick={handleSubmit}
            >
              {defaultValues ? "Edit Course" : "Add Course"}
            </button>
          )}
        </form>
      </ModalBody>
    </Modal>
  );
}
