import { Modal, ModalHeader, ModalBody } from "reactstrap";

interface defaultValues {
    studentFullname: string;
    studentFirstname: string;
    studentLastname: string;
    campus: string;
    level: string;
    courseAttendanceProgress: string;
    courseAttendance: string; //This is course names with attendance status
    courseGrade: number; 
}

type StudentProgressProps = {
  toggle: VoidFunction;
  visibility: boolean;
  defaultValues?: defaultValues;
};

export default function StudentProgress({
    //dropdownOpen,
  toggle,
  visibility,
  defaultValues: defValues,
}: StudentProgressProps) {
  const defaultValues = defValues ?? {
    studentFullname:"",
    studentFirstname:"",
    studentLastname:"",
    campus: "",
    level: "",
    courseAttendanceProgress: "",
    courseAttendance:"",
    courseGrade:0,
  };

  return (
    <div>
      <Modal centered isOpen={visibility} toggle={toggle} id="newSessionModal">
        <ModalHeader toggle={toggle}>New Academic Session</ModalHeader>
        <ModalBody>
          {/* //Implement modal */}
        </ModalBody>
      </Modal>
    </div>
  );
}
