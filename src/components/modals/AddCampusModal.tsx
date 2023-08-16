import { FormEvent } from "react";
import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import useForm from "../../utility/hooks/useForm";
import useCreateCampusTuition from "../../hooks/mutations/classes/useCreateCampusTuition";
import useUpdateCampusTuition from "../../hooks/mutations/classes/useUpdateCampusTuition";
import FormDropdown from "../molecules/FormDropdown";
import { levels } from "../../data/Levels";
import FormInput from "../molecules/FormInput";
import { UserDto } from "../../types/dto";
import { toast } from "react-toastify";
import ToastContent from "../molecules/ToastContent";
import handleError from "../../utils/handleError";
import useAllCampuses from "../../hooks/queries/classes/useAllCampuses";
import FormDropdownSelectMultiple from "../molecules/FormDropdownSelectMultiple";
import { states } from "../../data/States";
import { InstructorsData } from "../../data/InstructorsData";
import useCreateCampus from "../../hooks/mutations/classes/useCreateCampus";
import useAllUsers from "../../hooks/queries/useAllUsers";

interface AddCampusModalProps {
  toggle: VoidFunction;
  visibility: boolean;
  defaultValues?: any;
  onCreate?: VoidFunction;
}

export default function AddCampusModal({
  toggle,
  defaultValues,
  visibility,
  onCreate,
}: AddCampusModalProps) {
  const isCreating = !defaultValues;

  const { isLoading: campusesLoading, data } = useAllCampuses();
  const campusesData = data?.nodes;
  const createCampus = useCreateCampus();
  // const updateTuition = useUpdateCampusTuition(id ?? "");

  const isLoading = createCampus.isLoading || campusesLoading;
  const { data: usersData, isLoading: usersLoading } = useAllUsers();

  const initialState = {
    levels: [levels[0]],
    name: "",
    region: "",
    currency: "",
    continent: "",
    campusCode: "",
    campusCoordinator: "",
    phoneNumber1: "",
    phoneNumber2: "",
    shortName: "",
    country: "",
    campusArea: "",
    primaryLanguage: "",
    secondaryLanguage: "",
    campusAbbreviation: "",

    city: "",
    state: states[0],
    street: "",
    zipCode: "",
  };

  const { formData, formIsValid, updateForm } = useForm<typeof initialState>({
    initialState: defaultValues ?? initialState,
    // optionalFields: ["discount"],
  });

  const users: UserDto[] = usersData?.users?.nodes?.filter((u: any) => {
    return u?.roles
      ?.map((r: any) => r?.name)
      .some((n: any) => n?.includes("ADMIN"));
  });

  const adminOptions = users?.map((u) => ({
    label: `${u?.firstName} ${u?.lastName}`,
    id: u?.email,
  }));

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const address = {
      city: formData.city,
      street: formData.state,
      state: formData.state,
      zipCode: formData.zipCode,
    };

    const data = { ...formData, address };

    if (formIsValid) {
      createCampus.mutate(data, {
        onSuccess: () => {
          toast.success(
            <ToastContent
              type={"success"}
              heading={"Success"}
              message={`Successfully created campus tuition`}
            />,
            ToastContent.Config
          );
          !!onCreate && onCreate();
          toggle();
        },
        onError: (e: any) => {
          handleError(e, formData);
        },
      });
    } else {
      alert("Please fill in all fields");
      console.log(formData);
    }
  }

  return (
    <Modal centered isOpen={visibility} toggle={toggle} scrollable>
      <ModalHeader toggle={toggle}>Create Campus</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
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
            title="Campus Levels"
            onChange={(e) => updateForm("levels", e.target.value)}
            options={levels.map((v) => ({ children: v }))}
            value={formData?.levels}
            disabled={!isCreating}
          />

          <FormInput
            label="Campus Address (Street)"
            placeholder="Enter Campus Street Address"
            onChange={(e) => updateForm("street", e?.target?.value)}
            value={formData?.street}
          />

          <FormInput
            label="City"
            placeholder="City"
            onChange={(e) => updateForm("city", e?.target?.value)}
            value={formData?.city}
          />

          <FormInput
            label="Campus Abbreviation"
            placeholder="Campus Abbreviation"
            onChange={(e) => updateForm("campusAbbreviation", e?.target?.value)}
            value={formData?.campusAbbreviation}
          />
          <FormInput
            label="Campus Area"
            placeholder="Campus Area"
            onChange={(e) => updateForm("campusArea", e?.target?.value)}
            value={formData?.campusArea}
          />

          <FormInput
            label="Campus Code"
            placeholder="Campus Code"
            onChange={(e) => updateForm("campusCode", e?.target?.value)}
            value={formData?.campusCode}
          />

          <FormInput
            label="Continent"
            placeholder="Continent"
            onChange={(e) => updateForm("continent", e?.target?.value)}
            value={formData?.continent}
          />

          <FormInput
            label="Country"
            placeholder="Country"
            onChange={(e) => updateForm("country", e?.target?.value)}
            value={formData?.country}
          />

          <FormInput
            label="Currency"
            placeholder="Currency"
            onChange={(e) => updateForm("currency", e?.target?.value)}
            value={formData?.currency}
          />

          <FormInput
            label="Zip Code"
            placeholder="Zip Code"
            onChange={(e) => updateForm("zipCode", e?.target?.value)}
            value={formData?.zipCode}
          />

          <FormDropdown
            title="Campus Address (State)"
            value={formData?.state}
            options={states?.map((d: any) => ({ children: d }))}
            onChange={(e) => updateForm("state", e?.target?.value)}
            disabled={!isCreating}
          />

          <FormDropdown
            title="Campus Cordinator"
            value={formData?.campusCoordinator}
            options={InstructorsData?.map((d: any) => ({ children: d?.name }))}
            onChange={(e) => updateForm("campusCoordinator", e?.target?.value)}
            disabled={!isCreating}
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
              {"Create Campus"}
            </button>
          )}
        </form>
      </ModalBody>
    </Modal>
  );
}
