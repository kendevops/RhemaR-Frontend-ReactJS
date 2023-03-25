import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import useSubmitProject from "../../hooks/mutations/classes/useSubmitProject";
import { FormEvent } from "react";
import useFileReader from "../../utility/hooks/useFileReader";
import useUploadFile from "../../hooks/mutations/classes/useUploadFile";
import useForm from "../../utility/hooks/useForm";
import { Autocomplete, TextField } from "@mui/material";
import useAllCourses from "../../hooks/queries/classes/useAllCourses";
import TextArea from "../molecules/TextArea";
import handleError from "../../utils/handleError";
import FormInput from "../molecules/FormInput";

interface props {
  toggle: VoidFunction;
  isOpen: boolean;
}

export default function SubmitProjectModal({ isOpen, toggle }: props) {
  const { mutate, isLoading } = useSubmitProject();

  const initialState = {
    courseId: "",
    desc: "",
  };

  const { data: coursesData, isLoading: coursesLoading } = useAllCourses();
  const coursesOptions = coursesData?.nodes?.map((cours: any) => ({
    label: cours?.title,
    id: cours?.id,
  }));

  const { formData, formErrors, formIsValid, toggleError, updateForm } =
    useForm({
      initialState,
    });

  function submitForm(files?: any) {
    mutate(
      {
        courseId: formData.courseId,
        desc: formData.desc,
        files,
      },
      {
        onSuccess: () => {
          alert("Submitted");
          isOpen && toggle();
        },
        onError: (e) => handleError(e, formData, toggleError),
      }
    );
  }

  const { file, onChangeFile } = useFileReader();
  const { startUpload, isLoading: isUploading } = useUploadFile({
    file: file!,
    onSuccess: (d) => {
      const uploaded = {
        path: d?.fileUrl,
        name: file?.name,
        type: file?.type,
        size: file?.size,
      };

      submitForm([uploaded]);
    },
  });

  const loading = isLoading || isUploading;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!!file) {
      startUpload();
    } else {
      submitForm();
    }
  }

  return (
    <Modal centered {...{ isOpen, toggle }}>
      <ModalHeader toggle={toggle}>Submit Project</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="Search courses">Course</label>
            <Autocomplete
              fullWidth
              disablePortal
              id="Search courses"
              loading={coursesLoading}
              options={coursesOptions}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    placeholder="Search courses"
                    className="form-control "
                    error={formErrors?.courseId}
                  />
                );
              }}
              onChange={(e, value: any) => {
                updateForm("courseId", value?.id);
              }}
            />
          </div>

          <TextArea
            value={formData.desc}
            placeholder="Description"
            onChange={(e) => updateForm("desc", e?.target?.value)}
          />

          <FormInput label="Add file" type="file" onChange={onChangeFile} />

          {/* Submit */}
          {loading ? (
            <Spinner />
          ) : (
            <button type="submit" className="btn btn-lg  btn-blue-800">
              Submit
            </button>
          )}
        </form>
      </ModalBody>
    </Modal>
  );
}
