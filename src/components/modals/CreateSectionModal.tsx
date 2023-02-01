import { FormEvent, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import useForm from "../../utility/hooks/useForm";
import FormInput from "../molecules/FormInput";
import CardWrapper from "../students/CardWrapper";
import useFileReader from "../../utility/hooks/useFileReader";
import FileTypeIcon from "../atoms/FIleTypeIcon";

type CreateSectionModalProps = {
  isOpen: boolean;
  toggle: VoidFunction;
  defaultValues?: any;
  onCreate: (data: any) => void;
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

  const {
    img: material,
    onChangeFile: onChangeMaterial,
    status: materialStatus,
    file: materialFile,
  } = useFileReader();

  const {
    img: assignment,
    onChangeFile: onChangeAssignment,
    status: assignmentStatus,
    file: assignmentFile,
  } = useFileReader();

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

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onCreate({
      ...formData,
      materials,
      assignments,
    });
    toggle();
  }

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
          <form onSubmit={handleSubmit}>
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
              label="Video Url"
              onChange={(e) => updateForm("videoUrl", e?.target?.value)}
              placeholder={defaultValues?.videoUrl}
              required
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
                        console.log({ material, materialFile });
                        handleAdd("material", {
                          name: materialFile?.name ?? Date?.now?.toString(),
                          path: material,
                          size: materialFile?.size ?? 1024,
                          type: materialFile?.type ?? "unknown",
                        });
                      }
                    }}
                    id="Upload"
                    type={"file"}
                    hidden
                  />
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
                        console.log({ assignment, assignmentFile });
                        handleAdd("assignment", {
                          name: assignmentFile?.name ?? Date?.now?.toString(),
                          path: assignment,
                          size: assignmentFile?.size ?? 1024,
                          type: assignmentFile?.type ?? "unknown",
                        });
                      }
                    }}
                    id="UploadAssignment"
                    type={"file"}
                    hidden
                  />
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
            <button type="submit" className="btn btn-lg  btn-blue-800">
              {!!defaultValues ? "Modify Section" : "Create Section"}
            </button>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}
