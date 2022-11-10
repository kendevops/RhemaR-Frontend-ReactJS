import useId from "@mui/material/utils/useId";
import { FormEvent } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import useFileReader from "../../utility/hooks/useFileReader";
import useForm from "../../utility/hooks/useForm";
import FormInput from "../molecules/FormInput";

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
    file: "",
  };
  const { formData, updateForm } = useForm({
    initialState,
  });
  const inputId = useId();
  const { img: file, onChangeFile, status } = useFileReader();

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    console.log("File", file);

    toggle();
  }

  return (
    <Modal centered {...{ isOpen, toggle }} id="uploadResourceModal">
      <ModalHeader toggle={toggle}>Upload Material</ModalHeader>
      <ModalBody>
        <form {...{ onSubmit }}>
          <FormInput label="title" />

          <div className="border-1 p-4 w-100 mb-5">
            <p>
              Drag and drop file <br /> or{" "}
            </p>

            <label className="fw-bold " htmlFor={inputId}>
              Browse Files
            </label>
            <input id={inputId} type={"file"} onChange={onChangeFile} />
          </div>

          <button className="btn btn-blue-800 btn-lg w-100" type="submit">
            Upload Material
          </button>
        </form>
      </ModalBody>
    </Modal>
  );
}
