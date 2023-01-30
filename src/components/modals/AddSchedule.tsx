import { FormEvent } from "react";
import useForm from "../../utility/hooks/useForm";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { Autocomplete, TextField } from "@mui/material";
import useAllCourses from "../../hooks/queries/classes/useAllCourses";

interface defaultValues {
  course: string;
  campus: string;
  classOption: string;
  instructor: string;
  startDate: string;
  endDate: string;
}

type AddScheduleProps = {
  toggle: VoidFunction;
  visibility: boolean;
  defaultValues?: defaultValues;
};

export default function AddSchedule({
  toggle,
  visibility,
  defaultValues: defValues,
}: AddScheduleProps) {
  const defaultValues = defValues ?? {
    classOption: "",
    course: "",
    date: "",
    level: "",
  };

  const { data: coursesData, isLoading } = useAllCourses();
  const coursesOptions = coursesData?.nodes?.map((cours: any) => ({
    label: cours?.title,
    id: cours?.title,
  }));

  const { formData, updateForm } = useForm({
    initialState: defaultValues,
  });

  function onSubmit(e: FormEvent) {
    e?.preventDefault();
  }

  return (
    <div>
      <Modal centered isOpen={visibility} toggle={toggle} id="scheduleModal">
        <ModalHeader toggle={toggle}>Add Course</ModalHeader>
        <ModalBody>
          <form className="mt-3" onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="Search courses">Course</label>
              <Autocomplete
                fullWidth
                disablePortal
                id="Search courses"
                loading={isLoading}
                options={coursesOptions}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      placeholder="Search courses"
                      className="form-control "
                    />
                  );
                }}
                onChange={(e, value: any) => {
                  // updateFormData("course", value?.id);
                }}
              />
            </div>
            <button
              className="btn btn-blue-800 btn-lg w-100 my-5"
              type="submit"
            >
              {!!defValues ? "Modify Schedule" : "Create Schedule"}
            </button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
