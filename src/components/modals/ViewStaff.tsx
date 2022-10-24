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
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

interface ViewStaffProps {
  data: any;
}

export default function ViewStaff({ data }: ViewStaffProps) {
  const [visibility, toggle] = useToggle();
  const [privilegeOpen, togglePrivilege] = useToggle();
  const [roleOpen, toggleRole] = useToggle();
  const [stateOpen, toggleState] = useToggle();
  const [cityOpen, toggleCity] = useToggle();

  const defaultValues = {
    name: data?.name,
    email: data?.email,
    phone: data?.phone,
    gender: data?.gender,
    role: data?.role,
    privilege: data?.privilege,
    birthDate: data?.birthDate,
    state: data?.state,
    city: data?.city,
  };

  const { control, setError, handleSubmit, formState } = useForm({
    defaultValues,
    mode: "onChange",
  });

  function onSubmit() {}

  return (
    <div>
      <u
        onClick={toggle}
        className="text-info click"
        data-bs-toggle="modal"
        data-bs-target="#studentModal"
      >
        View
      </u>

      {/* Modal */}
      <Modal centered isOpen={visibility} toggle={toggle} id="studentModal">
        <ModalHeader toggle={toggle}>Staff Details</ModalHeader>
        <ModalBody>
          <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Controller
                control={control}
                name="name"
                defaultValue=""
                render={({ field }) => (
                  <Input
                    autoFocus
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                    invalid={formState.errors.name && true}
                    {...field}
                  />
                )}
                rules={{ required: true }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Email">Email</label>
              <Controller
                control={control}
                name="email"
                defaultValue=""
                render={({ field }) => (
                  <Input
                    autoFocus
                    type="text"
                    placeholder="Email"
                    className="form-control"
                    invalid={formState.errors.email && true}
                    {...field}
                  />
                )}
                rules={{ required: true }}
              />
            </div>

            <div className="form-group d-flex gap-4">
              <div style={{ width: "60%" }}>
                <label htmlFor="birthDate">Birth Date</label>
                <Controller
                  control={control}
                  name="birthDate"
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type="date"
                      placeholder="birth Date"
                      className="form-control"
                      invalid={formState.errors.birthDate && true}
                      {...field}
                    />
                  )}
                  rules={{ required: true }}
                />
              </div>

              <div>
                <label htmlFor="Gender">Gender</label>
                <Controller
                  control={control}
                  name="gender"
                  defaultValue=""
                  render={({ field }) => (
                    <div>
                      <RadioGroup
                        sx={{ display: "block" }}
                        id="gender"
                        defaultValue="female"
                        name="gender"
                      >
                        <FormControlLabel
                          control={<Radio />}
                          label="Male"
                          {...field}
                        />
                        <FormControlLabel
                          control={<Radio />}
                          label="Female"
                          {...field}
                        />
                      </RadioGroup>
                    </div>
                  )}
                  rules={{ required: true }}
                />
              </div>
            </div>

            <div className="form-group ">
              <label htmlFor="Phone Number">Phone Number</label>
              <Controller
                control={control}
                name="phone"
                defaultValue=""
                render={({ field }) => (
                  <Input
                    autoFocus
                    type="text"
                    placeholder="Phone Number"
                    className="form-control"
                    invalid={formState.errors.phone && true}
                    {...field}
                  />
                )}
                rules={{ required: true }}
              />
            </div>

            <div className="form-group d-flex gap-4">
              <div style={{ width: "100%" }}>
                <label htmlFor="Role">Role</label>
                <Controller
                  control={control}
                  name="role"
                  defaultValue=""
                  render={({ field }) => (
                    <Dropdown
                      className="form-control"
                      {...field}
                      isOpen={roleOpen}
                      toggle={toggleRole}
                    >
                      <DropdownToggle
                        className="text-lg w-100 text-left shadow-none"
                        caret
                      >
                        Role
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>Role 1</DropdownItem>
                        <DropdownItem>Role 2</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  )}
                  rules={{ required: true }}
                />
              </div>
              <div style={{ width: "100%" }}>
                <label htmlFor="privilege">Privilege</label>
                <Controller
                  control={control}
                  name="privilege"
                  defaultValue=""
                  render={({ field }) => (
                    <Dropdown
                      className="form-control"
                      {...field}
                      isOpen={privilegeOpen}
                      toggle={togglePrivilege}
                    >
                      <DropdownToggle
                        className="text-lg w-100 text-left shadow-none"
                        caret
                      >
                        Privilege
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>Privilege 1</DropdownItem>
                        <DropdownItem>Privilege 2</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  )}
                  rules={{ required: true }}
                />
              </div>
            </div>

            <div className="form-group d-flex gap-4">
              <div style={{ width: "100%" }}>
                <label htmlFor="State">State</label>
                <Controller
                  control={control}
                  name="state"
                  defaultValue=""
                  render={({ field }) => (
                    <Dropdown
                      className="form-control"
                      {...field}
                      isOpen={stateOpen}
                      toggle={toggleState}
                    >
                      <DropdownToggle
                        className="text-lg w-100 text-left shadow-none"
                        caret
                      >
                        State
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>Lagos</DropdownItem>
                        <DropdownItem>Abuja</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  )}
                  rules={{ required: true }}
                />
              </div>
              <div style={{ width: "100%" }}>
                <label htmlFor="city">City</label>
                <Controller
                  control={control}
                  name="city"
                  defaultValue=""
                  render={({ field }) => (
                    <Dropdown
                      className="form-control"
                      {...field}
                      isOpen={cityOpen}
                      toggle={toggleCity}
                    >
                      <DropdownToggle
                        className="text-lg w-100 text-left shadow-none"
                        caret
                      >
                        City
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>Ikeja</DropdownItem>
                        <DropdownItem>Jabi</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  )}
                  rules={{ required: true }}
                />
              </div>
            </div>

            <button
              className="btn btn-blue-800 btn-lg w-100 my-5"
              type="submit"
              disabled={!formState.isValid}
            >
              Update Staff Details
            </button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
