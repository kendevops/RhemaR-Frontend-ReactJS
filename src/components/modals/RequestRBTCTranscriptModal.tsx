import { FormEvent } from "react";
import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import useForm from "../../utility/hooks/useForm";
import useCreateCampusTuition from "../../hooks/mutations/classes/useCreateCampusTuition";
import useUpdateCampusTuition from "../../hooks/mutations/classes/useUpdateCampusTuition";
import FormDropdown from "../molecules/FormDropdown";
import useAllCampuses from "../../hooks/queries/classes/useAllCampuses";
import FormDropdownSelectMultiple from "../molecules/FormDropdownSelectMultiple";
import { states } from "../../data/States";
import { InstructorsData } from "../../data/InstructorsData";
import FormInput from "../molecules/FormInput";
import TextArea from "../molecules/TextArea";

interface RequestRBTCTranscriptModalProps {
  toggle: VoidFunction;
  visibility: boolean;
  level?: string;
  onCreate?: VoidFunction;
}

export default function RequestRBTCTranscript({
  toggle,
  visibility,
  onCreate,
  level,
}: RequestRBTCTranscriptModalProps) {
  const { isLoading: campusesLoading, data } = useAllCampuses();
  const createTuition = useCreateCampusTuition();
  // const updateTuition = useUpdateCampusTuition(id ?? "");

  const isLoading = createTuition.isLoading || campusesLoading;

  const initialState = {
    firstName: "",
    lastName: "",
    middleName: "",
    priorLastNames: "",
    studentNo: "",
    YOG: "",
    street: "",
    LGA: "",
    state: "",

    transcriptType: "",
    transcriptStreet: "",
    transcriptLGA: "",
    transcriptState: "",
    transcriptCountry: "",

    comments: "",
  };

  const { formData, formIsValid, updateForm, formErrors } = useForm<
    typeof initialState
  >({
    initialState: initialState,
  });

  // function handleSubmit(e: FormEvent) {
  //   e.preventDefault();

  //   const { level, campus, ...otherData } = formData;

  //   if (formIsValid) {
  //     isCreating
  //       ? createTuition.mutate(formData, {
  //           onSuccess: () => {
  //             toast.success(
  //               <ToastContent
  //                 type={"success"}
  //                 heading={"Success"}
  //                 message={`Successfully created campus tuition`}
  //               />,
  //               ToastContent.Config
  //             );
  //             !!onCreate && onCreate();
  //             toggle();
  //           },
  //           onError: (e: any) => {
  //             handleError(e, formData);
  //           },
  //         })
  //       : updateTuition.mutate(otherData, {
  //           onSuccess: () => {
  //             toast.success(
  //               <ToastContent
  //                 type={"success"}
  //                 heading={"Success"}
  //                 message={`Successfully updated campus tuition`}
  //               />,
  //               ToastContent.Config
  //             );
  //             toggle();
  //           },
  //           onError: (e: any) => {
  //             handleError(e, formData);
  //           },
  //         });
  //   } else {
  //     alert("Please fill in all fields");
  //     console.log(formData);
  //   }
  // }

  return (
    <Modal
      centered
      isOpen={visibility}
      toggle={toggle}
      scrollable
      style={{ maxWidth: "1100px" }}
    >
      <ModalHeader
        toggle={toggle}
        //   className="bg-blue-800"
      >
        Request RBTC Transcript
      </ModalHeader>

      <ModalBody>
        <form onSubmit={() => {}}>
          <div className="d-flex flex-column gap-4  ">
            <p className="lh-base fw-semibold">
              Use this form to request either a student copy or an official copy
              of your transcript. Official copies must be sent to the school or
              business and cannot be mailed to the student. Please fill out all
              fields for faster proccessing.
            </p>

            <p className="lh-base fw-semibold">
              Transcript costs $5.00 per year attended ($10 for a two-year
              graduate).
            </p>
            <p className="lh-base">
              Please remember if you have any outstanding debts or fees, we will
              not be able to proccess your request.
            </p>
          </div>

          <div className="lh-base fw-semibold mt-5">Personal Details</div>
          <div className="d-flex flex-wrap  justify-content-between mt-3">
            <div className="col-6 px-3 ">
              <FormInput
                label="First Name"
                placeholder="First Name"
                onChange={(e) => updateForm("firstName", e?.target?.value)}
                // style={{ width: "500px" }}
              />
            </div>
            <div className="col-6 px-3 ">
              <FormInput
                label="Middle Name"
                placeholder="Middle Name"
                onChange={(e) => updateForm("middleName", e?.target?.value)}
                // style={{ width: "500px" }}
              />
            </div>
            <div className="col-6 px-3 ">
              <FormInput
                label="Last Name"
                placeholder="Last Name"
                onChange={(e) => updateForm("lastName", e?.target?.value)}
                // style={{ width: "500px" }}
              />
            </div>
            <div className="col-6 px-3 ">
              <FormInput
                label="All Prior Last Names (if applicable)"
                placeholder=""
                onChange={(e) => updateForm("priorLastNames", e?.target?.value)}
                // style={{ width: "500px" }}
              />
            </div>
            <div className="col-6 px-3 ">
              <FormInput
                label="Student No"
                placeholder=""
                onChange={(e) => updateForm("studentNo", e?.target?.value)}
                // style={{ width: "500px" }}
              />
            </div>
            <div className="col-6 px-3 ">
              <FormInput
                label="Year Of Graduation (i.e 2003, 2023)"
                placeholder=""
                onChange={(e) => updateForm("YOG", e?.target?.value)}
                // style={{ width: "500px" }}
              />
            </div>
            <div className="col-6 px-3 ">
              <FormInput
                label="Personal Address (Street)"
                placeholder="Street"
                onChange={(e) => updateForm("street", e?.target?.value)}
                // style={{ width: "500px" }}
              />
            </div>

            <div className="col-6 px-3 ">
              <FormInput
                label="Personal Address (LGA)"
                placeholder="LGA"
                onChange={(e) => updateForm("LGA", e?.target?.value)}
                // style={{ width: "500px" }}
              />
            </div>
            <div className="col-6 px-3 ">
              <FormDropdown
                title="Personal Address (State)"
                value={formData?.state}
                options={states?.map((d: any) => ({ children: d }))}
                onChange={(e) => updateForm("state", e?.target?.value)}
                // style={{ width: "500px" }}
              />
            </div>
          </div>

          <div className="lh-base fw-semibold mt-5">Transcript Details</div>
          <div className="d-flex flex-column  justify-content-between mt-3 px-3  col-6">
            <div className="">
              <FormDropdown
                title="Type of Transcript requested"
                value={formData?.transcriptType}
                options={["No", "Yes"].map((d: any) => ({ children: d }))}
                onChange={(e) => updateForm("transcriptType", e?.target?.value)}
                // style={{ width: "500px" }}
              />
            </div>
            <p className="lh-base">
              Note: Official copies must be sent directly to the school or
              business and cannot be mailed to the student.{" "}
            </p>
          </div>

          <div className="d-flex flex-wrap  justify-content-between mt-3">
            <div className="col-6 px-3 ">
              <FormInput
                label="Transcript Address (Street)"
                placeholder=""
                onChange={(e) =>
                  updateForm("transcriptStreet", e?.target?.value)
                }
                // style={{ width: "500px" }}
              />
            </div>

            <div className="col-6 px-3 ">
              <FormInput
                label="Transcript Address (LGA)"
                placeholder="LGA"
                onChange={(e) => updateForm("transcriptLGA", e?.target?.value)}
                // style={{ width: "500px" }}
              />
            </div>
            <div className="col-6 px-3 ">
              <FormDropdown
                title="Transcript Address (State)"
                value={formData?.transcriptState}
                options={states?.map((d: any) => ({ children: d }))}
                onChange={(e) => updateForm("state", e?.target?.value)}
                // style={{ width: "500px" }}
              />
            </div>

            <div className="col-6 px-3 ">
              <FormDropdown
                title="Transcript Address (Country)"
                value={formData?.transcriptCountry}
                options={states?.map((d: any) => ({ children: d }))}
                onChange={(e) =>
                  updateForm("transcriptCountry", e?.target?.value)
                }
                // style={{ width: "500px" }}
              />
            </div>
          </div>

          <div className="lh-base fw-semibold mt-5">Others</div>
          <div className="col-12 px-3 ">
            <TextArea
              label="Comments/Instructions: (optional)"
              placeholder=""
              value={formData?.comments}
              onChange={(e) => updateForm("comments", e?.target?.value)}
              // style={{ width: "500px" }}
            />
          </div>

          <div className="d-flex flex-column gap-4  ">
            <p className="lh-base fw-semibold my-2 ">
              Upon submission of the form you willl be requested to pay N15,000
              for the transcript
            </p>
            <p className="lh-base fw-semibold">
              Note: All transcript request are processed withen seven to ten
              business days unless there is a hold on the account that prevent
              processing the request
            </p>
          </div>

          {isLoading ? (
            <Spinner />
          ) : (
            <button
              className="btn btn-blue-800 btn-lg w-100 my-5"
              type="submit"
            >
              {"Submit"}
            </button>
          )}
        </form>
      </ModalBody>
    </Modal>
  );
}
