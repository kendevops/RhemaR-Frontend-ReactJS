import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import useAllCampuses from "../../hooks/queries/classes/useAllCampuses";
import useForm from "../../utility/hooks/useForm";

import MultipleSelect from "../molecules/MultipleSelect";
import useAcademicSessions from "../../hooks/queries/classes/useAcademicSessions";
import { useState } from "react";
import useToggle from "../../utility/hooks/useToggle";
import ExportStudentsSecondModal from "./ExportStudentsSecondModal";

type ExportStudentsFirstModalProps = {
  isOpen: boolean;
  toggle: VoidFunction;
};

export default function ExportStudentsFirstModal({
  isOpen,
  toggle,
}: ExportStudentsFirstModalProps) {
  const { data: campusesData } = useAllCampuses();
  const { data: sessionsData } = useAcademicSessions();
  const [campusValues, setCampusValues] = useState<any>("");
  const [sessoinValues, setSessionValues] = useState<any>("");
  const [levelValues, setLevelValues] = useState<any>("");
  const [paymentStatusValues, setPaymentStatusValues] = useState<any>("");
  const [intakeValues, setIntakeValues] = useState<any>("");
  const [classesCompletedValues, setClassesCompletedValues] = useState<any>("");

  const [isSecondModalOpen, toggleSecondModalOpen] = useToggle();

  const initialState = {
    campus: [],
    intake: [],
    level: [],
    session: [],
    status: [],
    classesCompleted: [],
  };

  const { formData, formIsValid, updateForm, formErrors } = useForm({
    initialState,
  });

  let searchData = [
    {
      campus: campusValues ? campusValues : [],
      intake: intakeValues ? intakeValues : [],
      level: levelValues ? levelValues : [],
      session: sessoinValues ? sessoinValues : [],
      status: paymentStatusValues ? paymentStatusValues : [],
      classesCompleted: classesCompletedValues ? classesCompletedValues : [],
    },
  ];

  console.log(searchData);

  const campusOptions = campusesData?.nodes?.map((d: any) => d?.name);

  const intakeOptions = ["April", "November"].map((v) => v + " intake");

  const levelOptions = ["LEVEL_1", "LEVEL_2"].map((v) => v);
  const statusOptions = ["Pending", "Completed"].map((v) => v);
  const classesCompletedOptions = ["0", "1", "2", "3", "4", "5", "6", "7"].map(
    (v) => v
  );

  const sessionOptions = sessionsData?.nodes?.map((sess: any) => sess?.name);

  return (
    <>
      <ExportStudentsSecondModal
        isOpen={isSecondModalOpen}
        toggle={toggleSecondModalOpen}
        searchData={searchData}
      />

      <Modal centered {...{ isOpen, toggle }}>
        <ModalHeader toggle={toggle}>Export Students Record</ModalHeader>
        <ModalBody>
          <form onSubmit={() => {}}>
            <MultipleSelect
              options={campusOptions}
              label="Campus"
              // onChange={(e) => handleSelectedChange("campus", e.target.value)}
              // value={formData.campus}
              setSelectedValues={setCampusValues}
            />

            <MultipleSelect
              options={sessionOptions}
              label="Session"
              // value={formData?.session}
              setSelectedValues={setSessionValues}
            />
            <MultipleSelect
              options={intakeOptions}
              label="Intake"
              // value={formData?.intake}
              setSelectedValues={setIntakeValues}
            />
            <MultipleSelect
              options={levelOptions}
              label="Level"
              // value={formData?.level}
              setSelectedValues={setLevelValues}
            />
            <MultipleSelect
              options={statusOptions}
              label="Payment Status"
              // value={formData?.status}
              setSelectedValues={setPaymentStatusValues}
            />
            <MultipleSelect
              options={classesCompletedOptions}
              label="No. of Classes Completed"
              // value={formData?.classesCompleted}
              setSelectedValues={setClassesCompletedValues}
            />

            {
              <button
                className="btn btn-blue-800 btn-lg w-100 my-5 "
                type="button"
                onClick={() => {
                  toggle();
                  toggleSecondModalOpen();
                }}
              >
                Next
              </button>
            }
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}
