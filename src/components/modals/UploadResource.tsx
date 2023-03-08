import useId from "@mui/material/utils/useId";
import { FormEvent } from "react";
import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import useFileReader from "../../utility/hooks/useFileReader";
import useForm from "../../utility/hooks/useForm";
import FormInput from "../molecules/FormInput";
import getFileFormat from "../../utils/getFileFormat";
import useUploadFile from "../../hooks/mutations/classes/useUploadFile";

type UploadResourceModalProps = {
  toggle: VoidFunction;
  isOpen: boolean;
};

export default function UploadResourceModal({
  isOpen,
  toggle,
}: UploadResourceModalProps) {
  const initialState = {
    title: "",
  };
  const { formData, updateForm, formIsValid } = useForm({
    initialState,
  });
  const inputId = useId();
  const { img: resource, onChangeFile, status, file } = useFileReader();

  function handleSubmit(e: any) {
    console.log(e);

    //mutate to the resource endpoint
    // toggle();
  }

  const { isLoading, startUpload } = useUploadFile({
    file: resource,
    format: getFileFormat(file?.name),
    onSuccess: handleSubmit,
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const hasResource = !!file;

    if (!formIsValid || !hasResource) {
      alert("Please fill in all fields");
      return;
    }

    // Upload file
    startUpload();
  }

  return (
    <Modal centered {...{ isOpen, toggle }} id="uploadResourceModal">
      <ModalHeader toggle={toggle}>Upload Material</ModalHeader>
      <ModalBody>
        <form {...{ onSubmit }}>
          <FormInput
            label="Title"
            onChange={(e) => updateForm("title", e.target.value)}
          />

          <div className="border-1 p-4 w-100 mb-5">
            <label className="fw-bold " htmlFor={inputId}>
              Browse Files
            </label>
            <input id={inputId} type={"file"} onChange={onChangeFile} />
          </div>

          {isLoading ? (
            <Spinner />
          ) : (
            <button className="btn btn-blue-800 btn-lg w-100" type="submit">
              Upload Material
            </button>
          )}
        </form>
      </ModalBody>
    </Modal>
  );
}
