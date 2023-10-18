import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import useForm from "../../utility/hooks/useForm";
import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  useCallback,
  useState,
} from "react";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import ToastContent from "../molecules/ToastContent";
import handleError from "../../utils/handleError";
import { FaCloudUploadAlt } from "react-icons/fa";
import Papa from "papaparse";
import useToggle from "../../utility/hooks/useToggle";
import useUploadExamQuestions from "../../hooks/mutations/exams/useUploadExamQuestions";

type UploadBulkExamQuestionsModalProps = {
  isOpen: boolean;
  toggle: VoidFunction;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  refetch?: any;
};

export default function UploadExamQuestionsModal({
  isOpen,
  toggle,
  refetch,
}: UploadBulkExamQuestionsModalProps) {
  const [dataToUpload, setDataToUpload] = useState([]);
  const acceptableCSVFileTypes =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv";

  const { formData, formErrors, formIsValid, toggleError, updateForm } =
    useForm({
      initialState: {
        csv: "",
      },
    });

  const { isLoading, mutate } = useUploadExamQuestions();

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
        questions: dataToUpload?.map((d: any) => ({
          ...d,
          examRdNo: +d.examRdNo,
          score: +d.score,
          options: [],
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
                  heading={"Error Adding Exam Questions"}
                  message={e?.error}
                />
              );
            } else {
              toast.success(
                <ToastContent
                  type={"success"}
                  heading={"Exam Questions added"}
                  message={"The Exam Questions has been added successfully"}
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
      <ModalHeader toggle={toggle}> Upload Exam Questions </ModalHeader>
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
              Upload Questions
            </button>
          )}
        </form>
      </ModalBody>
    </Modal>
  );
}
