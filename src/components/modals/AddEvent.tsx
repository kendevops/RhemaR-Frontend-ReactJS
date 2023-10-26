import { FormEvent, useEffect, useState } from "react";
import { Input, Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import useForm from "../../utility/hooks/useForm";
import FormInput from "../molecules/FormInput";
import CardWrapper from "../students/CardWrapper";
import useFileReader from "../../utility/hooks/useFileReader";
import FileTypeIcon from "../atoms/FIleTypeIcon";
import useUploadFile from "../../hooks/mutations/classes/useUploadFile";

type AddEventModalProps = {
  isOpen: boolean;
  toggle: VoidFunction;
  defaultValues?: any;
  onCreate: (data: any) => void;
  isLoading?: boolean;
};

type FileType = {
  size: number;
  path: string;
  name: string;
  type: string;
};

export default function AddEvent({
  defaultValues,
  isOpen,
  onCreate,
  toggle,
  isLoading,
}: AddEventModalProps) {
  const { formData, updateForm, formErrors } = useForm({
    initialState: {
      name: defaultValues?.name ?? "",
      desc: defaultValues?.desc ?? "",
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      //   time: "",
    },
  });

  const [materials, setMaterials] = useState<any[]>(
    defaultValues?.materials ?? []
  );
  const [audio, setAudio] = useState<any[]>(defaultValues?.audio ?? []);
  const [video, setVideo] = useState<any[]>(defaultValues?.video ?? []);

  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingMaterial, setUploadingMaterial] = useState(false);

  function handleAdd(type: "material" | "video", file: FileType) {
    if (type === "material") {
      setMaterials((p) => {
        return [...p, file];
      });
    }

    if (type === "video") {
      setVideo((p) => {
        return [...p, file];
      });
    }
  }

  const { file, onChangeFile } = useFileReader();

  const {
    onChangeFile: onChangeMaterial,
    status: materialStatus,
    file: materialFile,
  } = useFileReader();

  const uploadMaterial = useUploadFile({
    file: materialFile!,
    onSuccess: (d) => {
      console.log({ d });
      handleAdd("material", {
        name: materialFile?.name ?? Date?.now?.toString(),
        path: d?.fileUrl,
        size: materialFile?.size ?? 1024,
        type: materialFile?.type ?? "unknown",
      });
    },
  });

  const {
    onChangeFile: onChangeVideo,
    status: videoStatus,
    file: videoFile,
  } = useFileReader();

  const uploadVideo = useUploadFile({
    file: videoFile!,
    onSuccess: (d) => {
      console.log({ d });
      handleAdd("video", {
        name: videoFile?.name ?? Date?.now?.toString(),
        path: d?.fileUrl,
        size: videoFile?.size ?? 1024,
        type: videoFile?.type ?? "unknown",
      });
    },
  });

  useEffect(() => {
    if (uploadingVideo) {
      uploadVideo.startUpload();
      setUploadingVideo(false);
    }

    if (uploadingMaterial) {
      uploadMaterial.startUpload();
      setUploadingMaterial(false);
    }
  }, [uploadingVideo, uploadingMaterial]);

  function handleDelete(
    type: "material" | "assignment" | "audio",
    index: number
  ) {
    if (type === "audio") {
      setAudio((p) => {
        return [...p?.filter((_, i) => i !== index)];
      });
    }
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    onCreate({
      ...formData,
      video,
      materials,
    });
    // toggle();
  }

  return (
    <>
      <Modal
        centered
        {...{ isOpen, toggle }}
        // fullscreen
        id="AddEventModal"
      >
        <ModalHeader toggle={toggle}>
          {!!defaultValues ? "Modify Event" : "Create Event"}
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormInput
              label="Event Name"
              onChange={(e) => updateForm("name", e?.target?.value)}
              placeholder={defaultValues?.name}
              value={formData?.name}
              required
            />
            <FormInput
              label="Description"
              onChange={(e) => updateForm("desc", e?.target?.value)}
              placeholder={defaultValues?.desc}
              value={formData?.desc}
              required
            />

            <FormInput
              label="Start Date"
              type={"datetime-local"}
              hasErrors={formErrors.startTime}
              onChange={(e) =>
                updateForm(
                  "startTime",
                  new Date(e?.target?.value)?.toISOString()
                )
              }
            />
            <FormInput
              label="End Date"
              type={"datetime-local"}
              hasErrors={formErrors.endTime}
              onChange={(e) =>
                updateForm("endTime", new Date(e?.target?.value)?.toISOString())
              }
            />

            <FormInput
              label="Upload Video"
              type={"file"}
              // onChange={onChangeFile}
              onChange={(e) => {
                onChangeVideo(e);
                setUploadingVideo(true);
              }}
            />
            {uploadVideo.isLoading && <Spinner />}

            <FormInput
              label="Upload Material"
              type={"file"}
              onChange={(e) => {
                onChangeMaterial(e);
                // uploadMaterial.startUpload();
                setUploadingMaterial(true);
              }}
            />
            {uploadMaterial.isLoading && <Spinner />}

            {isLoading ? (
              <Spinner />
            ) : (
              <button type="submit" className="btn btn-lg  btn-blue-800">
                {!!defaultValues ? "Modify Event" : "Create Event"}
              </button>
            )}
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}
