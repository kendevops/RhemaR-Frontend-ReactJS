import useToggle from "../../utility/hooks/useToggle";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Input } from "reactstrap";
import { useForm, Controller } from "react-hook-form";

interface defaultValues {
  course: string;
  level: string;
  classOption: string;
  date: string;
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

  const [classOpen, toggleClass] = useToggle();
  const [levelOpen, toggleLevel] = useToggle();
  const [courseOpen, toggleCourse] = useToggle();

  const { control, setError, handleSubmit, formState } = useForm({
    defaultValues,
    mode: "onChange",
  });

  function onSubmit() {}

  return (
    <div>
      <Modal centered isOpen={visibility} toggle={toggle} id="scheduleModal">
        <ModalHeader toggle={toggle}>Add Schedule</ModalHeader>
        <ModalBody>
          <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="classOption">Course</label>
              <Controller
                control={control}
                name="course"
                defaultValue=""
                render={({ field }) => (
                  <Dropdown
                    className="form-control "
                    {...field}
                    isOpen={courseOpen}
                    toggle={toggleCourse}
                  >
                    <DropdownToggle
                      className="text-lg w-100 text-start shadow-none"
                      caret
                    >
                      Select Course
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>Option 1</DropdownItem>
                      <DropdownItem>Option 2</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                )}
                rules={{ required: true }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="level">Level</label>
              <Controller
                control={control}
                name="level"
                defaultValue=""
                render={({ field }) => (
                  <Dropdown
                    className="form-control"
                    {...field}
                    isOpen={levelOpen}
                    toggle={toggleLevel}
                  >
                    <DropdownToggle
                      className="text-lg w-100 text-left shadow-none"
                      caret
                    >
                      Select Level
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>Option 1</DropdownItem>
                      <DropdownItem>Option 2</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                )}
                rules={{ required: true }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="classOption">Class Option</label>
              <Controller
                control={control}
                name="classOption"
                defaultValue=""
                render={({ field }) => (
                  <Dropdown
                    className="form-control"
                    {...field}
                    isOpen={classOpen}
                    toggle={toggleClass}
                  >
                    <DropdownToggle
                      className="text-lg w-100 text-left shadow-none"
                      caret
                    >
                      Select Class Option
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>Option 1</DropdownItem>
                      <DropdownItem>Option 2</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                )}
                rules={{ required: true }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="endDate">Date</label>
              <Controller
                control={control}
                name="date"
                defaultValue=""
                render={({ field }) => (
                  <Input
                    autoFocus
                    type="date"
                    placeholder="date"
                    className="form-control"
                    invalid={formState.errors.date && true}
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
              Add Schedule
            </button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
