import { FormEvent, useState } from "react";
import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import useForm from "../../utility/hooks/useForm";
import FormInput from "../molecules/FormInput";
import CardWrapper from "../students/CardWrapper";
import useFileReader from "../../utility/hooks/useFileReader";
import FileTypeIcon from "../atoms/FIleTypeIcon";
import useUploadFile from "../../hooks/mutations/classes/useUploadFile";

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
      videoUrl: defaultValues?.videoUrl ?? "",
    },
  });
  const [materials, setMaterials] = useState<any[]>(
    defaultValues?.materials ?? []
  );
  const [assignments, setAssignments] = useState<any[]>(
    defaultValues?.assignments ?? []
  );

  function handleAdd(type: "material" | "assignment", file: FileType) {
    if (type === "material") {
      setMaterials((p) => {
        return [...p, file];
      });
    }
    if (type === "assignment") {
      setAssignments((p) => {
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
    onChangeFile: onChangeAssignment,
    status: assignmentStatus,
    file: assignmentFile,
  } = useFileReader();

  const UploadAssignment = useUploadFile({
    file: assignmentFile!,
    onSuccess: (d) => {
      console.log({ d });
      handleAdd("assignment", {
        name: assignmentFile?.name ?? Date?.now?.toString(),
        path: d?.fileUrl,
        size: assignmentFile?.size ?? 1024,
        type: assignmentFile?.type ?? "unknown",
      });
    },
  });

  function handleDelete(type: "material" | "assignment", index: number) {
    if (type === "material") {
      setMaterials((p) => {
        return [...p?.filter((_, i) => i !== index)];
      });
    }
    if (type === "assignment") {
      setAssignments((p) => {
        return [...p?.filter((_, i) => i !== index)];
      });
    }
  }

  function handleSubmit(e: any) {
    onCreate({
      ...formData,
      videoUrl: e?.fileUrl, //"https://rhema-course-uploads-bucket.s3.amazonaws.com/f347d7352b462b8f41056316ef65b414.mp4",
      materials,
      assignments,
    });
    toggle();
  }

  const uploadVideo = useUploadFile({ file: file!, onSuccess: handleSubmit });
  const loading = isLoading || uploadVideo.isLoading;

  return (
    <>
      <Modal
        centered
        {...{ isOpen, toggle }}
        fullscreen
        id="createSectionModal"
      >
        <ModalHeader toggle={toggle}>
          {!!defaultValues ? "Modify Section" : "Create Section"}
        </ModalHeader>
        <ModalBody>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              uploadVideo.startUpload();
            }}
          >
            <FormInput
              label="Name"
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
              onChange={onChangeFile}
            />

            {/* Course Materials */}
            <CardWrapper className="bg-5 ">
              <div className="d-flex justify-content-between mb-4">
                <h1>Course Materials ({materials?.length?.toString()})</h1>
                <div>
                  <label htmlFor="Upload">
                    <u>Upload</u>
                  </label>
                  <input
                    onChange={(e) => {
                      onChangeMaterial(e);
                      if (materialStatus?.success) {
                        uploadMaterial.startUpload();
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
                {materials?.map((d: any, i) => {
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
                            "material",
                            materials?.findIndex((v) => v === d)
                          );
                        }}
                      >
                        Delete
                      </u>
                    </li>
                  );
                })}
              </ul>
            </CardWrapper>

            {/* Course Assignments */}
            <CardWrapper className="bg-5 my-5">
              <div className="d-flex justify-content-between mb-4">
                <h1>Course Assignments ({assignments?.length?.toString()})</h1>
                <div>
                  <label htmlFor="UploadAssignment">
                    <u>Upload</u>
                  </label>
                  <input
                    onChange={(e) => {
                      onChangeAssignment(e);
                      if (assignmentStatus?.success) {
                        UploadAssignment.startUpload();
                        // console.log({ assignment, assignmentFile });
                      }
                    }}
                    id="UploadAssignment"
                    type={"file"}
                    hidden
                  />

                  {UploadAssignment.isLoading && <Spinner />}
                </div>
              </div>

              <ul className="no-padding-left">
                {assignments?.map((d: any, i) => {
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
                    </li>
                  );
                })}
              </ul>
            </CardWrapper>
            {loading ? (
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
