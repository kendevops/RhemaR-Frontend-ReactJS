import useToggle from "../../../utility/hooks/useToggle";
import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import { Input } from "reactstrap";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { levels } from "../../../data/Levels";
import useForm from "../../../utility/hooks/useForm";
import FormInput from "../../molecules/FormInput";
import parseRole from "../../../utils/parseRole";
import FormDropdownSelectMultiple from "../../molecules/FormDropdownSelectMultiple";
import FormDropdown from "../../molecules/FormDropdown";
import { states } from "../../../data/States";
import { UserDto } from "../../../types/dto";
import useAllUsers from "../../../hooks/queries/useAllUsers";
import useEditCampus from "../../../hooks/mutations/classes/useEditCampus";
import { FormEvent } from "react";
import { toast } from "react-toastify";
import ToastContent from "../../molecules/ToastContent";

interface EditCampusModalProps {
  data: any;
}

export default function EditCampusModal({ data }: EditCampusModalProps) {
  const [visibility, toggle] = useToggle();

  console.log(data);

  const initialState = {
    levels: [data?.levels],
    name: data?.name,
    shortName: data?.shortName,
    addressStreet: data?.addressStreet,
    addressLGA: data?.addressLGA,
    addressState: data?.states,
    cordinator: data?.cordinator,
    phoneNumber1: data?.phoneNumber1,
    phoneNumber2: data?.phoneNumber2,
  };

  const editCampus = useEditCampus(data?.id);
  const isLoading = editCampus.isLoading;
  const { data: usersData, isLoading: usersLoading } = useAllUsers();

  const { formData, updateForm, formIsValid } = useForm({ initialState });

  const users: UserDto[] = usersData?.users?.nodes?.filter((u: any) => {
    return u?.roles
      ?.map((r: any) => r?.name)
      .some((n: any) => n?.includes("ADMIN"));
  });

  const adminOptions = users?.map((u) => ({
    label: `${u?.firstName} ${u?.lastName}`,
    id: u?.email,
  }));

  console.log(adminOptions);

  //   const roleOptions = rolesData?.roles
  //     ?.filter((r: any) => r.name?.includes("ADMIN"))
  //     .map((d: any) => ({
  //       children: d?.name,
  //     }));

  //   function onSubmit() {}

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formIsValid) {
      alert("Please fill in all fields");
      return;
    }
    if (data) {
      editCampus?.mutate(formData, {
        onSuccess: () => {
          toast.success(
            <ToastContent
              type={"success"}
              heading={"Successful"}
              message={"Campus Updated successfully"}
            />,
            ToastContent.Config
          );
        },

        onError: (e: any) => {
          console.log(e);
          toast.error(
            <ToastContent
              type={"error"}
              heading={"Error"}
              message={e?.response?.data?.error?.message?.toString()}
            />,
            ToastContent.Config
          );
        },
      });

      toggle();
      return;
    }
  };

  return (
    <div className=" ">
      <p
        onClick={toggle}
        className=" click d-flex"
        // data-bs-toggle="modal"
        // data-bs-target="#studentModal"
      >
        Edit
      </p>

      {/* Modal */}
      <Modal centered isOpen={visibility} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Campus</ModalHeader>
        <ModalBody>
          <form onSubmit={onSubmit}>
            <FormInput
              label="Campus Full Name"
              placeholder="Enter Campus Full Name"
              onChange={(e) => updateForm("name", e?.target?.value)}
              value={formData?.name}
            />

            <FormInput
              label="Campus Short Name"
              placeholder="Enter Campus Short Name"
              onChange={(e) => updateForm("shortName", e?.target?.value)}
              value={formData?.shortName}
            />

            <FormDropdownSelectMultiple
              title="Campus Level"
              onChange={(e) => updateForm("levels", e.target.value)}
              options={levels.map((v) => ({ children: v }))}
              value={formData?.levels}
              // disabled={!isCreating}
            />

            <FormInput
              label="Campus Address (Street)"
              placeholder="Enter Campus Street Address"
              onChange={(e) => updateForm("addressStreet", e?.target?.value)}
              value={formData?.addressStreet}
            />

            <FormInput
              label="Campus Address (LGA)"
              placeholder="Enter Campus LGA"
              onChange={(e) => updateForm("addressLGA", e?.target?.value)}
              value={formData?.addressLGA}
            />

            <FormDropdown
              title="Campus Address (State)"
              value={formData?.addressState}
              options={states?.map((d: any) => ({ children: d }))}
              onChange={(e) => updateForm("addressState", e?.target?.value)}
              // disabled={!isCreating}
            />

            <FormDropdown
              title="Campus Cordinator"
              value={formData?.cordinator}
              options={adminOptions?.map((d: any) => ({ children: d?.label }))}
              onChange={(e) => updateForm("cordinator", e?.target?.value)}
              // disabled={!isCreating}
            />

            <FormInput
              label="Phone Number 1"
              placeholder="Enter Phone Number"
              onChange={(e) => updateForm("phoneNumber1", e?.target?.value)}
              value={formData?.phoneNumber1}
            />

            <FormInput
              label="Phone Number 2"
              placeholder="Enter Optional 2nd number"
              onChange={(e) => updateForm("phoneNumber2", e?.target?.value)}
              value={formData?.phoneNumber2}
            />

            {isLoading ? (
              <Spinner />
            ) : (
              <button
                className="btn btn-blue-800 btn-lg w-100 my-5"
                type="submit"
              >
                {"Edit Campus"}
              </button>
            )}
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
