import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import useForm from "../../utility/hooks/useForm";
import { FormEvent, useCallback } from "react";
import useAssignRole from "../../hooks/mutations/roles/useAssignRole";
import { Autocomplete, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import ToastContent from "../molecules/ToastContent";
import handleError from "../../utils/handleError";
import FormInput from "../molecules/FormInput";
import { FaCloudUploadAlt } from "react-icons/fa";

type UploadBulkCourseScheduleModalProps = {
  isOpen: boolean;
  toggle: VoidFunction;
};

export default function UploadBulkCourseModal({
  isOpen,
  toggle,
}: UploadBulkCourseScheduleModalProps) {
  const { mutate, isLoading } = useAssignRole();

  const { formData, formErrors, formIsValid, toggleError, updateForm } =
    useForm({
      initialState: {
        csv: "",
      },
    });

  const onDrop = useCallback((acceptedFiles) => {
    // Handle the dropped files here, e.g., update your form data with the file(s).
    formData.csv = acceptedFiles;

    updateForm("csv", acceptedFiles);
    console.log(acceptedFiles, formData.csv);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!formIsValid) {
      alert("Please fill in all fields");
      return;
    }

    // mutate([formData], {
    //   onSuccess: (d) => {
    //     toast.success(
    //       <ToastContent
    //         type={"success"}
    //         heading={"Success"}
    //         message={`Successfully assigned ${formData.video} to ${formData.session}`}
    //       />,
    //       ToastContent.Config
    //     );
    //     toggle();
    //   },
    //   onError: (e: any) => handleError(e, formData, toggleError),
    // });
  }

  return (
    <Modal centered {...{ isOpen, toggle }}>
      <ModalHeader toggle={toggle}>
        Bulk Upload Core Courses{" "}
        <span className="d-block fw-semibold text-xl">Course Name</span>
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          {/* <label>File (Drag and drop, or click to select)</label> */}

          <div
            {...getRootProps()}
            className="p-4 d-flex align-items-center justify-content-center flex-column gap-3"
            style={{ height: "200px", width: "100%", background: "#f0f0f0" }}
          >
            <input {...getInputProps()} />
            <FaCloudUploadAlt style={{ fontSize: "80px" }} />
            {/* <p className="text-2xl">PDF file</p> */}
          </div>

          {isLoading ? (
            <Spinner />
          ) : (
            <button
              className="btn btn-blue-800 btn-lg w-100 my-5 "
              type="submit"
            >
              Upload Record
            </button>
          )}
        </form>
      </ModalBody>
    </Modal>
  );
}
