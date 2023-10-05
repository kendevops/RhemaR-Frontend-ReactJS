import { FormEvent, useState } from "react";
import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import useForm from "../../utility/hooks/useForm";
import FormInput from "../molecules/FormInput";
import CardWrapper from "../students/CardWrapper";
import useFileReader from "../../utility/hooks/useFileReader";
import FileTypeIcon from "../atoms/FIleTypeIcon";
import useUploadFile from "../../hooks/mutations/classes/useUploadFile";
import FormRadioGroup from "../molecules/FormRadioGroup";
import FormDropdown from "../molecules/FormDropdown";
import useCampusLevel from "../../hooks/queries/classes/useCampusLevel";

type CreateCourseMaterialModalProps = {
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

export default function CreateCourseMaterialModal({
  defaultValues,
  isOpen,
  onCreate,
  toggle,
  isLoading,
}: CreateCourseMaterialModalProps) {
  // "type": "MAIN_CAMPUSES",
  // "title": "christ the healer 2",
  // "level": "LEVEL_1",
  // "courseId": "6515fba4db0665b089ac4976",
  // "instructorId": "641dc7962c089cd00f164848",
  const { formData, updateForm } = useForm({
    initialState: {
      title: defaultValues?.title ?? "",
      level: defaultValues?.level ?? "",
      type: defaultValues?.type ?? "",
      courseId: defaultValues?.courseId ?? "",
      instructorId: defaultValues?.instructorId ?? "",

      // videoUrl: defaultValues?.videoUrl ?? "",
    },
  });

  const { data: levelData } = useCampusLevel();
  const levels = levelData?.map((v: any) => v.name);

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

  //   const { file, onChangeFile } = useFileReader();

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
    e.preventDefault();

    onCreate({
      ...formData,
      materials,
      //   assignments,
    });
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
          {!!defaultValues ? "Modify Material" : "Create Material"}
        </ModalHeader>
        <ModalBody>
          <form
            // onSubmit={(e) => {
            //   e.preventDefault();
            //   uploadVideo.startUpload();
            // }}

            onSubmit={handleSubmit}
          >
            <FormDropdown
              title="type"
              value={formData?.type}
              options={[
                "UNIVERSITY_CAMPUSES",
                "HAUSA_CAMPUSES",
                "MAIN_CAMPUSES",
              ].map((d: any) => ({ children: d }))}
              onChange={(e) => updateForm("type", e?.target?.value)}
              // disabled={!isCreating}
            />
            <FormInput
              label="Material Title"
              onChange={(e) => updateForm("title", e?.target?.value)}
              placeholder={defaultValues?.title}
              required
            />
            <FormDropdown
              title="Level"
              value={formData?.level}
              options={levels?.map((d: any) => ({ children: d }))}
              onChange={(e) => updateForm("level", e?.target?.value)}
              // disabled={!isCreating}
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
                      //   if (materialStatus?.success) {
                      uploadMaterial.startUpload();
                      //   }
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

            {isLoading ? (
              <Spinner />
            ) : (
              <button type="submit" className="btn btn-lg  btn-blue-800">
                {!!defaultValues ? "Modify Marerial" : "Create Marerial"}
              </button>
            )}
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}
