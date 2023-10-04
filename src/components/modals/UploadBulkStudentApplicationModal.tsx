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
import useUploadUsers from "../../hooks/mutations/users/useUploadUsers";
import Papa from "papaparse";
import useToggle from "../../utility/hooks/useToggle";
import useUploadApplications from "../../hooks/mutations/users/useUploadApplications";

type UploadBulkStudentApplicationModalProps = {
  isOpen: boolean;
  toggle: VoidFunction;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  refetch?: any;
};

export default function UploadBulkStudentApplicationModal({
  isOpen,
  toggle,
  refetch,
}: UploadBulkStudentApplicationModalProps) {
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
        // mutate(
        //   { users: data?.map((d: any) => ({ ...d, roles: [d?.roles] })) },
        //   {
        //     onSuccess: () => {
        //       alert("Upload successful!");
        //       refetch();
        //     },
        //     onError: (e) => handleError(e),
        //   }
        // );
      },
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const { isLoading, mutate } = useUploadApplications();

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
        users: dataToUpload?.map((d: any) => ({
          ...d,
          levelOneApplication: {
            campus: d?.campus,
            intake: d?.intake,
            session: d?.session,
            userTitle: d?.userTitle,
            isBaptized: d?.isBaptized === "Yes" ? true : false,
            isBornAgain: d?.isBornAgain === "Yes" ? true : false,
            nationality: "Nigeria",
            dateOfBirth: new Date(d?.dateOfBirth)?.toISOString(),
            maritalStatus: d?.maritalStatus,
            referralSource: d?.referralSource,
            classAttendanceMethod: d?.classAttendanceMethod,
            hasBeenBornAgainFor: d?.hasBeenBornAgainFor,
            churchName: d?.churchName,
            churchAddress: d?.churchAddress,
            churchPastorName: d?.churchPastorName,
            churchPastorPhoneNumber: d?.churchPastorPhoneNumber,
            affirmationsAndSubmissions: d?.affirmationsAndSubmissions,
          },
          address: {
            city: d?.city,
            street: d?.address,
            state: d?.state,
            country: "Nigeria",
            zipCode: 234,
          },

          payments: {
            feePaymentAmount: d?.feePaymentAmount,
            hasPaidFeePayment: d?.hasPaidFeePayment === "Yes" ? true : false,
            initialPaymentAmount: d?.initialPaymentAmount,
            hasPaidInitialPayment:
              d?.hasPaidInitialPayment === "Yes" ? true : false,
          },
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
                  heading={"Error Adding Student"}
                  message={e?.error}
                />
              );
            } else {
              toast.success(
                <ToastContent
                  type={"success"}
                  heading={"Students added"}
                  message={"The students has been added successfully"}
                />
              );
              refetch();
            }
          });
          // toast.success(
          //   <ToastContent
          //     type={"success"}
          //     heading={"Students Uploaded"}
          //     message={"Students Upload successfully"}
          //   />
          // );

          toggle();
        },
        onError: (e) => handleError(e),
      }
    );
  };

  return (
    <Modal centered {...{ isOpen, toggle }}>
      <ModalHeader toggle={toggle}>
        Bulk Upload Students Applications{" "}
      </ModalHeader>
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
              Upload Students
            </button>
          )}
        </form>
      </ModalBody>
    </Modal>
  );
}
