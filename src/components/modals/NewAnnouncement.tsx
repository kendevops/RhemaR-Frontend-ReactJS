// import { FormEvent } from "react";
// import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
// import usePublishNotification from "../../hooks/mutations/notifications/usePublishNotification";
// import useForm from "../../utility/hooks/useForm";
// import FormInput from "../molecules/FormInput";
// import FormInputWrapper from "../molecules/FormInputWrapper";
// import { toast } from "react-toastify";
// import ToastContent from "../molecules/ToastContent";

// type NewAnnouncementProps = {
//   toggle: VoidFunction;
//   visibility: boolean;
// };

// export default function NewAnnouncementModal({
//   toggle,
//   visibility,
// }: NewAnnouncementProps) {
//   const { formData, formIsValid, updateForm } = useForm({
//     initialState: { type: "important", title: "", content: "" },
//   });
//   const { mutate, isLoading } = usePublishNotification();

//   function onSubmit(e: FormEvent) {
//     e.preventDefault();

//     if (formIsValid) {
//       mutate(formData, {
//         onSuccess: () => {
//           toast.success(
//             <ToastContent
//               type={"success"}
//               heading={"Success"}
//               message={`Announcement successful!`}
//             />,
//             ToastContent.Config
//           );
//           toggle();
//         },

//         onError: (e: any) => {
//           toast.error(
//             <ToastContent
//               type={"error"}
//               heading={"An Error Occurred"}
//               message={e?.response?.data?.error?.message?.toString()}
//             />,
//             ToastContent.Config
//           );

//           console.log({ e, formData });
//         },
//       });
//     } else alert("Please fill in all fields");
//   }

//   return (
//     <div>
//       <Modal
//         centered
//         isOpen={visibility}
//         toggle={toggle}
//         id="newAnnouncementModal"
//       >
//         <ModalHeader toggle={toggle}>New Announcement</ModalHeader>
//         <ModalBody>
//           <form className="mt-3" onSubmit={onSubmit}>
//             <FormInput
//               label="Title"
//               onChange={(e) => updateForm("title", e.target.value)}
//             />

//             <FormInputWrapper>
//               <label htmlFor={"content"}>Message</label>
//               <textarea
//                 className="form-control"
//                 placeholder="Enter message"
//                 onChange={(e) => updateForm("content", e.target.value)}
//               />
//             </FormInputWrapper>

//             {isLoading ? (
//               <Spinner />
//             ) : (
//               <button
//                 className="btn btn-blue-800 btn-lg w-100 my-5"
//                 type="submit"
//                 disabled={!formIsValid}
//               >
//                 Publish Announcement
//               </button>
//             )}
//           </form>
//         </ModalBody>
//       </Modal>
//     </div>
//   );
// }

import { FormEvent, useEffect, useState } from "react";
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
import FormInputWrapper from "../molecules/FormInputWrapper";

type CreateAnnouncementModalProps = {
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

export default function NewAnnouncementModal({
  defaultValues,
  isOpen,
  onCreate,
  toggle,
  isLoading,
}: CreateAnnouncementModalProps) {
  const { formData, updateForm, formErrors } = useForm({
    initialState: {
      title: defaultValues?.title ?? "",
      content: defaultValues?.content ?? "",
      type: defaultValues?.type ?? "",
      sendMail: defaultValues?.courseId ?? "",
    },
  });

  const [materials, setMaterials] = useState<any[]>(
    defaultValues?.materials ?? []
  );

  const [uploadingMaterials, setUploadingMaterials] = useState(false);

  function handleAdd(type: "material", file: FileType) {
    if (type === "material") {
      setMaterials((p) => {
        return [...p, file];
      });
    }
  }

  const {
    img,
    onChangeFile: onChangeMaterial,
    status: materialStatus,
    file: materialFile,
  } = useFileReader();

  const uploadMaterial = useUploadFile({
    file: materialFile as any,
    onSuccess: async (d) => {
      console.log({ d });
      // console.log(materialFile);

      handleAdd("material", {
        name: materialFile?.name ?? "Unknwon file details",
        path: d?.fileUrl,
        size: materialFile?.size ?? 1024,
        type: materialFile?.type ?? "unknown",
      });
    },
  });

  function handleDelete(type: "material", index: number) {
    if (type === "material") {
      setMaterials((p) => {
        return [...p?.filter((_, i) => i !== index)];
      });
    }
  }

  useEffect(() => {
    if (uploadingMaterials) {
      uploadMaterial.startUpload();
    }
    setUploadingMaterials(false);
  }, [uploadingMaterials]);

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
        id="newAnnouncementModal"
      >
        <ModalHeader toggle={toggle}>
          {!!defaultValues ? "Modify Announcement" : "Create Announcement"}
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormDropdown
              title="type"
              value={formData?.type}
              options={["important", "unimportant"].map((d: any) => ({
                children: d,
              }))}
              onChange={(e) => updateForm("type", e?.target?.value)}
              // disabled={!isCreating}
            />
            <FormInput
              label="Announcement Title"
              onChange={(e) => updateForm("title", e?.target?.value)}
              placeholder={defaultValues?.title}
              required
            />
            <FormInputWrapper>
              <label htmlFor={"content"}>Message</label>
              <textarea
                className="form-control"
                placeholder="Enter message"
                onChange={(e) => updateForm("content", e.target.value)}
              />
            </FormInputWrapper>

            <FormRadioGroup
              label="Send mail to students?"
              options={["Yes", "No"]}
              onChange={(e) => {
                updateForm("sendMail", !!(e.target.value === "Yes"));
              }}
              hasErrors={formErrors?.sendMail}
            />

            {/* Course Announcements */}
            <CardWrapper className="bg-5 ">
              <div className="d-flex justify-content-between mb-4">
                <h1>
                  Announcement Materials ({materials?.length?.toString()})
                </h1>
                <div>
                  <label htmlFor="Upload">
                    <u>Upload</u>
                  </label>
                  <input
                    onChange={(e) => {
                      // onChangeUploadFile(e);
                      onChangeMaterial(e);
                      setUploadingMaterials(true);
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
                {!!defaultValues
                  ? "Modify Announcement"
                  : "Create Announcement"}
              </button>
            )}
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}
