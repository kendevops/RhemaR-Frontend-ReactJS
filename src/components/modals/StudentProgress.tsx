import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { Input } from "reactstrap";
import { useForm, Controller } from "react-hook-form";

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

//   const { control, setError, handleSubmit, formState } = useForm({
//     defaultValues,
//     mode: "onChange",
//   });

  function onSubmit() {}

  return (
    <div>
      <Modal centered isOpen={visibility} toggle={toggle} id="newSessionModal">
        <ModalHeader toggle={toggle}>New Academic Session</ModalHeader>
        <ModalBody>
          {/* <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="academicSession">Academic Session</label>
              <Controller
                control={control}
                name="academicSession"
                defaultValue=""
                render={({ field }) => (
                  <Input
                    autoFocus
                    type="text"
                    placeholder="Academic Session"
                    className="form-control"
                    invalid={formState.errors.academicSession && true}
                    {...field}
                  />
                )}
                rules={{ required: true }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <Controller
                control={control}
                name="startDate"
                defaultValue=""
                render={({ field }) => (
                  <Input
                    autoFocus
                    type="date"
                    placeholder="Start Date"
                    className="form-control"
                    invalid={formState.errors.startDate && true}
                    {...field}
                  />
                )}
                rules={{ required: true }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <Controller
                control={control}
                name="endDate"
                defaultValue=""
                render={({ field }) => (
                  <Input
                    autoFocus
                    type="date"
                    placeholder="end Date"
                    className="form-control"
                    invalid={formState.errors.endDate && true}
                    {...field}
                  />
                )}
                rules={{ required: true }}
              />
            </div>

            <button
              className="btn btn-blue-800 btn-lg w-100 my-5"
              type="submit"
              disabled={!formState.isValid}
            >
              Add Session
            </button>
          </form> */}
        </ModalBody>
      </Modal>
    </div>
  );
}
