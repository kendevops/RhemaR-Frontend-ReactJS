import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import useForm from "../../utility/hooks/useForm";
import { ChangeEvent, ChangeEventHandler, useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import ToastContent from "../molecules/ToastContent";
import handleError from "../../utils/handleError";
import { FaCloudUploadAlt } from "react-icons/fa";
import Papa from "papaparse";
import useUploadCourses from "../../hooks/mutations/courses/useUploadCourses";

type UploadBulkStudentModalProps = {
  isOpen: boolean;
  toggle: VoidFunction;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  refetch?: any;
};

export default function UploadBulkCourseModal({
  isOpen,
  toggle,
  refetch,
}: UploadBulkStudentModalProps) {
  const [dataToUpload, setDataToUpload] = useState([]);
  const acceptableCSVFileTypes =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv";

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

    Papa.parse(acceptedFiles, {
      header: true,
      skipEmptyLines: true,
      complete: function (results: any) {
        const data: any = results?.data;

        console.log(data);
      },
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const { isLoading, mutate } = useUploadCourses();

  const importHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results: any) {
        const data: any = results?.data;
        setDataToUpload(data);

        console.log(data);
      },
    });
  };

  const handleUploadData = () => {
    console.log(dataToUpload);
    mutate(
      {
        courses: dataToUpload?.map((d: any) => ({
          ...d,
          rdNo: +d?.rdNo,
          totalHours: +d?.totalHours,
          isActive: d?.isActive === "Yes" ? true : false,
          hasQuiz: d?.hasQuiz === "Yes" ? true : false,
          hasListeningAssignment:
            d?.hasListeningAssignment === "Yes" ? true : false,
          sections: [],
          materials: [],
        })),
      },
      {
        onSuccess: (e) => {
          console.log(e);

          e?.data?.data?.results?.map((e: any) => {
            if (!e?.success) {
              toast.error(
                <ToastContent
                  type={"error"}
                  heading={"Error Adding Course"}
                  message={e?.error}
                />
              );
            } else {
              toast.success(
                <ToastContent
                  type={"success"}
                  heading={"Students added"}
                  message={"The courses has been added successfully"}
                />
              );
              refetch();
            }
          });

          toggle();
        },
        onError: (e) => handleError(e),
      }
    );
  };

  return (
    <Modal centered {...{ isOpen, toggle }}>
      <ModalHeader toggle={toggle}>Bulk Upload Courses </ModalHeader>
      <ModalBody>
        <form onSubmit={() => {}}>
          {/* <label>File (Drag and drop, or click to select)</label> */}

          <div
            className="p-4 d-flex align-items-center justify-content-center flex-column gap-3"
            style={{ height: "200px", width: "100%", background: "#f0f0f0" }}
          >
            <input
              onChange={importHandler}
              accept={acceptableCSVFileTypes}
              type="file"
            />
            <FaCloudUploadAlt style={{ fontSize: "80px" }} />
            {/* <p className="text-2xl">PDF file</p> */}
          </div>

          {isLoading ? (
            <Spinner />
          ) : (
            <button
              className="btn btn-blue-800 btn-lg w-100 my-5 "
              type="button"
              onClick={handleUploadData}
            >
              Upload courses
            </button>
          )}
        </form>
      </ModalBody>
    </Modal>
  );
}
