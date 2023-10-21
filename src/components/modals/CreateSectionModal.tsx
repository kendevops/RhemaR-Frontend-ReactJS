import { FormEvent, useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import useForm from "../../utility/hooks/useForm";
import FormInput from "../molecules/FormInput";
import CardWrapper from "../students/CardWrapper";
import useFileReader from "../../utility/hooks/useFileReader";
import FileTypeIcon from "../atoms/FIleTypeIcon";
import useUploadFile from "../../hooks/mutations/classes/useUploadFile";
import FormRadioGroup from "../molecules/FormRadioGroup";
import useCreateCourseSection from "../../hooks/mutations/classes/useCreateCourseSection";

type CreateSectionModalProps = {
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

export default function CreateSectionModal({
  defaultValues,
  isOpen,
  onCreate,
  toggle,
  isLoading,
}: CreateSectionModalProps) {
  const { formData, updateForm } = useForm({
    initialState: {
      name: defaultValues?.name ?? "",
      overview: defaultValues?.overview ?? "",
      type: defaultValues?.type ?? "",
      // videoUrl: defaultValues?.videoUrl ?? "",
    },
  });

  const [materials, setMaterials] = useState<any[]>(
    defaultValues?.materials ?? []
  );
  const [audio, setAudio] = useState<any[]>(defaultValues?.audio ?? []);
  const [video, setVideo] = useState<any[]>(defaultValues?.video ?? []);

  const [assignments, setAssignments] = useState<any[]>(
    defaultValues?.assignments ?? []
  );

  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingAudio, setUploadingAudio] = useState(false);

  function handleAdd(type: "audio" | "video", file: FileType) {
    if (type === "audio") {
      setAudio((p) => {
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
    onChangeFile: onChangeAudio,
    status: audioStatus,
    file: audioFile,
  } = useFileReader();

  const uploadAudio = useUploadFile({
    file: audioFile!,
    onSuccess: (d) => {
      console.log({ d });
      handleAdd("audio", {
        name: audioFile?.name ?? Date?.now?.toString(),
        path: d?.fileUrl,
        size: audioFile?.size ?? 1024,
        type: audioFile?.type ?? "unknown",
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

    if (uploadingAudio) {
      uploadAudio.startUpload();
      setUploadingAudio(false);
    }
  }, [uploadingVideo, uploadingAudio]);

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
      audio,
    });
    // toggle();
  }

  return (
    <>
      <Modal
        centered
        {...{ isOpen, toggle }}
        // fullscreen
        id="createSectionModal"
      >
        <ModalHeader toggle={toggle}>
          {!!defaultValues ? "Modify Section" : "Create Section"}
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormInput
              label="Section Name"
              onChange={(e) => updateForm("name", e?.target?.value)}
              placeholder={defaultValues?.name}
              required
            />
            <FormInput
              label="Overview"
              onChange={(e) => updateForm("overview", e?.target?.value)}
              placeholder={defaultValues?.overview}
              required
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
              label="Upload Audio"
              type={"file"}
              onChange={(e) => {
                onChangeAudio(e);
                // uploadAudio.startUpload();
                setUploadingAudio(true);
              }}
            />
            {uploadAudio.isLoading && <Spinner />}

            {/* Course Materials */}
            {/* <CardWrapper className="bg-5 ">
              <div className="d-flex justify-content-between mb-4">
                <h1>Course Audio ({materials?.length?.toString()})</h1>
                <div>
                  <label htmlFor="Upload">
                    <u>Upload</u>
                  </label>
                  <input
                    onChange={(e) => {
                      onChangeAudio(e);
                      if (audioStatus?.success) {
                        uploadAudio.startUpload();
                      }
                    }}
                    id="Upload"
                    type={"file"}
                    hidden
                  />
                  {uploadMaterial.isLoading && <Spinner />}
                </div>
              </div>

              <ul className="no-padding-left">
                {audio?.map((d: any, i) => {
                  return (
                    <li
                      className="d-flex justify-content-between"
                      key={i?.toString()}
                    >
                      <div className="d-flex gap-3">
                        <FileTypeIcon
                          {...{ path: d?.path, name: d?.name, type: d?.type }}
                        />
                        <p>{d?.name}</p>
                      </div>

                      <u
                        onClick={() => {
                          handleDelete(
                            "audio",
                            audio?.findIndex((v) => v === d)
                          );
                        }}
                      >
                        Delete
                      </u>
                    </li>
                  );
                })}
              </ul>
            </CardWrapper> */}

            {isLoading ? (
              <Spinner />
            ) : (
              <button type="submit" className="btn btn-lg  btn-blue-800">
                {!!defaultValues ? "Modify Section" : "Create Section"}
              </button>
            )}
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}
