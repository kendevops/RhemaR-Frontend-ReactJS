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
import useUploadQuiz from "../../hooks/mutations/exams/useUploadQuiz";

type UploadBulkQuizModalProps = {
  isOpen: boolean;
  toggle: VoidFunction;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  refetch?: any;
};

export default function UploadQuizModal({
  isOpen,
  toggle,
  refetch,
}: UploadBulkQuizModalProps) {
  const [dataToUpload, setDataToUpload] = useState([]);
  const acceptableCSVFileTypes =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv";

  const { formData, formErrors, formIsValid, toggleError, updateForm } =
    useForm({
      initialState: {
        csv: "",
      },
    });

  const { isLoading, mutate } = useUploadQuiz();

  const [questions, setQuestions] = useState<any>([]);
  const [quizNames, setQuizNames] = useState<any>([]);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement> | any) => {
    const file = event.target.files[0] as any;

    if (file) {
      parseCSV(file);
    }
  };

  const parseCSV = (file: any) => {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const contents = e.target.result;

      const lines = contents.split("\n");
      const headers = lines[0].split(",");

      const groupedQuestions: any = {};
      const uniqueQuizNames: any = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",");
        const question: any = {};

        for (let j = 0; j < headers.length; j++) {
          if (values[j]) {
            if (values[j] == "true" || values[j] == "yes") {
              question[headers[j]] = true;
            } else {
              question[headers[j]] = values[j];
            }

            if (headers[j] == "name") {
              uniqueQuizNames.push(question[headers[j]]);
            }
          }
        }

        const quizName = question["name"];

        if (!groupedQuestions[quizName]) {
          groupedQuestions[quizName] = [];
        }

        groupedQuestions[quizName].push(question);
      }

      console.log("Grouped questions:", uniqueQuizNames);
      setQuestions(groupedQuestions);
      setQuizNames(uniqueQuizNames);
    };

    reader.readAsText(file);
  };

  const handleUploadData = () => {
    console.log(dataToUpload);
    const uniqueSet = new Set(quizNames);
    const uniqueArray = Array.from(uniqueSet);

    const quiz = uniqueArray?.map((q: any, i: any) => {
      return {
        questions: questions[q].map((s: any, i: number) => ({
          text: s.text,
          answer: s.answer,
          score: +s.score,
          isActive: true,
          options: [s.option1, s.option2, s.option3 ?? "", s.option4 ?? ""],
        })),

        rdNo: +questions[q][0].rdNo,
        totalScore: +questions[q][0].totalScore,
        durationInSeconds: +questions[q][0].duration,
        courseId: questions[q][0].courseId,
        sessionId: questions[q][0].sessionId,
        name: questions[q][0].name,

        endsAt: questions[q][0].endsAt
          ? new Date(questions[q][0].endsAt)?.toISOString()
          : null,
        startsAt: questions[q][0].startsAt
          ? new Date(questions[q][0].startsAt)?.toISOString()
          : null,
      };
    });

    console.log(quiz);

    mutate(
      {
        quizzes: quiz,
      },
      {
        onSuccess: (e) => {
          console.log(e);

          e?.data?.data?.results?.map((e: any) => {
            if (!e?.success) {
              toast.error(
                <ToastContent
                  type={"error"}
                  heading={"Error Adding Quiz"}
                  message={e?.error}
                />
              );
            } else {
              toast.success(
                <ToastContent
                  type={"success"}
                  heading={"Quiz added"}
                  message={"The Quiz has been added successfully"}
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
      <ModalHeader toggle={toggle}>Bulk Upload Quiz </ModalHeader>
      <ModalBody>
        <form onSubmit={() => {}}>
          {/* <label>File (Drag and drop, or click to select)</label> */}

          <div
            className="p-4 d-flex align-items-center justify-content-center flex-column gap-3"
            style={{ height: "200px", width: "100%", background: "#f0f0f0" }}
          >
            <input
              onChange={handleFileUpload}
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
              Upload Quiz
            </button>
          )}
        </form>
      </ModalBody>
    </Modal>
  );
}
